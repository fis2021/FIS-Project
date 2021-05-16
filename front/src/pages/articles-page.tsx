import { Card, CardContent, CircularProgress, Grid, makeStyles, Paper, Typography } from "@material-ui/core"
import React, { useState } from "react"
import { NavBar } from "../components/navbar";
import { useEffectAsync } from "../hooks/async-hooks";
import { getArticles } from "../services/scrapper-services";

const useStyles = makeStyles((theme) => ({
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
    card: {
        margin: "20px",
        width: "700px"
    }
}))

type BookArticle = {
    title: string;
    content: string;
}



const DisplayArticle = (p: { article: BookArticle }) => {
    const classes = useStyles();
    return (<Card className={classes.card}>
        <CardContent>
            <Typography variant="h5">
                {p.article.title}
            </Typography>
            <Typography>
                {p.article.content}
            </Typography>
        </CardContent>
    </Card>
    );
}

export const ArticlesPage = () => {

    const classes = useStyles();
    const [articles, setArticles] = useState<BookArticle[] | undefined>(undefined);

    useEffectAsync(async () => {
        if (localStorage.getItem("user")) {
            const result = await getArticles(JSON.parse(localStorage.getItem("user")!).email);
            console.log(result);
            setArticles(result.results);
        }
    }, []);

    if (!articles) {
        return (
            <div className={classes.root}>
                <NavBar />
                <div className={classes.scrollRoot}>
                    <div className={classes.paper}>
                    <CircularProgress color="inherit" />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={classes.root}>
                <NavBar />
                <div className={classes.scrollRoot}>
                    <div className={classes.paper}>
                        {articles.map((article, index) => {
                            return <div key={index}><DisplayArticle article={article} /> </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}