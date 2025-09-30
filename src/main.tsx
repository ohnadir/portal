import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './redux/store';
import { UserProvider } from "./provider/User";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </StrictMode>,
)
