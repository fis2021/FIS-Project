import { Button, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { urls, useRouting } from '../../routing/routes';

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
        maxWidth: '800px'
    },
    button: {
        margin: "30px"
    }
}));


export const AdminLanding = () => {
    const classes = useStyles();
    const { routeTo } = useRouting(); 
    return (
        <div className={classes.root}>
        <Paper className={classes.paper}>
            <Typography variant="h1">Hello Admin</Typography>

            <Button className={classes.button} variant="outlined" onClick={() => routeTo(urls.addBook)}>Add a new Book</Button>
            <Button className={classes.button} variant="outlined" onClick={() => routeTo(urls.addAdminAccount)}>Create admin account</Button>
            <Button className={classes.button} variant="outlined" onClick={() => routeTo(urls.contentPage)}>Back to content page</Button>
        </Paper>
        </div>
    )
}