const express = require('express');
const app = express();

// for parsing application/json    or raw json   //mostly send by react,angular,http clients
app.use(express.json());
// for parsing application/x-www-form-urlencoded // mostly send by html forms
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log('middleware executed');
    next();
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})