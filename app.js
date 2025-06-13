const express = require("express");
const app = express();
const fs = require("fs");

const connectToDatabase = require("./database");
const Book = require("./model/bookModel");

//multerconfig imports

const { multer, storage } = require("./middleware/multerConfig");
const upload = multer({ storage: storage });

// Alternative
//  const app = require('express')( )

//cors package
const cors = require('cors')

app.use(cors({
  origin: '*',
  // origin:'http://127.0.0.1:5173' - if you want to give data access only specific port number
}))

app.use(express.json());
connectToDatabase();

app.get("/", (req, res) => {
  res.json("bye world");
});
//  Create a book
app.post("/book", upload.single("image"), async (req, res) => {
  let fileName;
  if (!req.file) {
    fileName =
      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740";
  } else {
    fileName = "https://localhost:3000/" + req.file.fieldname;
  }
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
    imageUrl: fileName,
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

 // update operation
app.patch("/book/:id",upload.single('image'), async (req ,res)=>{
  const id = req.params.id //kun book update garne id ho yo
  const {
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
  } = req.body || {};
  // updateing image
  const oldDatas = await Book.findById(id) 
   let fileName = oldDatas.imageUrl;
  if(req.file){

     const oldImagePath = oldDatas.imageUrl
    console.log(oldImagePath)      //this image path stores local host url
    const localHostUrlLength = "http://localhost:3000/".length
    const newOldImagePath = oldImagePath.slice(localHostUrlLength) //slicing localhost url
    console.log(newOldImagePath) //only the image name
    fs.unlink(`storage/${newOldImagePath}`,(err)=>{
      if(err){
        console.log(err)
      }else{
        console.log("File Deleted Sucessfully")
      }
    })
    fileName = "http://localhost:3000/" + req.file.filename
   }
  // 
  await Book.findByIdAndUpdate(id, {
    bookName : bookName,
    bookPrice : bookPrice,
    isbnNumber :isbnNumber,
    authorName : authorName,
    publishedAt : publishedAt,
    publication : publication,
    imageUrl: fileName
  });
  res.status(200).json({
      message : "Book updated Sucessfully"
  })
})
// billion dollar mistake if there is ./ (whole website can be hacked easily)
app.use(express.static("./storage/")); //koi manxe le root bata storage vitra ko kura read garna diney

app.listen(3000, () => {
  console.log("Node js server has stated at port 3000");
});
