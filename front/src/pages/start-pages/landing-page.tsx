import { AppBar, Container, CssBaseline, Drawer, Grid, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/start-image.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    grid: {
        width: '100%',
        margin: 0,
    },
    loginWrapper: {
        marginTop: theme.spacing(30),
        margin: theme.spacing(6)

    },
    title: {
        color: 'white'
    },
    landingLeft: {
        overflow: "auto",
    },
    drawerPaper: {
        border: 'none',
        overflowX: "hidden",
        maxWidth: '600px',
        background: 'transparent'
    }
}));

export const LandingPage = () => {
    const classes = useStyles();

    return (<div className={classes.root}>
        <Container className={classes.landingLeft}>
            <Typography variant="h1" className={classes.title}>
            </Typography>
        </Container>
        <Drawer
            variant="permanent"
            open={true}
            anchor='right'
            classes={{
                paper: classes.drawerPaper,
            }}
            transitionDuration={2}
        >
            <div className={classes.loginWrapper}>
            </div>
        </Drawer>
    </div >)
}