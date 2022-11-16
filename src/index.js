import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

// ReactDOM.render(
// <Provider store={store}>
//     <App />
// </Provider>
// , document.getElementById('root')
// ); 


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);