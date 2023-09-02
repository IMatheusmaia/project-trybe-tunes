import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';
import Loading from './Loading';

function Header() {
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const recoveryUser = async () => {
      const response = await getUser();
      setUser(response);
      setLoading(false);
    };
    recoveryUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <span
          data-testid="header-user-name"
        >
          { user?.name }
        </span>
      </div>
      <div
        data-testid="header-component"
      >
        <NavLink
          to="/search"
          data-testid="link-to-search"
        >
          Busca
        </NavLink>
        <NavLink
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favoritos
        </NavLink>
        <NavLink
          to="/profile"
          data-testid="link-to-profile"
        >
          Perfil
        </NavLink>
      </div>
    </>
  );
}

export default Header;
