const express = require('express')
const app = express()
const path = require('path')
const userModel = require('./models/user')
const postModel = require('./models/post')
const { log } = require('console')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { decode } = require('punycode')



app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())

let secretKey = 'lakshya'

//protected fun

function isLoggedIN(req,res,next){
    if(req.cookies=="")                 //check if token is empty or not
    res.status(401).json({
  message: "login first",
  success: false
  })
  //always remember req.cookies.token is a way to get token
  jwt.verify(req.cookies.token,secretKey,(err,decoded)=>{   //decode the token to get email of user for 
    if(err)                                                 //for further operation
      return res.status(401).json({
        message: "unauthorized user",
        success: false
      });
    req.user = decoded;//put decoded information in object user then put user in req for further operation

    next();  //next calling when user is verified
    
  })
}

//get requests


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/home', (req, res) => {
  res.render('home')
})

app.get('/logout', (req, res) => {
  res.cookie('token',"")
  res.redirect('/')
})

app.get('/profile',isLoggedIN,async(req,res)=>{

    const user = await userModel.findOne({email: req.user.email})  //find user in db via decoded info
    if(!user)
      return res.status(404).json({
        message: "user not found in db",
        success: false
      });

      res.render('profile',{user})  //if user is existed show he/her profile 
    
})
// post requests

app.post('/register',async(req,res)=>{
  let {name,email,password}= req.body

  let user= await userModel.findOne({email})

  if(user) return res.status(409).json({
    success : false,
    message : "user already exists",
    message: "user already exists"
  })
  
  bcrypt.hash(password,10,async(err,hash)=>{
    if(err) return res.status(500).json({
      success : false,
      message : "internal server error",
  })

  let createdUser = await userModel.create({
      name,
      email,
      password:hash
  })

  //jwt token created for remembering
  let token = jwt.sign({
    email:createdUser.email,
    name: createdUser.name,
    admin: true
  },secretKey)

  res.cookie('token',token)
  res.redirect('/home')
  })

})

app.post('/login',async(req,res)=>{
  let {email,password}= req.body
  let user = await userModel.findOne({email})
  if(!user) return res.status(404).json({
    success : false,
    message : "user not found",
    message: "user not found"
  })

  bcrypt.compare(password,user.password,(err,result)=>{
    if(result){
      let token = jwt.sign({
        email:user.email,
        name: user.name,
        admin: true
      },secretKey)
      res.cookie('token',token)
      res.redirect('/home')
    }
  })

})


app.listen(3000);