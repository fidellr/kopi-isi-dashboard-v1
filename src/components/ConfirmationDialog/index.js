import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default ({ isConfirmOpen, title, handleSubmit, handleClose }) => (
    <div>
        <Dialog
            open={isConfirmOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Are you sure want to delete {title}?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Deleting this will be permanently deleted, make sure you correctly chose the right item!        
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
            </Button>
                <Button onClick={handleSubmit} color="primary" autoFocus>
                    I'am sure!
            </Button>
            </DialogActions>
        </Dialog>
    </div>
)