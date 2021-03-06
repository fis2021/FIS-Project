import classes from '*.module.css';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, Icon, IconButton } from '@material-ui/core';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../contexts/searchContext';
import { useData } from '../hooks/useData';
import { Book } from '../models/book';
import { urls, useRouting } from '../routing/routes';
import { deleteBook, getAllBooks, getBooksBySearch } from '../services/book-service';

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


const DisplayBook = (p: { book: Book, setReload: React.Dispatch<React.SetStateAction<boolean>>, reload: boolean }) => {

    const { routeTo } = useRouting();
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.cardRoot}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="400"
                        image="https://picsum.photos/200/400"
                    />
                    <CardContent>
                        <Typography variant="h4" >{p.book.title}</Typography>
                        <Typography style={{ textAlign: "end" }}>{p.book.author}</Typography>
                        <Typography style={{ textAlign: "start" }}>{p.book.genre}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => routeTo(urls.bookPage, { id: p.book._id })}>
                        More Details
                </Button>
                    {localStorage.getItem("isAdmin") === "true" ? <><IconButton onClick={async () => {
                        const confirmation = window.confirm("Are you sure you want to delete the selected items?");
                        if (confirmation) {
                            await deleteBook(p.book._id)
                        }
                        p.setReload(!p.reload);
                    }}><Icon>delete</Icon></IconButton>
                        <IconButton onClick={() => routeTo(urls.editBook, { id: p.book._id })}>
                            <Icon>edit</Icon>
                        </IconButton></> : <></>}
                </CardActions>
            </Card >
        </Grid>
    );
}

export const ScrollList = () => {

    const [reload, setReload] = useState(false);
    const [searchWord,] = useContext(SearchContext);
    const { data, isLoading } = useData((searchWord ? getBooksBySearch : getAllBooks), [reload], (searchWord ? searchWord : undefined));
    const classes = useStyles();

   useEffect(() =>{
        setReload(!reload);
   },[searchWord])

    if (isLoading) {
        return <div></div>;
    }
    return <div className={classes.scrollRoot}>
        <div className={classes.paper}>
            <Grid container spacing={3}>
                {data?.map((book) => <div key={book._id} style={{ padding: "50px" }}>
                    <DisplayBook book={book} setReload={setReload} reload={reload} />
                </div>
                )}
            </Grid>
        </div>
    </div>
}