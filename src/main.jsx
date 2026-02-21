import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import moment from 'moment'
import 'moment/locale/bn'
import App from './App.jsx'
import './index.css'

moment.locale('bn')

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App />
  </StrictMode>,
)
