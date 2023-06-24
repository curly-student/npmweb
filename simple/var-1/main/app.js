const express = require('express')
const path = require('path')

const app = express()

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.get('/cars', (req, res) => {
    let filter = req.query.filter
    if (!filter){
        res.status(200).json([{
            name :  'a',
            color : 'red'
        },{
            name :  'b',
            color : 'blue'
        }])
    }
    else{
        res.status(200).json([{
            name :  'a',
            color : 'red'
        },{
            name :  'b',
            color : 'blue'
        }].filter((e) => e.color === filter))
    }
})

module.exports = app