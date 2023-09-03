import React, { useState, useEffect } from 'react';
import { SongType } from '../types';
import fillHeart from '../images/checked_heart.png';
import voidHeart from '../images/empty_heart.png';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

function MusicCard({ trackName, previewUrl, trackId }: SongType) {
  const [checked, setChecked] = useState<boolean>(false);
  const [initialLike, setInitialLike] = useState<boolean>(false);

  useEffect(() => {
    const addOrRemoveFavorite = async () => {
      if (checked === true) {
        console.log(await addSong({ trackName, previewUrl, trackId }));
      }
      if (checked === false) {
        console.log(await removeSong({ trackName, previewUrl, trackId }));
      }
    };
    if (initialLike) {
      addOrRemoveFavorite();
    }
  }, [checked, trackName, previewUrl, trackId]);

  const handleChange = () => {
    setChecked(!checked);
    setInitialLike(true);
  };

  return (
    <div>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
      <label
        data-testid={ `checkbox-music-${trackId}` }
      >
        <input
          type="checkbox"
          id={ trackName }
          checked={ checked }
          onChange={ handleChange }
        />
        {
      checked
        ? <img
            src={ fillHeart }
            alt="favorite"
        />
        : <img
            src={ voidHeart }
            alt="favorite"
        />
      }
      </label>
    </div>
  );
}

export default MusicCard;
