import React, { Fragment } from 'react';
import { NavLink } from "react-router-dom";
import contentDetails from './ContentDetails';
import { Hidden, Divider } from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import './Content.css'

export default ({ onSignOut }) => (
    <Fragment>
        {
            contentDetails().map(item => item.title === 'Sign Out' ?
                <Hidden mdUp key={item.title}>
                    <Divider />
                    <List key={item.title}>
                        <ListItem
                            button
                            dense
                            onClick={onSignOut}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    </List>
                </Hidden>
                : (
                    <List key={item.title}>
                        <ListItem
                            button
                            dense
                            component={NavLink}
                            to={item.path}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    </List>
                ))
        }
    </Fragment>
)