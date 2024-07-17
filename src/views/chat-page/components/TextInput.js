import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@mui/material';
import { NearMe } from '@mui/icons-material';

const useStyles = makeStyles((Theme) =>
  createStyles({
    wrapForm: {
      display: 'flex',
      justifyContent: 'center',
      width: '95%',
      margin: `${Theme.spacing(0)} auto`,
    },
    wrapText: {
      width: '100%',
    },
    button: {
      //margin: theme.spacing(1),
    },
  }),
);

export const TextInput = () => {
  const classes = useStyles();
  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          id="standard-text"
          label="メッセージを入力"
          className={classes.wrapText}
          //margin="normal"
        />
        <Button variant="contained" color="primary" className={classes.button}>
          <NearMe />
        </Button>
      </form>
    </>
  );
};
