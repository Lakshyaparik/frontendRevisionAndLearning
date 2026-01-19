const fs = require('fs');
// fs.appendFile('hey.txt','hey this is me abc',(err)=>{
//   if(err) console.log(err);
//   else
//   console.log('done');
// })
// fs.rename('C:\\Users\\Lakshy\\OneDrive\\Desktop\\WinterStudy\\backend\\v1\\hey.txt','C:\\Users\\Lakshy\\OneDrive\\Desktop\\WinterStudy\\backend\\v1\\hello.txt',(err)=>{
//   if(err) console.log(err);
//   else console.log('done');
// })

fs.copyFile('C:\\Users\\Lakshy\\OneDrive\\Desktop\\WinterStudy\\backend\\v1\\hello.txt','C:\\Users\\Lakshy\\OneDrive\\Desktop\\WinterStudy\\backend\\v1\\copy.txt',(err)=>{
  if(err)console.log(err)
  else console.log('done');
  
})