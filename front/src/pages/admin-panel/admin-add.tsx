import { Button, Checkbox, FormControlLabel, Grid, Link, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { urls, useRouting } from "../../routing/routes";
import { adminRegister } from "../../services/auth-service";
import { RegisterForm } from "../start-pages/register"

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/admin-background.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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


export const AdminAdd = () => {

    const classes = useStyles();
    const { routeTo } = useRouting();
    const [error, setError] = useState<string>("");

    const initialValues = {
        email: "",
        password: "",
        isAdmin: true
    };

    const onSubmit = async (credentials: RegisterForm) => {
        try {
            const result = await adminRegister(credentials);
            routeTo(urls.adminPanel)
        } catch (e) {
            setError(e.statusText);
        }
    }

    return (<Formik<RegisterForm>
        initialValues={initialValues}
        onSubmit={onSubmit}
    >
        {({ handleChange, values }) => {
            return (<div className={classes.root}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add new Admin Account
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add account
                        </Button>
                        <Button
                            onClick={e => {
                                routeTo(urls.adminPanel);
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Cancel
                    </Button>
                    </Form>
                </Paper>
            </div>
            )
        }}
    </Formik>
    )
}
