import React from 'react';
import { withStyles } from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  });
  
  let IngredientTableToolbar = props => {
    const { classes } = props;
  
    return (
      <Toolbar>
        <div className={classes.title}>
          <Typography variant="title" id="tableTitle">
            List Of Ingredients
            </Typography>
        </div>
        <div className={classes.spacer} />
      </Toolbar>
    );
  };
  
  IngredientTableToolbar = withStyles(toolbarStyles)(IngredientTableToolbar);
  export default IngredientTableToolbar