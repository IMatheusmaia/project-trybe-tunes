import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';

function Album() {
  const { state } = useLocation();
  const id = String(state);
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [listMusic, setListMusic] = useState<SongType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchMusics = async () => {
      const data = await getMusics(id);
      const [info, ...musics] = data;
      setAlbum(info);
      setListMusic([...musics]);
      setLoading(false);
    };
    fetchMusics();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {album === null ? <h2>Nenhum álbum foi encontrado</h2>
        : (
          <div>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <h2
              data-testid="artist-name"
            >
              { album.artistName }
            </h2>
            <h3
              data-testid="album-name"
            >
              {album.collectionName}
            </h3>
            <ul>
              { listMusic.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                />))}
            </ul>
          </div>)}
    </div>
  );
}

export default Album;
