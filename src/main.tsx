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

//TODO
//create  feature userList, put there hook and a provider, ** have to create wrapper for provider
//use context instead of hook
//restructure files

//todo css modifications
//todo create a READ.MD file
//todo make app accessible
//todo modify form to be used as hook for re-usability
//TODO Write tests
