import React from 'react';

export default function Input(props){
    const response = props.response ? props.response.choices[0].comment : '';

    return (<input type="text" onChange={props.handleInput} value={response} />);
};
