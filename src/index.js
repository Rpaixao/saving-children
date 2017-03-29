import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory} from 'react-router';
import routes from './routes'
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = compose(applyMiddleware(thunk))(createStore)(reducers);;

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
    , document.querySelector('.container'));
