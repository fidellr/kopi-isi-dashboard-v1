import React, { Fragment } from 'react';
import { Hidden, Drawer, Divider, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors'

import DrawerContent from './partial/Content'
import UserCredential from './partial/UserCredential'


const drawerWidth = 250;

const styles = theme => ({
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: "fixed",
            zIndex: 0,
            top: 66,
            transform: 'translateX(0px) !important'
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
    listContainer: {
        [theme.breakpoints.down('sm')]: {
            height: 150,
            // backgroundImage: "url(" + require("../../assets/user_default_bg.jpg") + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        },
        [theme.breakpoints.up('md')]: {
            margin: 7.42
        }
    },
    avatar: {
        backgroundColor: grey[600],
        [theme.breakpoints.down('sm')]: {
            margin: "6px 0px 6px 14px",
            width: 60,
            height: 60
        }
    },
    userContent: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: 14
        }
    },
});



const LayoutDrawer = ({ isDrawerOpen, handleDrawerToggle, onSignOut, userInfo, classes, theme }) => {

    const mdUpDrawer = (
        <Fragment>
            <div className={classes.toolbar}>
                <DrawerContent />
            </div>
        </Fragment>
    )
    const smDownDrawer = (
        <Fragment>
            <div className={classes.toolbar}>
                <List className={classes.listContainer}>
                    <UserCredential
                        // userInfo={userInfo} 
                        classes={classes}
                    />
                </List>
                <Divider />
                <DrawerContent
                    onSignOut={onSignOut}
                />
            </div>
        </Fragment>
    )
    console.log(isDrawerOpen)
    return (
        <Fragment>
            <Hidden mdUp>
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={isDrawerOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    {smDownDrawer}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    variant="persistent"
                    open={isDrawerOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    {mdUpDrawer}
                </Drawer>
            </Hidden>
        </Fragment>
    )
}

export default withStyles(styles, { withTheme: true })(LayoutDrawer)