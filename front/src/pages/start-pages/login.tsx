import { Box, Button, Checkbox, FormControlLabel, Grid, Link, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import { urls, useRouting } from "../../routing/routes";

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

export type LoginForm = {
    email: string;
    password: string;
};

export const LoginModal = () => {
    const classes = useStyles();

    const {routeTo} = useRouting();

    const initialValues = {
        email: "",
        password: "",
    };

    const onSubmit = async (credentials: LoginForm) => {

    }

    return (<Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleChange }) => {
            return (
                <Grid item xs={12} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={() => routeTo(urls.contentPage)}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/app/start/register" variant="body2" >
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </Form>
                    </div>
                </Grid>
            );
        }}
    </Formik>
    );
};