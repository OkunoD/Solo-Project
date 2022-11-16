const express = require('express')
const app = express()
const port = 3000
const path = require('path');

//serve
app.use(express.static("./dist"));





app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
});