import React from 'react';
import ReactDOM from 'react-dom';
// components
import App from './components/App';
//
import ApiProvider from './contexts/ApiProvider';
// Style
import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
