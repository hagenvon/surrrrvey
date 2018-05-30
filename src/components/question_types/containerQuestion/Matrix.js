import React, {Component} from 'react';

import {connect} from "react-redux";
import {setResponse_choice, setResponse_input} from "../../../actions/response_actions";


function SubQuestion_(props){
    let {text, code, choices = [], type, handleChange} = props;

    const selected = props.response ? props.response.choices : [];


    let inputType;
    if (type === 'singleChoice'){
        inputType = 'radio'
    } else if(type === 'multipleChoice') {
        inputType = 'checkbox'
    }
    return (
        <tr>
            <td>{text}</td>
            {choices.map(choice=>{
                let isChecked = selected.some( respChoice => respChoice.code === choice.code );
                return (<td key={choice.code}><input type={inputType} value={choice.code} name={code} onChange={handleChange} checked={isChecked} ></input></td>)
            })}
        </tr>
    )
}

const mapStateToProps = (state, ownProps) => {
    const allProps = state.questionnaire.question[ownProps.code];
    return {
        response: state.response[ownProps.code],
        ...allProps
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


const SubQuestion = connect(mapStateToProps, mapDispatchToProps)(SubQuestion_);


export default class Matrix extends Component {
    render(){
        const choices = this.props.choices;
        const children = this.props.children || [];

        let subQuestions = children.map(child => (child));

        let header = (
            <thead>
            <tr>
                <th></th>
                {choices.map(choice=><th key={choice.code}>{choice.text}</th>)}
            </tr>
            </thead>
        );

        let body = (
            <tbody>
            {subQuestions.map( (question)=>{
                return <SubQuestion code={question.code} key={question.code} />
            })}
            </tbody>
        );

        return (
            <table>
                {header}
                {body}
            </table>
        )
    }
}
