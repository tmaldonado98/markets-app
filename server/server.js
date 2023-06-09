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
        // console.log(response.data);
        res.json(response.data)
    })
  .catch(error => console.error('An error occurred: ' + error))
});

app.get('/routes/markets/fundamentals', (req, res) => {
  const ticker = req.query.ticker;  
  const modules = req.query.modules;  
  console.log(modules)
  axios.get(`https://query1.finance.yahoo.com/v11/finance/quoteSummary/${ticker}?modules=${modules}`,
  // {params: {
  //     modules: 'defaultKeyStatistics,financialData',
  //   }
  // }
  )
  .then(response => res.json(response.data))
  // .catch(error => console.error('An error occurred with fundamentals data: ' + error))
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



    // "dev": "next dev",
