import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import Loading from '../../components/Loading';
import { UserType } from '../../types';

function ProfileEdit() {
  const navigate = useNavigate();
  const [info, setInfo] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const [validate, setValidate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const userData = async () => {
      const user = await getUser();
      setInfo(user);
      setLoading(false);
    };
    userData();
  }, []);

  useEffect(() => {
    const isName = info.name.length > 0;
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(info.email);
    const isDescription = info.description.length > 0;
    const isImage = info.image.length > 0;
    if (isName && isEmail && isDescription && isImage) {
      setValidate(true);
    }
  }, [info]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    updateUser(info);
    setLoading(false);
    navigate('/profile');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <p>Editar perfil</p>
      <form
        onSubmit={ handleSubmit }
      >
        <label>
          Nome:
          <input
            data-testid="edit-input-name"
            type="text"
            name="name"
            id="name"
            value={ info.name }
            onChange={ handleChange }
            placeholder="Digite seu nome"
          />
        </label>
        <label>
          E-mail:
          <input
            data-testid="edit-input-email"
            type="text"
            name="email"
            id="email"
            value={ info.email }
            onChange={ handleChange }
            placeholder="Digite seu e-mail"
          />
        </label>
        <label>
          Descrição:
          <textarea
            data-testid="edit-input-description"
            name="description"
            id="description"
            value={ info.description }
            onChange={ handleChange }
            placeholder="escreva algo..."
          />
        </label>
        <label>
          Url imagem:
          <input
            data-testid="edit-input-image"
            type="text"
            name="image"
            id="image"
            value={ info.image }
            onChange={ handleChange }
          />
        </label>
        <button
          data-testid="edit-button-save"
          disabled={ !validate }
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ProfileEdit;
