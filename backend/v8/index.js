//ejs mastering
//ejs = embedded javascript template for rendering html pages with javascript
//setting up ejs as view engine
//rendering ejs file on browser
//create public folder for static files(css,js,img etc)
//setting up path for static files
const path = require('path');
const express = require('express');
const app = express();

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));


express.json();
express.urlencoded({extended: true});

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(2999,(req,res)=>{
    console.log('Server is running on port 2999');
})

