import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getChildren } from "./_helper";

class Section extends Component{
    render(){
        let {children, code, isVisible} = this.props;
        if(isVisible){
            return (
                <div className="section-container">
                    <div className="section-header">
                        {code}
                    </div>
                    <div className="section-body">
                        { getChildren(children) }
                    </div>
                    <div className="section-footer"></div>
                </div>
            )
        } else {
            return (<span></span>)
        }

    }
}

const mapStateToProps = (state, ownProps) => {
    const allProps = state.questionnaire.section[ownProps.code];
    return {
        ...allProps
    }
};

export default connect(mapStateToProps, {})(Section);
