const express=require('express');
const cors=require('cors');
const app=express();
const multer = require("multer");
const path=require('path');

const dotenv=require('dotenv');
const userrouter=require('./Routes/userRoutes');
const postroutes=require('./Routes/PostRoutes');
const conversationroutes=require('./Routes/Conversation');
const messageroutes=require('./Routes/MessageRoutes');
dotenv.config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use("/api/user",userrouter);
app.use("/api/post",postroutes);
app.use("/api/conversation",conversationroutes);
app.use("/api/messages",messageroutes);

// const port = 3000;
const connectdb=require('./database');
connectdb();


app.use("/images", express.static(path.join(__dirname, "public/images")));
// console.log(path.join(__dirname), "/public/images")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join(__dirname)+"/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})