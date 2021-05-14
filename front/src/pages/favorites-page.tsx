import { Button, Divider, makeStyles, Paper, Typography } from "@material-ui/core"
import React, { useContext, useState } from "react"
import { NavBar } from "../components/navbar"
import { UserContext } from "../contexts/userContext"
import { useEffectAsync } from "../hooks/async-hooks"
import { Book } from "../models/book"
import { getSingleBook } from "../services/book-service"


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

const DisplayTitle = (p: {book: Book}) => {
    const classes = useStyles();
    console.log("inca unul")
    return(
        (<>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Typography variant="h5" style={{ padding: "10px" }}>
                    {p.book.title}
                </Typography>
                <p>by</p>
                <Typography variant="h5" style={{ padding: "10px" }}>
                    {p.book.author}
                </Typography>
            </div>
            <Divider className={classes.divider} />
        </>)
    )
}

export const FavoritesPage = () => {
    const classes = useStyles();
    const [books,setBooks] = useState<Book[]>([]);
    const [loading,isLoading] = useState(true);
    const [, , favorites] = useContext(UserContext);

    useEffectAsync(async () => {
        if (favorites) {
            await Promise.all(favorites.map(async (id) => {
                const book = await getSingleBook(id);
                setBooks(books => [...books,book])
            }))
            isLoading(!loading);
        }

    },[])
    if(loading){
        return <div></div>
    }else
        return (
            <div className={classes.root}>
                <NavBar />
                <Paper className={classes.paper}>
                    <Paper className={classes.titleContainer}>
                        {books.map((book,index) => {
                          return <DisplayTitle  book={book} key={index}/>
                        })}
                        <Button onClick={() => { }} style={{ color: "white", marginTop: "20px" }} variant="outlined">
                            Show live articles
                </Button>
                    </Paper>
                </Paper>
            </div>
        )
}