import React, { Suspense } from 'react';
import axios from 'axios';
import { unstable_createResource } from 'react-cache';

const albumsResource = unstable_createResource(() => {
  return axios.get('https://itunes.apple.com/in/rss/topalbums/limit=100/json');
});
const Albums = () => {
  const albums = albumsResource.read();
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
  return (
    <section>
      <Suspense fallback={<div>loading</div>}>
        <Albums />
      </Suspense>
    </section>
  );
};

export default Sliders;
