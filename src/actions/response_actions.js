import {
    RESPONSE_CHOICE_ADD,
    RESPONSE_CHOICE_REMOVE,
    RESPONSE_CHOICE_SET,
    RESPONSE_INPUT_SET

} from '../_constants/actionTypes.js';


export const setResponse_choice = (questionCode, target) => {
    let choiceCode = target.value;
    let isSelected = target.checked;
    let type = target.type;
    let actionType;

    if (type === 'radio' ){
        actionType = RESPONSE_CHOICE_SET
    } else if (isSelected){
        actionType = RESPONSE_CHOICE_ADD;
    } else {
        actionType = RESPONSE_CHOICE_REMOVE;
    }
    return {
        type: actionType,
        payload: {
            questionCode,
            choiceCode
        }
    }
};

export const setResponse_input =  ( questionCode, value ) => {
    return {
        type: RESPONSE_INPUT_SET,
        payload: {
            questionCode,
            comment: value
        }
    }
};
