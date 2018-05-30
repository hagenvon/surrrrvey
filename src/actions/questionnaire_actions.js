import {
    QUESTIONNAIRE_SETUP,
    QUESTIONNAIRE_CLEAR,
    RULE_EVALUATION
} from '../_constants/actionTypes.js';

export const setupQuestionnaire = value => {
    return {
        type: QUESTIONNAIRE_SETUP,
        value
    }
};

export const clearQuestionnaire = value => {
    return {
        type: QUESTIONNAIRE_CLEAR,
        value
    }
};

export const evaluateRule = (response) => {
    return {
        type: RULE_EVALUATION,
        response
    }
};