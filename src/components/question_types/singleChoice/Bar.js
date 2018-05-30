import React, {Component} from 'react';
import {getChildren} from "../../_helper";

export default class Bar extends Component {

    render(){
        const choices = this.props.choices;
        const renderType = this.props.renderType;
        const code = this.props.code;
        const handleChange = this.props.handleChange;
        const inputType = this.props.inputType || 'radio';
        const selected = this.props.response ? this.props.response.choices : [];

        const result = choices.map(choice => {
            let children = '';
            let isChecked = selected.some( respChoice => respChoice.code === choice.code );

            if (choice.children){
                children = getChildren(choice.children);
            }
            return (
                <span key={choice.code}>
                    <input type={inputType} value={choice.code} name={code} onChange={handleChange} checked={isChecked} />
                    {children}
                </span>
            )
        });

        return (
            <div>
                <span>{renderType}</span>
                <div>{result}</div>
            </div>
        )
    }
}
