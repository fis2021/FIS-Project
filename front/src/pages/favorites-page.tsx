import { Button, Divider, makeStyles, Paper, Typography } from "@material-ui/core"
import React from "react"
import { NavBar } from "../components/navbar"


const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: "200px",
        backgroundColor: "transparent",
        color: "white",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: '100vh',
        minHeight: '100vh'
    },
    titleContainer: {
        backgroundColor: "#404040",
        color: "white",
        padding: "20px",
        paddingRight: "40px",
        paddingLeft: "40px",
        borderRadius: "25px"
    },
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/content-background.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    divider: {
        background: "white",
        marginLeft: "-40px",
        marginRight: "-40px"
    }
}))

const test = ["Titluri pentru", "Titluri pentru test", "Titluri pentru test", "Titluri pentru test", "Titluri pentru test", "Titluri pentru test"]

export const FavoritesPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <NavBar />
            <Paper className={classes.paper}>
                <Paper className={classes.titleContainer}>
                    {test.map((title) => {
                        return (<>
                            <Typography variant="h5" style={{ padding: "10px" }}>
                                {title}
                            </Typography>
                            <Divider className={classes.divider} />
                        </>)
                    })}
                    <Button onClick={() => { }} style={{ color: "white", marginTop: "20px" }} variant="outlined">
                        Show live articles
                </Button>
                </Paper>
            </Paper>
        </div>
    )
}