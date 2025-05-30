const express = require("express");
const app = express();

const connectToDatabase = require("./database");
const Book = require("./model/bookModel");

// Alternative
//  const app = require('express')( )

app.use(express.json());
connectToDatabase();

app.get("/", (req, res) => {
  res.json("bye world");
});
//  Create a book
app.post("/book", async (req, res) => {
  const {
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
  } = req.body;
  // console.log(bookName, bookPrice, isbnNumber, authorName, publishedAt , publication);
  await Book.create({
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
  });
  res.status(201).json({
    message: "Book created sucessfully",
  });
});

//all read
app.get("/book", async (req, res) => {
  const books = await Book.find(); //find returns in array
  res.status(200).json({
    message: "Books fetched sucessfully",
    data: books,
  });
});

//single read
app.get("/book/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id); // findbyid le return object garxa
  res.status(200).json({
    message: "Single Book triggered",
    data: book,
  });
});

//delete operation
app.delete("/book/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Book.findByIdAndDelete(id); // findbyid le return object garxa
  res.status(200).json({
    message: "Book deleted sucessfully ",
    data: book,
  });
});

//update operation
app.patch("/book/:id", async (req ,res)=>{
    const id = req.params.id //kun book update garne id ho yo
    const {
      bookName,
      bookPrice,
      isbnNumber,
      authorName,
      publishedAt,
      publication,
    } = req.body;
    await Book.findByIdAndUpdate(id, {
      bookName : bookName,
      bookPrice : bookPrice,
      isbnNumber :isbnNumber,
      authorName : authorName,
      publishedAt : publishedAt,
      publication : publication,
    });
    res.status(200).json({
        message : "Book updated Sucessfully"
    })
})

app.listen(3000, () => {
  console.log("Node js server has stated at port 3000");
});
