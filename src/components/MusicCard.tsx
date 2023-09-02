import { useState } from 'react';
import { SongType } from '../types';
import fillHeart from '../images/checked_heart.png';
import voidHeart from '../images/empty_heart.png';

function MusicCard({ trackName, previewUrl, trackId }: SongType) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
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
      <label data-testid={ `checkbox-music-${trackId}` }>
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
