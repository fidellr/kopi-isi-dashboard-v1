import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class IngredientForm extends Component {
    state = {
        extractedData: {}
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            const extractedData = nextProps.data.reduce((all, item) => {
                all["id"] = item.id
                all["created_at"] = item.created_at
                all["updated_at"] = item.updated_at
                all["name"] = item.name
                all["total_gram"] = item.total_gram
                all["total_gram_price"] = item.total_gram_price
                return all
            }, {})
            this.setState({ extractedData: Object.assign(this.state.extractedData, extractedData) })
        }
    }

    handleChange = (key, value) => this.setState({ extractedData: { ...this.state.extractedData, [key]: value } })
    handleSubmit = (payload) => {
        this.props.grabDataToParent(payload);
        this.props.toggleDialog();
    }

    render() {
        const { extractedData } = this.state
        const { isDialogOpen, toggleDialog, data } = this.props;

        return (
            data && <div>
                <Dialog
                    open={isDialogOpen}
                    onClose={toggleDialog}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Ingredient</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            value={extractedData.name}
                            onChange={(e) => this.handleChange("name", e.target.value)}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="gram"
                            label="gram"
                            value={extractedData.total_gram}
                            onChange={(e) => this.handleChange("total_gram", e.target.value)}
                            type="number"
                            fullWidth
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="price"
                            label="Price /gram"
                            value={extractedData.total_gram_price}
                            onChange={(e) => this.handleChange("total_gram_price", e.target.value)}
                            type="number"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={toggleDialog} color="primary">
                            Cancel
            </Button>
                        <Button onClick={() => this.handleSubmit(this.state.extractedData)} color="primary">
                            Submit
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}