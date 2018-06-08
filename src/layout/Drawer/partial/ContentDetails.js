import React from 'react';
import { Dashboard, Settings } from '@material-ui/icons';

export default () => {
    return [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: <Dashboard />
        },
        {
            title: "Ingredients",
            path: "/ingredients",
            icon: <Settings />
        }
    ]
}