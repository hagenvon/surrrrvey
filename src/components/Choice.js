import React from 'react';
import {Blank} from "./_helper";
// import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Field} from 'redux-form';
import {setResponse_choice, setResponse_input} from '../actions/response_actions';

import * as input from './question_types/input/_index';
import * as singleChoice from './question_types/singleChoice/_index';
import * as multipleChoice from './question_types/multipleChoice/_index';
import * as container from './question_types/containerQuestion/_index';

const components = {
    input,
    singleChoice,
    multipleChoice,
    container
};

function getChoices(props){
    const {code, type, renderType = 'default'} = props;
    let Component = Blank;

    if (components[type]) {
        Component = getComponent(type, renderType);
    } else {
        console.log("unknown question type: " + type);
    }

    //return <Component {...props} />;
    return <Field component={Component} name={code} {...props} />
}


function getComponent(type, renderType) {
    const RenderType = capitalizeFirstLetter(renderType);
    const questionType = components[type];
    let Component = Blank;

    if(questionType[RenderType]){
        Component = questionType[RenderType];
    } else {
        console.log(`unknown render type "${renderType}" for question type "${type}"`);
    }
    return Component;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



function ChoiceComnponent(props){
    return  getChoices(props)
}

const mapStateToProps = (state, ownProps) => {
    return {
        // choices: state.questionnaire[ownProps.id].choices,
        // questionText: state.questionnaire[ownProps.id].questionText,
        // type: state.questionnaire[ownProps.id].type,
        response: state.response[ownProps.code]
        // questionFooter: state.questionnaire[ownProps.id].questionFooter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleChange: function(event){
            dispatch(setResponse_choice(ownProps.code, event.target) );
        },
        handleInput: function(event) {
            dispatch(setResponse_input(ownProps.code, event.target.value) )
        }
    }
};


const Choice = connect(mapStateToProps, mapDispatchToProps)(ChoiceComnponent);

export default Choice;
