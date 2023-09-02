import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { createUser } from '../../services/userAPI';

function Login() {
  const [nome, setNome] = useState<string>('');
  const [visibility, setVisibility] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
    setVisibility(event.target.value.length < 3);
  };

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await createUser({ name: nome });
    setLoading(false);
    redirect('/search');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={ handleSubmit }>
      <label>
        Nome
        <input
          value={ nome }
          type="text"
          placeholder="digite seu nome"
          data-testid="login-name-input"
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="login-submit-button"
        disabled={ visibility }
      >
        Entrar
      </button>
    </form>
  );
}
export default Login;
