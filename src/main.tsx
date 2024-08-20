import ReactDOM from 'react-dom/client';
import App from './App/index';
import { ErrorBoundary } from 'react-error-boundary';
import { worker } from '@/__mocks__/browser';

async function enableMocking() {
  return worker.start();
}

enableMocking().then(() => {
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
});
