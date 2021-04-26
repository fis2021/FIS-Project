import { AppBar, CssBaseline, Toolbar } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles"
import React from "react";
import { NavBar } from "../components/navbar";
import { ScrollList } from "../components/scroll-list";


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/content-background.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
}))

export const Content = () => {

    const classes = useStyles();

    return (<div className={classes.root}>
        <NavBar />
    </div>)
}