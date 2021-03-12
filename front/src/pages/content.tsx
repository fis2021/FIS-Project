import { AppBar, CssBaseline, Toolbar } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles"
import React from "react";


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/content-background.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
}))

export function Content() {

    const classes = useStyles();

    return (<div className={classes.root}>
    </div>)
}