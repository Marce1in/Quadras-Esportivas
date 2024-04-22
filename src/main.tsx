import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import './index.css'

import { Atlas } from '../classes/atlas.ts'

const atlas: Atlas = new Atlas


// @ts-ignore
atlas.gerar.quadras(10)
atlas.gerar.membros(5)
atlas.gerar.reservas(3)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <App atlas={atlas}/>
  </React.StrictMode>,
)
