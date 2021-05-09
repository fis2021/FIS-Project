import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useEffectAsync } from '../../hooks/async-hooks';
import { urls, useRouting } from '../../routing/routes';
import { getSingleBook, postBook, putBook } from '../../services/book-service';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { BookPayload } from '../../models/book-payload';
import { uploadImage } from '../../services/image-service';


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
                coverUrl: book.coverUrl,
            });
        } else {
            setInitialValues({
                title: "",
                author: "",
                genre: "",
                description: "",
                coverUrl: "",
                file: null
            })
        }
    }, []);

    type BookForm = {
        title: string;
        author?: string;
        genre: string;
        description: string;
        coverUrl?: string;
        file?: File | null;
    }

    const onSubmit = async (payload: BookForm) => {
        const { file, ...bookPayload } = payload;
        if (p.match.params.id) {
            // if (file) {
            //     bookPayload.coverUrl = await uploadImage(bookPayload.title ,bookPayload.file);
            // }
            bookPayload.coverUrl = "";
            await putBook(bookPayload, p.match.params.id)
        } else {
            // if (file) {
            //     bookPayload.coverUrl = await uploadImage(bookPayload.title ,bookPayload.file);
            // }
            bookPayload.coverUrl = "";
            await postBook(bookPayload);
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
                    {({ values, handleChange, setValues }) => {

                        const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
                            if (event.target.files) {
                                const file = event.target.files[0];
                                const picture = URL.createObjectURL(file);
                                setValues({ ...values, coverUrl: picture, file: file })
                            }
                        }

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
                                    <input
                                        id="button-file"
                                        type="file"
                                        onChange={handleImageUpload}
                                        style={{ display: "none" }}
                                    />
                                    <label htmlFor="button-file">
                                        <Button variant="contained" component="span">
                                            File Upload <CloudUploadIcon style={{ paddingLeft: "0.2em" }} />
                                        </Button>
                                    </label>
                                    <div >
                                        <img alt="" src={values.coverUrl} width="400px" height="auto" />
                                    </div>
                                </Grid>
                            </Form>
                        )
                    }}
                </Formik>
            </Paper>
        </div>
    )
}