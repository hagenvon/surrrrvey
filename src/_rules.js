import cloneDeep from 'lodash/cloneDeep';


export const operators = {
    valueEquals(operands, responseState){},
    isAnySelected(operands, responseState){},
    isSelected(operands, responseState){
        if(!(operands instanceof Array)) return false;
        if(!responseState) return false;

        const target = operands[0];
        const question = responseState[target.question];
        let selected = false;
        if(question) {
            selected = question.choices.some(choice => choice.code === target.choice);
        }
        return selected;
    },
    isNotSelected(operands, responseState){},
    isNothingSelected(operands, responseState){},
    or(operands, responseState){},
    and(operands, responseState){},
    not(operands, responseState){},

};

export function ruleController(questionnaire, response){
    return iterateRules(questionnaire, response);
}

function iterateRules(json, response){
    let skipped = {
        page: [],
        section: [],
        question: [],
        choice : []
    };
    let isVisible;
    let newJson = cloneDeep(json);
    Object.keys(newJson.question).forEach(code => {
        newJson.question[code].choices.forEach(choice => {
            isVisible = evaluateRule(choice.condition, json, response);
            if (isVisible) {
                choice.isVisible = true;
                choice.isVisible = false;
            } else {
                skipped.choice.push(choice.code);
            }
        });
        isVisible = evaluateRule(newJson.question[code].condition, json, response);
        if(isVisible){
            newJson.question[code].isVisible = true;
        } else {
            newJson.question[code].isVisible = false;
            skipped.question.push(code);
        }
    });
    Object.keys(newJson.section).forEach(code => {
        isVisible = evaluateRule(newJson.section[code].condition, json, response);
        if (isVisible){
            newJson.section[code].isVisible = true;
        } else {
            newJson.section[code].isVisible = false;
            skipped.section.push(code)
        }
    });
    Object.keys(newJson.page).forEach(code => {
        isVisible = evaluateRule(newJson.page[code].condition, json, response);
        if(isVisible){
            newJson.page[code].isVisible = true;
        } else {
            newJson.page[code].isVisible = false;
            skipped.page.push(code);
        }
    });

    //-----------------------------------
    //
    let allChildrenHidden;
    let allChoicesHidden;

    Object.keys(newJson.question).forEach(code => {
        allChoicesHidden = newJson.question[code].choices.length && newJson.question[code].choices.every(choice=>{
            let {code} = choice;
            return skipped.choice ? skipped.choice.includes(code): false;
        });
        if(allChoicesHidden){
            skipped.question.push(code);
        };
        allChildrenHidden = newJson.question[code].children.length && newJson.question[code].children.every(child=>{
            let {type, code} = child;
            return skipped[type] ? skipped[type].includes(code): false;
        });
        if(allChildrenHidden){
            skipped.question.push(code);
        };
    });
    Object.keys(newJson.section).forEach(code => {
        allChildrenHidden = newJson.section[code].children.length && newJson.section[code].children.every(child=>{
            let {type, code} = child;
            return skipped[type] ? skipped[type].includes(code): false;
        });
        if(allChildrenHidden){
            skipped.section.push(code);
        }
    });
    Object.keys(newJson.page).forEach(code => {
        allChildrenHidden = newJson.page[code].children.length && newJson.page[code].children.every(child=>{
            let {type, code} = child;
            return skipped[type] ? skipped[type].includes(code): false;
        });
        if(allChildrenHidden){
            skipped.page.push(code);
        }
    });

    newJson.visiblePages = Object.keys(newJson.page).filter(code=>!skipped.page.includes(code) );
    // newJson.sections = Object.keys(newJson.section).filter(code=>!skipped.section.includes(code) );
    // newJson.questions = Object.keys(newJson.question).filter(code=>!skipped.question.includes(code) );

    //----------------------------------
    newJson.skipped = skipped;

    return newJson
}

function evaluateRule(condition, questionnaire, response){
    let result = true;
    if (questionnaire.rule[condition]){
        let rule = questionnaire.rule[condition];
        result = operators[rule.operator](questionnaire.rule[condition].operands, response );
    }
    return result
}


//
// valueEquals: function(operands, osFormsState) {
//
//     var targetOperands = operands.filter(function(operand) {return operand.type == 'target'});
//     var valueOperands = operands.filter(function(operand) {return operand.type == 'value'});
//
//     if(targetOperands.length == 2) {
//         // compare two question values
//         var question1 = findQuestionObjectByCode(targetOperands[0].question);
//         var question2 = findQuestionObjectByCode(targetOperands[1].question);
//         if(question1.type == 'inputDefault' && question2.type == 'inputDefault') {
//             return osFormsState.questions[question1.code].choices[0].value == osFormsState.questions[question2.code].choices[0].value;
//         }
//     } else if(targetOperands.length == 1 && valueOperands.length == 1) {
//         // compare target with value
//         var question = findQuestionObjectByCode(targetOperands[0].question);
//         var value = valueOperands[0].value;
//         if(question.type == 'inputDefault') {
//             return osFormsState.questions[question.code].choices[0].value == value;
//         }
//     }
//
//     throw 'valueEquals operator not defined for given operands'
// },
//
//
// // selection operators
// isAnySelected: function(operands, osFormsState) {
//     var isAnySelected = false
//     $.each(operands, function(index, operand) {
//         if(skipRules.operators.isSelected([operand], osFormsState)) {
//             isAnySelected = true;
//         }
//     });
//     return isAnySelected;
// },
//
// isSelected: function(operands, osFormsState) {
//     if(!(operands instanceof Array)) return false;
//     var target = operands[0];
//
//     var question = osFormsState.questions[target.question];
//     var selected = false;
//     if(question) {
//         $.each(question.choices, function(index, choice) {
//             if(choice.code == target.choice) {
//                 selected = true;
//                 return false;
//             }
//         });
//     }
//     return selected;
// },
//
// isNotSelected: function(operands, osFormsState) {
//     return !skipRules.operators.isSelected(operands, osFormsState);
// },
//
// nothingSelected: function(operands, osFormsState) {
//     if(!(operands instanceof Array)) return false;
//     var target = operands[0];
//
//     var question = osFormsState.questions[target.question];
//     return question.choices.length === 0 || (question.choices.length === 1 && question.choices[0].code === '');
// },
//
//
// // boolean operators
// or: function(operands, osFormsState) {
//     var res = null;
//
//     $.each(operands, function(index, operand) {
//         if(operand.type === 'operator') {
//             if(res == null) {
//                 res = skipRules.operators[operand.operator](operand.operands, osFormsState);
//             } else {
//                 res = res || skipRules.operators[operand.operator](operand.operands, osFormsState);
//             }
//         }
//     });
//
//     return res;
// },
//
// and: function(operands, osFormsState) {
//     var res = null;
//
//     $.each(operands, function(index, operand) {
//         if(operand.type === 'operator') {
//             if(res == null) {
//                 res = skipRules.operators[operand.operator](operand.operands, osFormsState);
//             } else {
//                 res = res && skipRules.operators[operand.operator](operand.operands, osFormsState);
//             }
//         }
//     });
//
//     return res;
// },
//
// not: function(operands, osFormsState) {
//     return !skipRules.operators[operands[0].operator](operands[0].operands, osFormsState);
// },
