import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

import React from 'react'
import { Provider } from 'react-redux'

import Home from './containers/Home'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home />
      </div>
    </Provider>
  )
}

export default App
