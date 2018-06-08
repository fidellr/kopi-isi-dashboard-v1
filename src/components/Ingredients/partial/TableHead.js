import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const columnData = [
    { id: 'created_at', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'updated_at', numeric: false, disablePadding: false, label: 'Updated At' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'total_gram', numeric: false, disablePadding: false, label: 'Gram' },
    { id: 'total_gram_price', numeric: false, disablePadding: false, label: 'Price' },
    { id: 'edit', numeric: false, disablePadding: false, label: 'Edit' },
    { id: 'remove', numeric: false, disablePadding: false, label: 'Remove' },
  ];
  
  class IngredientTableHead extends Component {
    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };
  
    render() {
      const { order, orderBy } = this.props;
      return (
        <TableHead>
          <TableRow>
            {columnData.map(column => {
              return (
                <TableCell
                  key={column.id}
                  numeric={column.numeric}
                  padding={column.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={order}
                      onClick={this.createSortHandler(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              );
            }, this)}
          </TableRow>
        </TableHead>
      );
    }
  }

  export default IngredientTableHead;

