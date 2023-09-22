import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios'

const App = ()=> {
  const [anime_db, setAnime_db] = useState([])
  useEffect(() =>{
    const fetchAnime = async() =>{
      const response = await axios.get('/api/anime_db');
      setAnime_db(response.data)//total num of movies
      //console.log(response)//need response.data
    }
    fetchAnime()
  }, [])
  return (
    <div>
      <h1>Anime Movies ({ anime_db.length }) </h1>
      <ul>
        {
          anime_db.map(anime => {
            return (
              <li key={ anime.id }>
                {anime.name}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
