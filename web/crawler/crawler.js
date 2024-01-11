const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://nhaccutienmanh.vn/nhac-cu-dan-toc-viet-nam/';

axios.get(url)
  .then(response => {
    const htmlContent = response.data;

    if (htmlContent) {
      const $ = cheerio.load(htmlContent);
      const postContents = [];

      // Lọc và lấy nội dung của các phần tử có class .post-content
      $('.post-content').each((index, element) => {
        const content = $(element).text().trim();
        postContents.push(content);
      });

      // In ra nội dung của các phần tử có class .post-content
      console.log('Nội dung các phần tử có class .post-content:');
      postContents.forEach(content => {
        console.log(content);
        console.log('-----------------------------');
      });
    } else {
      console.log('Không có dữ liệu HTML.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
