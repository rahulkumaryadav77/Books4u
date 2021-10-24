const Books = require('../models/books');
const People = require('../models/peoples');
const Category = require('../models/categoriesbook');
const { escapeRegExp } = require('../middleware/middleware');

module.exports = {
  // bookCategory(req, res) {
  //     res.render('admin/addCategory', { title: 'Admin'});
  // },
  async addBookCategory(req, res) {
    var title = req.body.title;
    //console.log(title)
    var slug = title.replace(/\s+/g, '_').toLowerCase();
    //console.log(slug)
    const cat = await Category.findOne({ slug: slug });
    if (cat) {
      // console.log('Category already exists');
      req.flash('warning', 'Category already exists !');
      return res.redirect('/admin/category');
    }
    const newCat = await Category.create({ title: title, slug: slug });
    req.flash('success', 'Category Added !');
    res.redirect('/admin/category');
  },
  async updateCategory(req, res) {
    const cat = await Category.findById(req.params.catId);
    cat.title = req.body.title;
    await cat.save();
    req.flash('success', 'Category updated successfully !')
    res.redirect('/admin/category');
  },
  async deleteCategory(req, res) {
    await Category.findByIdAndDelete(req.params.catId);
    req.flash('success', 'Category deleted successfully !')
    res.redirect('/admin/category');
  },
  async getAllBooks(req, res) {
    if (req.query.search) {
      let regEx = new RegExp(escapeRegExp(req.query.search), 'gi');
      const categories = await Category.find({});
      const book = await Books.find({
        $or: [{ title: regEx }, { category: regEx }],
      });
      const dataChunk = [];
      const chunkSize = 3;
      for (let i = 0; i < book.length; i += chunkSize) {
        dataChunk.push(book.slice(i, i + chunkSize));
      }
      //console.log(dataChunk);
      res.render('book', { title: 'Books', books: dataChunk, categories });
    } else {
      const categories = await Category.find({});
      const book = await Books.find({});
      const dataChunk = [];
      const chunkSize = 3;
      for (let i = 0; i < book.length; i += chunkSize) {
        dataChunk.push(book.slice(i, i + chunkSize));
      }
      //console.log(dataChunk);
      res.render('book', { title: 'Books', books: dataChunk, categories });
    }
  },
  async bookForm(req, res) {
    const category = await Category.find({});
    res.render('admin/newBookForm', { title: 'Admin', category });
  },
  async newBooks(req, res) {
    var bookTitle = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const image = req.body.image;
    const category = req.body.category;
    const Buylink = req.body.Buylink;
    const publishedDate = req.body.publishedDate;
    const rating = req.body.rating;
    const bookDetails = {
      title: bookTitle,
      description: description,
      rating: rating,
      author: author,
      image: image,
      slug: bookTitle.replace(/\s+/g, '_').toLowerCase(),
      category: category,
      Buylink: Buylink,
      publishedDate: publishedDate,
    };
    const book = await Books.findOne({
      slug: bookTitle.replace(/\s+/g, '_').toLowerCase(),
    });
    const rcmndByPeople = await People.find({ recomendation: bookTitle });
    if (book) {
      // console.log('Book already exist');
      req.flash('warning', 'Book already exist !')
      return res.redirect('/addBooks');
    }
    const newBook = await Books.create(bookDetails);
    newBook.recommendedBy = rcmndByPeople;
    await newBook.save();
    req.flash('success', 'Book created successfully !')
    res.redirect('/allBooks');
  },
  async getBookByCat(req, res) {
    const categories = await Category.find({});
    const category = await Category.findOne({
      slug: req.params.category.replace(/\s+/g, '_').toLowerCase(),
    });
    if (category) {
      const books = await Books.find({
        category: req.params.category.replace(/\s+/g, '_').toLowerCase(),
      });
      return res.render('catBooks', {
        title: 'Books',
        category,
        categories,
        books,
      });
    }
    // console.log('No such category');
    req.flash('warning', 'No such category exist !')
    res.redirect('/allBooks');
  },
  async bookDetails(req, res) {
    const category = await Category.findOne({
      slug: req.params.category.replace(/\s+/g, '_').toLowerCase(),
    });
    if (category) {
      const book = await Books.findOne({
        slug: req.params.slug.replace(/\s+/g, '_').toLowerCase(),
      });
      // console.log(book)
      const rcmdByPeople = await People.find({ recomendation: book.title });
      return res.render('bookDetails', { title: 'Books', book, rcmdByPeople });
    }
    console.log('No such category');
    res.redirect('/allBooks');
  },
  async recommendedBooks(req, res) {
    const categories = await Category.find({});
    const book = await Books.find({ rating: { $gt: 4.5 } });
    const dataChunk = [];
    const chunkSize = 3;
    for (let i = 0; i < book.length; i += chunkSize) {
      dataChunk.push(book.slice(i, i + chunkSize));
    }
    //console.log(dataChunk);
    res.render('mostRecommendedBooks', {
      title: 'Books',
      books: dataChunk,
      categories,
    });
  },
  async editBook(req, res) {
    const book = await Books.findOne({ slug: req.params.slug });
    const category = await Category.find({});
    res.render('admin/editBook', { title: 'Admin', book, category });
  },
  async updateBook(req, res) {
    const book = await Books.findOne({ slug: req.params.slug });
    book.title = req.body.title;
    book.slug = req.body.title.replace(/\s+/g, '_').toLowerCase();
    book.description = req.body.description;
    book.author = req.body.author;
    book.image = req.body.image;
    book.category = req.body.category;
    book.Buylink = req.body.Buylink;
    book.publishedDate = req.body.publishedDate;
    book.rating = req.body.rating;
    const rcmndByPeople = await People.find({ recomendation: book.title });
    book.recommendedBy = rcmndByPeople;
    await book.save();
    req.flash('success', 'Book updated successfully !');
    res.redirect('/admin/book');
  },
  async deleteBook(req, res) {
    await Books.findOneAndDelete({ slug: req.params.slug });
    req.flash('success', 'Book deleted successfully !');
    res.redirect('/admin/book');
  },
};
