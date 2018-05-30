import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Questionnaire from './components/Questionnaire';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import store from './store/configureStore';

ReactDOM.render(
    <Provider store={store}>
        <Questionnaire />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
