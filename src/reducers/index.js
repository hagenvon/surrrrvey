import { combineReducers } from 'redux';
import questionnaire from './questionnaire_reducer';
import response from './response_reducer';
import page from './page_reducer';
import { reducer as formReducer } from 'redux-form'


export default combineReducers({
    questionnaire,
    response,
    page,
    form: formReducer
//    Add new reducers here
});
