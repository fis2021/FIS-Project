import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useEffectAsync } from '../../hooks/async-hooks';
import { urls, useRouting } from '../../routing/routes';
import { getSingleBook, postBook, putBook } from '../../services/book-service';


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
        maxWidth: '500px'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const BookAdd = (p: RouteComponentProps<{ id: string }>) => {

    const [initialValues, setInitialValues] = useState<BookForm>();
    const { routeTo } = useRouting();
    const classes = useStyles();

    useEffectAsync(async () => {
        if (p.match.params.id) {
            const book = await getSingleBook(p.match.params.id);
            setInitialValues({
                title: book.title,
                author: book.author,
                genre: book.genre,
                description: book.description,
                cover: book.cover
            });
        } else {
            setInitialValues({
                title: "",
                author: "",
                genre: "",
                description: "",
                cover: ""
            })
        }
    },[]);

    type BookForm = {
        title: string;
        author?: string;
        genre: string;
        description: string;
        cover?: string;
    }

    const onSubmit = async (payload: BookForm) => {
        if (p.match.params.id) {
            await putBook(payload,p.match.params.id)
        } else {
            console.log(payload)
            await postBook(payload);
        }
        routeTo(urls.adminPanel);
    }

    if (!initialValues) {
        return <div></div>;
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Formik<BookForm>
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                >
                    {({ values, handleChange }) => {
                        return (
                            <Form>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} >
                                        <Typography variant="h4" gutterBottom >
                                            {p.match.params.id ? 'Edit Book' : 'Add Book'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                        >
                                            Save
                                    </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            onClick={e => {
                                                routeTo(urls.adminPanel);
                                            }}
                                            type="submit"
                                            variant="contained"
                                        >
                                            Cancel
                                    </Button>
                                    </Grid>

                                    <Grid item xs={10}>
                                        <TextField
                                            fullWidth
                                            label="Title"
                                            variant="outlined"
                                            value={values.title}
                                            id="title"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            fullWidth
                                            label="Author"
                                            variant="outlined"
                                            value={values.author}
                                            id="author"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            fullWidth
                                            label="Genre"
                                            variant="outlined"
                                            value={values.genre}
                                            id="genre"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <TextField
                                            fullWidth
                                            label="Description"
                                            variant="outlined"
                                            value={values.description}
                                            id="description"
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Form>
                        )
                    }}
                </Formik>
            </Paper>
        </div>
    )
}