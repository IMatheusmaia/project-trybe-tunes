import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>
        Página não encontrada
      </h1>
      <Link to="/"> Voltar </Link>
    </>
  );
}

export default NotFound;
