import { Configuration, OpenAIApi } from "openai";
import { Button, Card, CardActions, CardContent, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getNewsUsingThunk } from '../Slices/news.slice';
import formatDate from '../utils/formatDate';
import { Stack } from "@mui/system";

const NewsDetails = () => {
    const [summarizedtext, setsummarizedtext] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const article = useSelector(state => state.news.newsData)[id];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    function generatePrompt(text) {
        return `Summarize this ${text}. give answer in one or two line and must be less than provided text`;
    }

    const HandleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        openai
          .createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(article.description),
            temperature: 0.6,
            max_tokens: 100,
          }, {
            headers: {
                // "Example-Header": "example",
                "User-Agent": "stagefright/1.2 (Linux;Android 5.0)"
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setLoading(false);
              setsummarizedtext(res?.data?.choices[0]?.text);
            }
          })
          .catch((err) => {
            setLoading(false);
            console.log(err, "An error occured");
          });
    };

    useEffect(()=>{
        dispatch(getNewsUsingThunk())
    }, []);

    console.log(summarizedtext, "summarizedtext");

    return (
        <div>
            <Card sx={{ mb: 2 }} variant="outlined">
                <>
                    <CardActions>
                        <Button size="small" onClick={()=>navigate(`/news`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </Button>
                    </CardActions>
                    <CardContent sx={{ ml: 3, mb: 2 }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {formatDate(article?.publishedAt)}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {article?.author}
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold', mb: 2}} variant="body2" component="div">    
                            {/* {article?.description?.substring(0, 100)}... */}
                            {article?.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {article?.description}
                        </Typography>
                        <Button size="large" sx={{ mb: 2 }} disabled={loading}
                            onClick={summarizedtext ? ()=>{setsummarizedtext(false)} : HandleSubmit} variant="contained" color="success">
                            {summarizedtext ? "Hide Summary":"Summarize News"}
                            {loading && <span className='ml-4 mt-2'><CircularProgress size="24" color="inherit" /></span>}
                        </Button>
                        {summarizedtext && 
                            <Stack sx={{ mt: 3 }}>
                                <Typography sx={{ mb: 2 }} variant="h4" color="text.secondary">
                                    Summary
                                </Typography>
                                <Typography sx={{ fontWeight: 'bold', mb: 2}} variant="body2">
                                    {summarizedtext}
                                </Typography>
                            </Stack>}
                    </CardContent>
                </>
            </Card>
            {/* <Card sx={{ mb: 3 }} variant="outlined">
                <>
                    <CardContent sx={{ ml: 3 }}>
                        <Typography sx={{ mb: 2 }} variant="h4" color="text.secondary">
                            Summary
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold', mb: 2}} variant="body2">
                            {summarizedtext}
                        </Typography>
                        <Button size="large" disabled={loading}
                            onClick={(e)=>{setsummarizedtext(false)}} variant="contained" color="primary">
                                Hide Summary
                            {loading && <span className='ml-4 mt-2'><CircularProgress size="24" color="inherit" /></span>}
                        </Button>
                    </CardContent>
                </>
            </Card> */}
        </div>
    )
}

export default NewsDetails