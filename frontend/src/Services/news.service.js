// 601198fd68ee4cfe8fdaafd0b449492e

import axios from 'axios';


var url = 'https://newsapi.org/v2/everything?' + 'q=Apple&' + 'from=2023-03-06&' + 'sortBy=popularity&' + 'apiKey=601198fd68ee4cfe8fdaafd0b449492e';

let nyTimesUrl = "https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=2kY8V7izD3GNjhkNJ3WYqqxKs4DH6Seg"
class NewsService {
  
  getNews() {
    // return fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=601198fd68ee4cfe8fdaafd0b449492e')
    return fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=601198fd68ee4cfe8fdaafd0b449492e&pageSize=10')
    .then(response => response.json())
    .then(data => {
      const article = data.articles;
      return article;
    })
    .catch(error => console.error(error));;
  }
}

export default new NewsService();
