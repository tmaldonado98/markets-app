// import express, { Request, Response } from 'express';
// import cors from 'cors';
const express = require('express');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(cors()); 


app.get('/routes/markets', (req, res) => {
  
  const ticker = req.query.ticker;  
  axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?metrics=high?&interval=1d&range=1mo`)
  .then(response => {
        console.log(response.data);
        res.json(response.data)
    })
  // .catch(res.status(500).send({ error: 'An error occurred' }))

  // res.send('Hello, world!');
  });


// Compile TypeScript: Since you're using TypeScript, you need to compile your TypeScript code to JavaScript before running it. Run the following command to compile the TypeScript code:
// npx tsc

// then   -->  node server.js
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});