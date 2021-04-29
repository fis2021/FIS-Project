import classes from '*.module.css'
import { Container, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useEffectAsync } from '../hooks/async-hooks'
import { Book } from '../models/book'
import { getSingleBook } from '../services/book-service'
import { NavBar } from './navbar'

const useStyles = makeStyles((theme) => ({
    rootPaper:{
        paddingTop: "100px",
        backgroundColor: "transparent",
        color: "white"
    },
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/content-background.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
}))

export const BookPage = (p: RouteComponentProps<{ id: string }>) => {

    const [book, setBook] = useState<Book>();
    const classes= useStyles();

    useEffectAsync( async() => {
        const data = await getSingleBook(p.match.params.id);
        setBook(data);
    },[]);

    if(!book){
        return <div></div>
    }
    return(
        <div className={classes.root}>
            <NavBar />
            <Paper className={classes.rootPaper} elevation={3}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <Container>
                        <img 
                            src="https://picsum.photos/400/600"
                        />
                    </Container>
                    <Container>
            <Typography variant="h2">{book.title}</Typography>
            <Typography variant="h5" style={{textAlign: "end"}}>{book.author}</Typography>
            <Typography style={{textAlign: "start"}}>Genre: {book.genre}</Typography>
            <Typography style={{marginTop: "20px"}}>{book.description}</Typography>
            </Container>
            </div>
            </Paper>
        </div>
    )
}