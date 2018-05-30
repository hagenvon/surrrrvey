import React, { Component } from 'react';
import Choice from './Choice';
import {connect} from 'react-redux';



class Question extends Component{
    render(){
        let {text, isVisible} = this.props;

        if(isVisible){
            return (
                <div className="question-container">
                    <div className="question-header">
                        {text}
                    </div>
                    <div className="question-body">
                        <Choice {...this.props}/>
                    </div>
                    <div className="question-footer"></div>
                </div>
            )
        } else {
            return <span></span>
        }


    }
}

const mapStateToProps = (state, ownProps) => {
    const allProps = state.questionnaire.question[ownProps.code];
    return {
        ...allProps
    }
};

export default connect(mapStateToProps, {})(Question);
