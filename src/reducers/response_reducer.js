import {
    RESPONSE_CHOICE_ADD,
    RESPONSE_CHOICE_REMOVE,
    RESPONSE_CHOICE_SET,
    RESPONSE_CHOICE_CLEAR,
    RESPONSE_INPUT_SET
} from '../_constants/actionTypes.js';



const response = (state = {}, action) => {

    let choices;
    let questionCode, choiceCode;

    if (action.payload) {
        questionCode = action.payload.questionCode;
        choiceCode = action.payload.choiceCode;
        choices = state[questionCode] ? state[questionCode].choices.slice() : [];
    }

    switch (action.type) {
        case RESPONSE_CHOICE_ADD:
            return {
                ...state,
                [questionCode]: {
                    choices: [...choices, {
                        value: "",
                        code: choiceCode,
                        comment: ""
                    }]
                }
            };
        case RESPONSE_CHOICE_REMOVE:
            return {
                ...state,
                [questionCode]: {
                    choices: choices.filter(choice => choice.code !== choiceCode)
                }
            };
        case RESPONSE_CHOICE_SET:
            return {
                ...state,
                [questionCode]: {
                    choices: [{
                        value: "",
                        code: choiceCode,
                        comment: ""
                    }]
                }
            };
        case RESPONSE_CHOICE_CLEAR:
            return {
                ...state,
                [questionCode]: {
                    choices: []
                }
            };
        case RESPONSE_INPUT_SET:
            return {
                ...state,
                [questionCode]: {
                    choices: [{
                        value: "",
                        code: "",
                        comment: action.payload.comment
                    }]
                }
            };
        default:
            return state
    }
};

export default response;

