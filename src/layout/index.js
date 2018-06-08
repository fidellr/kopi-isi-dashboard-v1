import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Hidden, Button } from '@material-ui/core';
import LayoutDrawer from './Drawer';

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            paddingLeft: 250
        }
    },
    navIcon: {
        marginLeft: -12,
        marginRight: 20,
    },
    toolbar: theme.mixins.toolbar,
    flex: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        marginTop: 56,
        maxWidth: '100%',
        [theme.breakpoints.up('sm')]: {
            marginTop: 64,
        },
        [theme.breakpoints.up('md')]: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            })
        }
    },
    contentShift: {
        [theme.breakpoints.up('md')]: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }
    },
    userName: {
        paddingRight: 16,
        marginRight: 16,
        borderRight: '1px solid #333'
    }

});

class RootPageLayout extends Component {
    state = {
        isDrawerOpen: false
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.isAuthenticated && !nextProps.isAuthenticated) {
        //     setTimeout(() => {
        //         this.props.history.replace('/login');
        //     }, 500);
        // }
    }

    handleLogout = async () => {
        console.log("logout clicked!")
        // this.props.history.replace('/login');
    }

    handleDrawerToggle = () => this.setState({ isDrawerOpen: !this.state.isDrawerOpen });

    render() {
        const { classes, children  } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Kopi Isi Dashboard
                        </Typography>
                        <Hidden smDown>
                            {
                                <Typography variant="subheading" color="inherit" className={classes.userName}>
                                    Hi, Fidel
                                </Typography>
                            }
                            <Button color="inherit" onClick={this.handleLogout}>Sign out</Button>
                        </Hidden>
                    </Toolbar>
                </AppBar>
                {<LayoutDrawer
                    handleDrawerToggle={this.handleDrawerToggle}
                    // userInfo={userInfo}
                    isDrawerOpen={this.state.isDrawerOpen}
                    // onSignOut={this.handleLogout}
                />}
                <main
                    className={classes.content}
                >
                    <div>
                        <div className={classes.toolbar}>
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(RootPageLayout);