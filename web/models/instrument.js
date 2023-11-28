const db = require('../ulti/database');



module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.videoId = videoId;
  }

//   save() {
//     return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)', 
//     [this.title, this.price, this.imageUrl, this.description]
//     )
//   }

  static deleteById(id) {
    
  }


  static fetchAll() {
    return db.execute('SELECT * FROM instruments');
  }

  static findById(id) {
    return db.execute('SELECT * FROM instruments WHERE instruments.id = ?', [id]);
  }
};
