import { Box, Button, Checkbox, FormControlLabel, Grid, Link, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { urls, useRouting } from "../../routing/routes";
import { userLogin } from "../../services/auth-service";
import { headers } from "../../services/config";

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
    const { routeTo } = useRouting();
    const [error, setError] = useState<string>("");
    const [, setUserContext] = useContext(UserContext);

    const initialValues = {
        email: "",
        password: "",
    };

    const onSubmit = async (credentials: LoginForm) => {
        try {
            const user = await userLogin(credentials);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isAdmin", user.isAdmin);
            setUserContext(user);
            headers.Authorization = `Bearer ${user.token}`;
            routeTo(urls.contentPage);
        } catch (e) {
            setError(e.statusText);
        }
    }

    return (<Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleChange, values }) => {

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
                                value={values.email}
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
                                value={values.password}
                                onChange={handleChange}
                            />
                            {error ? (
                                <div>
                                    <p>Invalid Email or Password</p>
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