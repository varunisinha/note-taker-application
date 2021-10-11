const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const path = require('path')
const api = require('./routes/index.js');
console.log(__dirname);


//*** Middleware ***//
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/api', api);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
