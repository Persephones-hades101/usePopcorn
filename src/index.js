import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating="5" messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']} />
    <StarRating maxRating={10} color="red" size={30} defaultRating={3} onSetRating={(e) => console.log(e)} /> */}
  </React.StrictMode>
);

