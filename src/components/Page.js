import React, { Component } from 'react';
import { getChildren } from "./_helper";
import {connect} from "react-redux";


class Page extends Component{

    componentDidMount(){
        let {children, skipped} = this.props;
        let allChildrenHidden = children.every(child=>{
            let {type, code} = child;
            return skipped[type] ? skipped[type].includes(code): false;

        });
        if (allChildrenHidden){
            console.log("HIIIIWDHWIHDIWNIDNWIDNW");
        }
    }

    render(){
        let {children, code, isVisible, skipped} = this.props;

        let allChildrenHidden = children.every(child=>{
           let {type, code} = child;
           return skipped[type] ? skipped[type].includes(code): false;

        });
        if(isVisible && !allChildrenHidden){
            return (
                <div className="page-container">
                    <div className="page-header">
                        {code}
                    </div>
                    <div className="page-body">
                        { getChildren(children) }
                    </div>
                    <div className="page-footer"></div>
                </div>
            )
        } else {
            return false
        }

    }
}


const mapStateToProps = (state, ownProps) => {
    const allProps = state.questionnaire.page[ownProps.code];
    return {
        ...allProps,
        skipped: state.questionnaire.skipped,
        page: state.page
    }
};

export default connect(mapStateToProps, {})(Page);
