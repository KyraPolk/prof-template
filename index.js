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
app.get("/api/anime_db", async(req,res,next) =>{
  //try,catch,response
  try{
   const SQL = `
   SELECT *
   FROM anime_db
   `;
   const response = await client.query(SQL)
   res.send(response.rows)
  }
  catch(error){
    next(error)
  }
})

const init = async()=> {
  await client.connect();
  console.log('connected to database');
  const SQL = `
  DROP TABLE IF EXISTS anime_db;
  CREATE TABLE anime_db(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
  );
  INSERT INTO anime_db(name) VALUES('Red');
  INSERT INTO anime_db(name) VALUES('Broly');
  INSERT INTO anime_db(name) VALUES('Sword of the Wizard King')
  `
  //console.log('create your tables and seed data');
  await client.query(SQL)

  const port = process.env.PORT || 2800;
  app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
  });
}

init();
