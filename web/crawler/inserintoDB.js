const fs = require('fs');
const Instrument = require('../models/instrument');

const userId = 1; // Đặt userId của người tạo ra nhạc cụ

// Đọc nội dung từ tệp tin
const fileName = 'output1.txt';
const fileContent = fs.readFileSync(fileName, 'utf-8');

// Chia các dòng trong tệp thành mảng
const instrumentNames = fileContent.split('\n').map(name => name.trim());

// Hàm để thêm tên nhạc cụ vào cơ sở dữ liệu
async function insertInstrumentNamesIntoDB(names, creatorUserId) {
  try {
    // Lặp qua từng tên nhạc cụ và thêm vào cơ sở dữ liệu với userId
    for (const name of names) {
      await Instrument.create({ title: name, userId: creatorUserId });
    }

    console.log('Dữ liệu đã được chèn vào cơ sở dữ liệu.');
  } catch (error) {
    console.error('Lỗi khi chèn dữ liệu:', error);
  }
}

// Gọi hàm để chèn dữ liệu vào cơ sở dữ liệu
insertInstrumentNamesIntoDB(instrumentNames, userId);
