import React from 'react';

export default function Textarea(props){
    const { input: { value, onChange } } = props;
    const response = props.response ? props.response.choices[0].comment : '';
    return (<textarea rows="4" {...props.input}></textarea>);
}
