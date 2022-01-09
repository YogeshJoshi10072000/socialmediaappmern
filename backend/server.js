const express=require('express');
const app=express();

const dotenv=require('dotenv');
const userrouter=require('./Routes/userRoutes');
const postroutes=require('./Routes/PostRoutes');
dotenv.config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/api/user",userrouter);
app.use("/api/post",postroutes);

// const port = 3000;
const connectdb=require('./database');
connectdb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})