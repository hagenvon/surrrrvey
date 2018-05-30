import React, {Component} from 'react';
import { Field} from 'redux-form';
import {getChildren } from "../../_helper";

export default class Stack extends Component {

    render(){
        const choices = this.props.choices;
        const renderType = this.props.renderType;
        const code = this.props.code;
        const handleChange = this.props.handleChange;
        const inputType = this.props.inputType || 'radio';
        const selected = this.props.response ? this.props.response.choices : [];


        const result = choices.map((choice, index) => {
            let children = '';
            let isChecked = selected.some( respChoice => respChoice.code === choice.code );
            if (choice.children){
                children = getChildren(choice.children);
            }
            return (
                <div key={choice.code}>
                    <input name={`${this.props.name}.choices[${index}].${choice.code}`} type={inputType} {...this.props.input} component="input" /> {choice.code}
                    {children}
                </div>
            )
        });
        {/*<input type={inputType} value={choice.code} name={code} onChange={handleChange} checked={isChecked}/> {choice.code}*/}
        return (
            <div>
                <span>{renderType}</span>
                <div>{result}</div>
            </div>
        )
    }
}
