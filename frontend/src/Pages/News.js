import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import TypographyTheme from '../Components/TypoHeadBtn';
import { getNewsUsingThunk } from '../Slices/news.slice'
import formatDate from '../utils/formatDate';


const News = () => {
  const articles = useSelector(state => state.news.newsData) || [];
  // console.log(articles, "newsssssss[aa");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(()=>{
    dispatch(getNewsUsingThunk())
  }, []);

  return (
    <div className='min-w-[257px] flex flex-col items-center'>
      <Typography variant="h3" sx={{ textAlign:'center' }}>
        Top News Of Today
      </Typography>;
      <Stack sx={{ maxWidth: 700 }}>
        {articles?.map(article =>(<Card key={article.id} sx={{ mb: 2 }} variant="outlined">
          <>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {formatDate(article?.publishedAt)}
              </Typography>
              <Typography variant="h5" component="div">
                
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {article?.author}
              </Typography>
              <Typography variant="body2">
                {/* {article?.description?.substring(0, 100)}... */}
                {article?.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="success"
                onClick={()=>navigate(`/news/${article.id}`)}>Read More</Button>
            </CardActions>
          </>
        </Card>))}
      </Stack>
    </div>
  )
}


export default News