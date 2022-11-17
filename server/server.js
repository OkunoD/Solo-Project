const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const webpack = require('webpack');


//serve
app.use(express.static('../dist'));

// console.log('server updated')
// const mainPage = path.join(__dirname, '../dist/index.html');
// console.log(mainPage); 


// app.get('/', (req, res) => {
//     res.sendFile(mainPage);
//     // res.sendFile();
// });



// app.use('/*', function(req, res){
//     res.sendFile('/Users/derekokuno/codesmith/SoloProjectVirtualWardrobe/dist/index.html'); // change the path to your index.html
// });
app.get('/*', (req, res) => {
    res.sendFile('/Users/derekokuno/codesmith/SoloProjectVirtualWardrobe/dist/index.html')
});


app.listen(port, (error) => {
    if(error) {
        console.log('Something went wrong', error)
    } else {
    console.log(`Express is listening on localhost:${port}`)
    }
});