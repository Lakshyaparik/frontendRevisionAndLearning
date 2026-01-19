const fs = require('fs')
// fs.rmdir==('C:/Users/Lakshy/OneDrive/Desktop/WinterStudy/backend/v1/demo',{recursive:true,force:false},(err)=>{
//   if(err) console.log(err);
//   else console.log('done');
// })

fs.readFile('C:/Users/Lakshy/OneDrive/Desktop/WinterStudy/backend/v1/script.js','utf8',(err,data)=>{
  if(err) console.log(err);
  else console.log("here it is your data :    ",data);
})