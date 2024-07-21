import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx'
import './input.css'
import { ThemeProvider } from './contexts/ThemeContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    <ToastContainer />
  </>
)
