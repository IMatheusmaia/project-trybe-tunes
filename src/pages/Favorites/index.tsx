import { useState, useEffect } from 'react';
import { SongType } from '../../types';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';

function Favorites() {
  const [favMusics, setFavMusics] = useState<SongType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const data = async () => {
      setLoading(true);
      const favorites = await getFavoriteSongs();
      setFavMusics(favorites);
      setLoading(false);
    };
    data();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (favMusics.length > 0) {
    return (
      <div>
        <h1>Músicas favoritas</h1>
        {favMusics.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            isFavorite={
                  favMusics.some((fav) => fav.trackId === music.trackId)
                }
          />
        ))}
      </div>
    );
  }
  return (<h2>Você ainda não favoritou nenhuma música </h2>);
}

export default Favorites;
