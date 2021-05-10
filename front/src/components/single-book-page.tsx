/* eslint-disable jsx-a11y/alt-text */
import { Button, Container, Divider, makeStyles, Paper, TextareaAutosize, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useEffectAsync } from '../hooks/async-hooks'
import { useData } from '../hooks/useData'
import { Book } from '../models/book'
import { Review } from '../models/review'
import { ReviewPayload } from '../models/review-payload'
import { getSingleBook } from '../services/book-service'
import { getReviews, uploadReview } from '../services/review-service'
import { NavBar } from './navbar'

const useStyles = makeStyles((theme) => ({
    rootPaper: {
        paddingTop: "100px",
        backgroundColor: "transparent",
        color: "white",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll',
        maxHeight: '100vh',
    },
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/content-background.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    scrollRoot: {
        height: '100vh',
        overflow: 'hidden',
        width: '100%',
        position: 'relative'
    },
    reviews: {
        backgroundColor: "transparent",
        width: "800px",
        margin: "30px",
        padding: "10px"
    },
    singleReview: {
        padding: "10px",
        margin: "10px",
        border: "1px solid",
        borderColor: "gray",
        borderRadius: "15px"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))


export const BookPage = (p: RouteComponentProps<{ id: string }>) => {

    const [reload, setReload] = useState(false);
    const [book, setBook] = useState<Book>();
    const classes = useStyles();

    useEffectAsync(async () => {
        const data = await getSingleBook(p.match.params.id);
        setBook(data);
    }, []);

    const initialValues = {
        description: "",
        date: "",
        bookId: p.match.params.id,
    }

    const { data: reviews, isLoading } = useData(getReviews, [reload], p.match.params.id)

    const onSubmit = async (payload: ReviewPayload) => {

        const date = new Date();
        payload.date = date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
        console.log(payload.date)
        try {
            const result = await uploadReview(payload);
            console.log(result);
            if (result) {
                setReload(!reload);
            }
        } catch (e) {
            console.log(e);
        }
    }

    if (!book || isLoading) {
        return <div></div>
    }
    return (
        <div className={classes.root}>
            <NavBar />
            <div className={classes.scrollRoot}>
                <Paper className={classes.rootPaper} elevation={3}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Container>
                            <img
                                src="https://picsum.photos/400/600"
                            />
                        </Container>
                        <Container>
                            <Typography variant="h2">{book.title}</Typography>
                            <Typography variant="h5" style={{ textAlign: "end" }}>{book.author}</Typography>
                            <Typography style={{ textAlign: "start" }}>Genre: {book.genre}</Typography>
                            <Typography style={{ marginTop: "20px" }}>{book.description}</Typography>
                        </Container>
                    </div>
                    <Divider style={{ background: 'black', width: "100%" }} variant="middle" />
                    <div className={classes.reviews}>
                        {reviews.map((review: Review) => {
                            return (
                                <div className={classes.singleReview} key={review._id}>
                                    <Typography style={{ textAlign: "start" }} variant="h5">
                                        {review.description}
                                    </Typography>
                                    <Typography style={{ textAlign: "end" }}>
                                        {review.date}
                                    </Typography>
                                </div>
                            )
                        })}
                    </div>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        {({ handleChange, values }) => {
                            return (
                                <Form>
                                    <TextareaAutosize
                                        rowsMin={3}
                                        style={{ width: "350px" }}
                                        aria-label="Add a review"
                                        placeholder="Add a review"
                                        value={values.description}
                                        id="description"
                                        onChange={handleChange}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            );
                        }}
                    </Formik>
                </Paper>
            </div>
        </div>
    )
}