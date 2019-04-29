import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom' ;
import './App.scss';
import App from './App';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux/store';
const { persistor, store } = configureStore();


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>, document.getElementById('root')
);
