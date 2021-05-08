import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Form, Formik } from 'formik';
import { userRegister } from '../../services/auth-service';
import { urls, useRouting } from '../../routing/routes';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        FIS
        </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export type RegisterForm = {
  email: string;
  password: string;
  isAdmin: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUpModal = () => {

  const classes = useStyles();
  const { routeTo } = useRouting();
  const [error, setError] = useState<string>("");

  const initialValues = {
    email: "",
    password: "",
    isAdmin: false
  };

  const onSubmit = async (credentials: RegisterForm) => {
    try{
    const result = await userRegister(credentials);
    routeTo(urls.loginPage)
    }catch(e){
      setError(e.statusText);
    }
  }

  return (<Formik initialValues={initialValues} onSubmit={onSubmit}>
    {({ handleChange, values }) => {
      return (
        <Grid item xs={12} component={Paper} elevation={6} square>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={values.email}
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    id="password"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive a 10 this semester."
                  />
                </Grid>
              </Grid>
              {error ? (
                        <div>
                            <p>Email already in use</p>
                        </div>
                    ) : (
                            <div />
                        )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
          </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/app/start/login" variant="body2">
                    Already have an account? Sign in
              </Link>
                </Grid>
              </Grid>
            </Form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Grid>
      );
    }}
  </Formik>
  );
}