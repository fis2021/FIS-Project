import { Grid, Icon, IconButton } from '@material-ui/core';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useData } from '../hooks/useData';
import { deleteBook, getAllBooks } from '../services/book-service';

const useStyles = makeStyles((theme) => ({
    scrollRoot: {
        height: '100vh',
        overflow: 'hidden',
        width: '100%',
        position: 'relative'
    },
    paper: {
        paddingTop: '100px',
        marginTop: '10px',
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll',
        maxHeight: '100vh',
    },
    cardRoot: {
        width: "300px"
    }
}));




export const ScrollList = () => {

    const [reload, setReload] = useState(false);
    const { data, isLoading } = useData(getAllBooks, [reload]);
    console.log(data)
    const classes = useStyles();

    if (isLoading) {
        return <div></div>;
    }
    return <div className={classes.scrollRoot}>
        <div className={classes.paper}>
            <Grid container spacing={3}>
                {data?.map((book) => <div key={book._id} style={{ padding: "50px" }}>
                   <p>Test</p>
                </div>
                )}
            </Grid>
        </div>
    </div>
}