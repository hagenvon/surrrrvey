import React from 'react';

import Section from "./Section";
import Question from "./Question";


// --------------------------------------------
// Children

export function getChild(child){
    let {type, code} = child;
    let Component = Blank;

    switch(type){
        case 'section':
            Component = <Section code={code} key={code} />;
            break;
        case 'question':
            Component = <Question code={code} key={code} />;
            break;
        default:
            console.log("unknown or invalid child type: " + type);
            break;
    }
    return Component;
}

export function getChildren(children = []){
    return children.map(child => getChild(child));
}


export function Blank(){
    return (<div></div>)
}

