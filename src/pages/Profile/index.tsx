import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import { UserType } from '../../types';

function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    setLoading(true);
    const dataUser = async () => {
      const profile = await getUser();
      setUser(profile);
      setLoading(false);
    };
    dataUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return (
      <div>
        <h2>Nome</h2>
        <p>{ user.name }</p>

        <h2>Email</h2>
        <p>{ user.email }</p>

        <h2>Descrição</h2>
        <p>{ user.description }</p>

        <img
          data-testid="profile-image"
          src={ user.image }
          alt="avatar"
        />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
