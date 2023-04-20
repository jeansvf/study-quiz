import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import SideBarContext from './SideBarContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SideBarContext>
      <App />
    </SideBarContext>
  </React.StrictMode>,
)
