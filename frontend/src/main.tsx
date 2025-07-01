import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Elemento #root não encontrado')
const root = ReactDOM.createRoot(container)
root.render(<App />)
