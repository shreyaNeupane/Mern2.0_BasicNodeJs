const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file)
    const allowedFileTypes = ['image/png','image/jpeg','image/jpg']

    if(!allowedFileTypes.includes(file.mimetype) ){
      cb(new Error("This filetype is not supported")) //incase of error 
      return
    }
    cb(null, "./storage"); //cb(error,sucess)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});


module.exports = {multer, storage}