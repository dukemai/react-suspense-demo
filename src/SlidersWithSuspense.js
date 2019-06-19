import React, { useState, Suspense } from 'react';
import axios from 'axios';

const AppContext = React.createContext({
  albums: [],
  setAlbums: () => {},
});

const createResource = fn => {
  let map = new Map();
  return {
    read(key) {
      if (map[key]) {
        return map[key];
      }
      throw fn()
        .then(({ data }) => {
          map[key] = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
  };
};

const albumsResource = createResource(() => {
  return axios.get('https://itunes.apple.com/in/rss/topalbums/limit=100/json');
});

const Albums = ({ albums, setAlbums }) => {
  const albumsFromServer = albumsResource.read('test-cache').feed.entry;
  setAlbums(albumsFromServer)
  return albums.map(e => {
    return (
      <img
        key={e['im:image'][2].label}
        src={e['im:image'][2].label}
        alt="bild"
      />
    );
  });
};

const Sliders = () => {
  const [albums, setAlbums] = useState([]);
  // setAlbums(albums);
  return (
    <AppContext.Provider value={{ albums, setAlbums }}>
      <Suspense fallback={<div>loading</div>}>
        <AppContext.Consumer>
          {({ albums, setAlbums }) => (
            <Albums albums={albums} setAlbums={setAlbums} />
          )}
        </AppContext.Consumer>
      </Suspense>
    </AppContext.Provider>
  );
};

export default Sliders;
