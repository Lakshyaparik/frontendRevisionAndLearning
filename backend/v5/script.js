const express = require('express');
const { log } = require('node:console');
const app = express();

// app.get('route','requestlistener/callback function')

app.get('/',(req,res)=>{
  res.send('Hello World');
})
app.get('/about',(req,res)=>{
  res.send('About Us Page');
})
app.get('/contact',(req,res)=>{
  res.send('Contact Us Page');
})
app.get('/products',(req,res)=>{
  res.send('products Page');
})
app.listen(3000,()=>{
  console.log('listening on port 3000');
})