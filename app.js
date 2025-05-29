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
  // const { bookName , bookPrice , isbnNumber, authorName , publishedAt , publication} = req.body
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
  //  console.log(books)
  res.status(200).json({
    message: "Books fetched sucessfully",
    data: books,
  });
});

//single read
app.get("/book/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id); // findbyid le return object garxa
    if (!book) {
      res.status(404).json({
        message: "book NOt found",
      });
    } else {
      res.status(200).json({
        message: "Single Book triggered",
        data: book,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.listen(3000, () => {
  console.log("Node js server has stated at port 3000");
});
