import React from 'react';
import SingleStack from '../singleChoice/Stack';
import SingleBar from '../singleChoice/Bar';


function Stack(props) {
    return <SingleStack inputType="checkbox" {...props} />
}

function Bar(props) {
    return <SingleBar inputType="checkbox" {...props} />
}

function Default(){
    return Stack;
}

export {
    Stack,
    Bar,
    Default
}