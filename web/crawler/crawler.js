const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://nhaccutienmanh.vn/nhac-cu-dan-toc-viet-nam/';

axios.get(url)
  .then(response => {
    const htmlContent = response.data;

    if (htmlContent) {
      const $ = cheerio.load(htmlContent);

      // Mảng để lưu trữ nội dung của các phần tử h3
      const h3Contents = [];

      // Lấy nội dung từ các phần tử h3 bên trong .post-content
      $('.post-content h3').each((index, element) => {
        // Lọc bỏ số và dấu chấm đằng trước nội dung của h3
        const h3Content = $(element).text().replace(/^\d+[\/\.]\s*/, '').trim();
        h3Contents.push(h3Content);
      });

      // Ghi dữ liệu vào tệp tin
      const fileName = 'output1.txt';
      const fileContent = h3Contents.join('\n');

      fs.writeFileSync(fileName, fileContent, 'utf-8');
      console.log(`Dữ liệu của các phần tử <h3> đã được ghi vào tệp tin ${fileName}`);
    } else {
      console.log('Không có dữ liệu HTML.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
