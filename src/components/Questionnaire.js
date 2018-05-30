import React, { Component } from 'react';
import {connect} from 'react-redux';

import '../App.css';
import {questionnaire} from "../_json_"; // request this
import {evaluateRule, setupQuestionnaire} from '../actions/questionnaire_actions'
import Page from "./Page";
import Navigation from './Navigation';
import {navigateToPage} from "../actions/page_action";
import { Field, reduxForm } from 'redux-form'


class Questionnaire extends Component {

    componentDidMount(){
        this.props.getQuestionnaireJson(this.props.response);
    }

    componentDidUpdate(prevProps, prevState) {
        // only update if the data has changed
        if (prevProps.response !== this.props.response) {
            this.props.evaluteRules(this.props.response);
        }
    }

    render() {
        const {currentPage, questionnaire, navigate, skipped, handleSubmit} = this.props;

        if (currentPage){
            return (
                <div className="questionnaire-container">
                    <div className="questionnaire-header"></div>
                    <div className="questionnaire-body">
                        <form onSubmit={handleSubmit}>
                            <Page code={currentPage} />
                        </form>
                        <Navigation
                            currentPage={currentPage}
                            pages={questionnaire.visiblePages}
                            navigate={navigate}
                            skipped={skipped}
                        />
                    </div>
                    <div className="questionnaire-footer"></div>
                </div>
            );
        } else {
            return false;
        }

    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        response: state.response,
        questionnaire: state.questionnaire,
        currentPage: state.page.current || state.questionnaire.pages[0],
        skipped: state.questionnaire.skipped
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getQuestionnaireJson: function (response) {
            dispatch( setupQuestionnaire(questionnaire) );
            dispatch( evaluateRule(response) );
        },
        evaluteRules: function (response) {
            dispatch( evaluateRule(response) )
        },
        navigate: (newPage, direction) => function () {
            dispatch( navigateToPage(newPage, direction) )
        }
    }
};

const Questionnaire_ = connect(mapStateToProps, mapDispatchToProps)(Questionnaire);


export default reduxForm({
    // a unique name for the form
    form: 'questions'
})(Questionnaire_)
