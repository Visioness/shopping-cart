import {
  useRouteError,
  isRouteErrorResponse,
  Link,
  useNavigate,
} from 'react-router-dom';
import styles from './ErrorPage.module.css';

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error?.message || 'Something went wrong';

  return (
    <div className={styles.error} role='alert'>
      <h2>Oops!</h2>
      <p>{message}</p>
      <div>
        <button type='button' onClick={() => navigate(0)}>
          Try again
        </button>
        <button type='button' onClick={() => navigate(-1)}>
          Go back
        </button>
        <Link to='/shop'>Shop</Link>
        <Link to='/'>Home</Link>
      </div>
    </div>
  );
}

export default ErrorPage;
