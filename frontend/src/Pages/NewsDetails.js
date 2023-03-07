import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getNewsUsingThunk } from '../Slices/news.slice';
import formatDate from '../utils/formatDate';

const NewsDetails = () => {
    const { id } = useParams();
    const article = useSelector(state => state.news.newsData)[id];
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getNewsUsingThunk())
      }, []);

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
                    <CardContent sx={{ ml: 3 }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {formatDate(article?.publishedAt)}
                        </Typography>
                        <Typography variant="h5" component="div">
                            
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {article?.author}
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold', mb: 2}} variant="body2">    
                            {/* {article?.description?.substring(0, 100)}... */}
                            {article?.title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {article?.description}
                        </Typography>
                        <Button size="large" onClick={()=>{}} variant="contained" color="success">
                            Summarize News
                        </Button>
                    </CardContent>
                </>
            </Card>
        </div>
    )
}

export default NewsDetails