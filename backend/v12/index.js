//from filedir we get all files and display on homepage
const { log } = require('console');
const express = require('express');
const app = express();
const fs = require('fs');
const { encode } = require('punycode');

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  fs.readdir('./files',(err,files)=>{
    if(err) throw err;
    res.render('index.ejs',{files:files});
  })
});

app.post('/create',(req,res)=>{
  fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.desc,'utf8',(err)=>{
    if(err) throw err;
    else
    res.redirect('/');
  });
})

app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`,'utf8',(err,data)=>{
      if(err) throw err;
      res.render('file.ejs',{filename:req.params.filename,filedata:data});
    });
});

app.get('/edit/:filename', (req, res) => {
    res.render('edit',{filename:req.params.filename.replace('.txt','')});
});

app.post('/rename',(req,res)=>{
  fs.rename(`./files/${req.body.oldName}.txt`,`./files/${req.body.newName}.txt`,(err)=>{
    if(err) throw err;
    else
    res.redirect('/');
  })
})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});