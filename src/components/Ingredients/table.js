import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons'
import { LinearProgress } from '@material-ui/core';

import { fetchAllIngredients, getIngredientByID, updateIngredient, deleteIngredient } from '../../utils/services/api';
import IngredientTableHead from './partial/TableHead';
import IngredientTableToolbar from './partial/TableToolbar';
import IngredientForm from './partial/Form';
import DeleteConfirmation from '../ConfirmationDialog';



const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableBodyCircular: {
    position: 'relative',
    top: 6,
    left: '300%',
    right: 0,
  }
});

class IngredientTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'name',
      realData: null,
      filteredData: null,
      isDialogOpen: false,
      isConfirmOpen: false,
      temp: {
        title: '',
        id: '',
      },
      page: 0,
      rowsPerPage: 5,
    };
  }

  async componentDidMount() {
    const ingredientsData = await fetchAllIngredients()
    this.setState({ realData: ingredientsData })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.realData.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.realData.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleChangePage = (event, page) => this.setState({ page });

  handleChangeRowsPerPage = event => this.setState({ rowsPerPage: event.target.value })

  handleSubmitDeleteConfirm = async (e, id) => {
    const getTitle = this.state.realData.reduce((all, item) => {
      if (item.id === id) {
        all = item.name
        return all
      }
      return all
    }, '')
    this.setState({isConfirmOpen: true, temp: {id: id, title: getTitle}})
    if (this.state.isConfirmOpen) {
      const data = this.state.realData.filter(item => item.id !== id);
      await deleteIngredient(this.state.temp.id);
      this.setState({ isConfirmOpen: false, realData: data})
    }
  }
  handleCloseDeleteConfirm = () => this.setState({ isConfirmOpen: false })

  toggleDialog = () => this.setState({ isDialogOpen: !this.state.isDialogOpen })
  handleEdit = (id) => {
    const getSelectedIngredient = this.state.realData.filter(item => item.id === id);
    this.setState({ filteredData: getSelectedIngredient });
    this.toggleDialog()
  }

  grabChangedData = async (payload) => {
    const { realData } = this.state
    payload.total_gram = parseInt(payload.total_gram, 10)
    payload.total_gram_price = parseInt(payload.total_gram_price, 10)
    const reqPayload = {
      name: payload.name,
      total_gram: payload.total_gram,
      total_gram_price: payload.total_gram_price,
    }
    await updateIngredient(payload.id, reqPayload);
    const data = await getIngredientByID(payload.id)
    const replacedData = realData.map(item => {
      if (item.id === data.id) {
        item = data
      }
      return item
    })
    this.setState({ realData: replacedData });
  }

  render() {
    const { classes } = this.props;
    const { realData, filteredData, isDialogOpen, isConfirmOpen, order, orderBy, rowsPerPage, page, temp } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, realData && realData.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <IngredientTableToolbar />
        {!realData ? <LinearProgress /> : <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <IngredientTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={realData ? realData.length : 1}
            />
            <TableBody>
              {realData.sort((a, b) => (a.name < b.name ? -1 : 1)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={n.id}
                  >
                    <TableCell component="th" scope="row" >
                      {n.created_at}
                    </TableCell>
                    <TableCell padding="dense" >{n.updated_at}</TableCell>
                    <TableCell padding="dense" >{n.name}</TableCell>
                    <TableCell padding="dense" >{n.total_gram}</TableCell>
                    <TableCell padding="dense" >{n.total_gram_price}</TableCell>

                    <TableCell padding="dense" ><IconButton aria-label="edit-ingredient" onClick={() => this.handleEdit(n.id)}><Edit /></IconButton></TableCell>
                    <TableCell padding="dense" ><IconButton aria-label="edit-ingredient" onClick={(e) => this.handleSubmitDeleteConfirm(e,n.id)}><Delete /></IconButton></TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <DeleteConfirmation isConfirmOpen={isConfirmOpen} title={temp.title} handleSubmit={this.handleSubmitDeleteConfirm} handleClose={this.handleCloseDeleteConfirm} />
          <IngredientForm
            grabDataToParent={this.grabChangedData}
            data={filteredData}
            isDialogOpen={isDialogOpen}
            toggleDialog={this.toggleDialog}
          />
        </div>}
        {realData && <TablePagination
          component="div"
          count={realData.length}
          rowsPerPageOptions={realData.length < 25 ? [5, 10] : [5, 10, 25]}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />}
      </Paper>
    );
  }
}

IngredientTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IngredientTable);