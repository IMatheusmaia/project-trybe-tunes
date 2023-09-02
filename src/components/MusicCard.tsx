import { SongType } from '../types';

function MusicCard({ trackName, previewUrl, trackId }: SongType) {
  return (
    <>
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
          name="favoriteTrack"
          id={ trackName }
        />
      </label>
    </>
  );
}

export default MusicCard;
