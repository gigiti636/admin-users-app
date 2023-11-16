import ReactDOM from 'react-dom/client';
import App from './App/UsersPage';
import { ErrorBoundary } from 'react-error-boundary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary
    fallback={
      <>
        <p>Something wrong happen! 🧐</p>
      </>
    }
  >
    <App />
  </ErrorBoundary>,
);
