import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { AlbumType } from '../../types';

function Search() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchBar, setSearchBar] = useState<string>('');
  const [searchButton, setSearchButton] = useState<boolean>(true);
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [artistName, setArtistName] = useState<string>('');

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(event.target.value);
    setSearchButton(event.target.value.length < 2);
  };

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setAlbums(await searchAlbumsAPI(searchBar));
    setLoading(false);
    setArtistName(searchBar);
    setSearchBar('');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input
          value={ searchBar }
          type="text"
          data-testid="search-artist-input"
          placeholder="Digite aqui o nome de um artista ou banda"
          onChange={ handleChange }
        />
        <button
          data-testid="search-artist-button"
          disabled={ searchButton }
        >
          Procurar
        </button>
      </form>
      <div>
        { albums.length > 0
          ? (
            <>
              <h1>
                {`Resultado de álbuns de: ${artistName}`}
              </h1>
              <div>
                { albums.map((album) => (
                  <Link
                    key={ album.collectionId }
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <p>{ album.collectionName }</p>
                    <img
                      src={ album.artworkUrl100 }
                      alt={ album.artistName }
                    />
                  </Link>
                )) }
              </div>
            </>
          ) : <h2>Nenhum álbum foi encontrado</h2> }
      </div>
    </>
  );
}

export default Search;
