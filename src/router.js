import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import PageLayout from './layout'
import Dashboard from './containers/dashboard'
import Ingredients from './containers/ingredients';


const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: "#fafafa",
        backgroundColor: "#1d1d1b"
      },
    }
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

let isLoggedIn = false;

const AuthenticatedRoutes = ({ component: Component, ...rest }) => (
  !isLoggedIn ? <Route {...rest} render={props => (
    <PageLayout {...props}>
      <Component {...props} />
    </PageLayout>
  )} /> : <Redirect to="/login" />
)

export default class extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <AuthenticatedRoutes exact path="/dashboard" component={Dashboard} />
            <AuthenticatedRoutes exact path="/ingredients" component={Ingredients} />
            <Route path="*" render={() => <Redirect to="/dashboard" />} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}


