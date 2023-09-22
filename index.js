const pg = require('pg');
const client = new pg.Client('postgres://localhost/anime_db');
const express = require('express');
const app = express();
const path = require('path');

const homePage = path.join(__dirname, 'index.html');
app.get('/', (req, res)=> res.sendFile(homePage));

const reactApp = path.join(__dirname, 'dist/main.js');
app.get('/dist/main.js', (req, res)=> res.sendFile(reactApp));

const reactSourceMap = path.join(__dirname, 'dist/main.js.map');
app.get('/dist/main.js.map', (req, res)=> res.sendFile(reactSourceMap));

const styleSheet = path.join(__dirname, 'styles.css');
app.get('/styles.css', (req, res)=> res.sendFile(styleSheet));

//GET
app.get("/api/anime", async(req,res,next) =>{
  res.send("we are connected on the server")
})

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  const SQL = `
    SQL SETUP AND SEED
  `;
  console.log('create your tables and seed data');

  const port = process.env.PORT || 2800;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();
