import {
    QUESTIONNAIRE_SETUP,
    QUESTIONNAIRE_CLEAR,
    RULE_EVALUATION
} from '../_constants/actionTypes.js';

import {ruleController} from "../_rules";


const questionnaire = (state = {pages:[]}, action) => {
    switch (action.type) {
        case QUESTIONNAIRE_SETUP:
            return Object.assign({}, state, action.value);
        case QUESTIONNAIRE_CLEAR:
            return Object.assign({}, state, {} );
        case RULE_EVALUATION:
            return ruleController(state, action.response);
        default:
            return state
    }
};




export default questionnaire;
