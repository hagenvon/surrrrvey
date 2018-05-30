import cloneDeep from 'lodash/cloneDeep';

const sourceJson = {
    config: {
        template: "css-template",
        localizations: ["deDE", "enEN"],
        defaultLanguage: "deDE",
        progressBar: false,

    },
    pages: ["page_00", "page_01", "page_02"],
    page: {
        "page_00": {
            code: "page_00",
            type: "default",
            infoText: "",
            condition: true,
            shuffleChildren: true,
            children: [
                {
                    type: "question",
                    code: "question_00"
                }
            ]
        },
        "page_01": {
            code: "page_01",
            type: "default",
            infoText: "",
            condition: true,
            shuffleChildren: true,
            children: [
                {
                    type: "section",
                    code: "section_01"
                },
                {
                    type: "section",
                    code: "section_02"
                }
            ]
        },
        "page_02": {
            code: "page_02",
            type: "default",
            infoText: "",
            condition: true,
            children: [
                {
                    type: "question",
                    code: "question_01"
                },
                {
                    type: "question",
                    code: "question_05"
                }
            ]
        }
    },
    questions: ["question_00",  "question_01", "question_02", "question_03", "question_04", "question_05", "question_M_01", "question_M_02", "question_M_03"],
    question: {
        "question_00": {
            code: "question_00",
            type: "input",
            renderType: "textarea",
            text: "question_00.questionText.long",
            mandatory: true,
            condition: true,
            scale: false,
            children: [],
            choices: []
        },
        "question_01": {
            code: "question_01",
            type: "singleChoice",
            renderType: "bar",
            text: "question_01.questionText.long",
            mandatory: true,
            condition: true,
            children: [],
            scale: {
                from: "question_01.scale.from",
                to: "question_01.scale.to",
            },
            choices: [
                {
                    "code": "CH01",
                    "text": "question_01.choice.01"
                },
                {
                    "code": "CH02",
                    "text": "question_01.choice.02"
                },
                {
                    "code": "CH03",
                    "text": "question_01.choice.03"
                },
                {
                    "code": "CH04",
                    "text": "question_01.choice.04"
                }
            ]

        },
        "question_02": {
            code: "question_02",
            type: "multipleChoice",
            renderType: "stack",
            text: "question_02.questionText.long",
            mandatory: true,
            condition: true,
            scale: false,
            shuffleChoices: true,
            children: [],
            choices: [
                {
                    "code": "CH01",
                    "text": "question_02.choice.01"
                },
                {
                    "code": "CH02",
                    "text": "question_02.choice.02"
                },
                {
                    "code": "CH03",
                    "text": "question_02.choice.03",
                    "children": [{
                        type: "question",
                        code: "question_03"
                    }]
                },
                {
                    "code": "CH04",
                    "text": "question_02.choice.04"
                },
                {
                    "code": "CH05_OTHER",
                    "text": "question_02.choice.04"
                }
            ]

        },
        "question_03": {
            code: "question_03",
            type: "input",
            renderType: "input",
            text: "question_03.questionText.long",
            mandatory: true,
            condition: "show_question_03",
            scale: false,
            children: [],
            choices: []
        },
        "question_04": {
            code: "question_04",
            type: "input",
            renderType: "textarea",
            text: "question_04.questionText.long",
            mandatory: true,
            condition: true,
            scale: false,
            children: [],
            choices: []
        },
        "question_05": {
            code: "question_05",
            type: "container",
            renderType: "matrix",
            text: "question_05.questionText.long",
            mandatory: true,
            condition: true,
            scale: false,
            choices: [
                {
                    "code": "CH01",
                    "text": "question_05.choice.01"
                },
                {
                    "code": "CH02",
                    "text": "question_05.choice.02"
                },
                {
                    "code": "CH03",
                    "text": "question_05.choice.03"
                },
                {
                    "code": "CH04",
                    "text": "question_05.choice.04"
                }
            ],
            children: [{
                type: "section",
                code: "section_2"
            },{
                type: "question",
                code: "question_M_02"
            },{
                type: "question",
                code: "question_M_03"
            }]
        },
        "question_M_01": {
            code: "question_M_01",
            type: "singleChoice",
            renderType: "bar",
            text: "question_M_01.questionText.long",
            mandatory: true,
            condition: true,
            scale: false,
            children: [],
            choices: [
                {
                    "code": "CH01",
                    "text": "question_M_01.choice.01"
                },
                {
                    "code": "CH02",
                    "text": "question_M_01.choice.02"
                },
                {
                    "code": "CH03",
                    "text": "question_M_01.choice.03"
                },
                {
                    "code": "CH04",
                    "text": "question_M_01.choice.04"
                }
            ]
        },
        "question_M_02": {
            code: "question_M_02",
            type: "singleChoice",
            renderType: "bar",
            text: "question_M_02.questionText.long",
            mandatory: true,
            condition: true,
            scale: false,
            children: [],
            choices: [
                {
                    "code": "CH01",
                    "text": "question_M_02.choice.01"
                },
                {
                    "code": "CH02",
                    "text": "question_M_02.choice.02"
                },
                {
                    "code": "CH03",
                    "text": "question_M_02.choice.03"
                },
                {
                    "code": "CH04",
                    "text": "question_M_02.choice.04"
                }
            ]
        },
        "question_M_03": {
            code: "question_M_03",
            type: "singleChoice",
            renderType: "bar",
            text: "question_M_03.questionText.long",
            mandatory: true,
            condition: true,
            scale: false,
            children: [],
            choices: [
                {
                    "code": "CH01",
                    "text": "question_M_03.choice.01"
                },
                {
                    "code": "CH02",
                    "text": "question_M_03.choice.02"
                },
                {
                    "code": "CH03",
                    "text": "question_M_03.choice.03"
                },
                {
                    "code": "CH04",
                    "text": "question_M_03.choice.04"
                }
            ]
        }
    },
    sections: ["section_01", "section_02"],
    section: {
        "section_01": {
            code: "section_01",
            type: "default",
            infoText: "",
            condition: "show_section_01",
            children: [
                {
                    type: "question",
                    code: "question_02"
                }
            ]
        },
        "section_02": {
            code: "section_02",
            type: "default",
            infoText: "",
            condition: "show_section_02",
            children: [
                {
                    type: "question",
                    code: "question_04"
                }
            ]
        }
    },
    rule: {
        "show_question_03": {
            "type": "operator",
            "operator": "isSelected",
            "operands": [
                {
                    "type": "target",
                    "question": "question_02",
                    "choice": "CH03"
                }
            ]
        },
        "show_section_02": {
            "type": "operator",
            "operator": "isSelected",
            "operands": [
                {
                    "type": "target",
                    "question": "question_01",
                    "choice": "CH01"
                }
            ]
        },
        "show_section_01": {
            "type": "operator",
            "operator": "isSelected",
            "operands": [
                {
                    "type": "target",
                    "question": "question_01",
                    "choice": "CH01"
                }
            ]
        }
    }

};


export function shuffle(arr) {
    let a = arr.slice();
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export function shuffleChoices(arr, config){
    const otherChoice = arr.find(choice => choice.code.endsWith('_OTHER') );
    const rest = arr.filter(choice => !choice.code.endsWith('_OTHER') );

    let shuffledRest = shuffle(rest);
    return [...shuffledRest, otherChoice]
}


function applyShuffles(json){
    let newJson = cloneDeep(json);
    Object.keys(newJson.page).forEach(code => {
        let p = newJson.page[code];
        if (p.shuffleChildren) {
            p.children = shuffle(p.children);
        }
    });
    Object.keys(newJson.section).forEach(code => {
        let p = newJson.section[code];
        if (p.shuffleChildren) {
            p.children = shuffle(p.children);
        }
    });
    Object.keys(newJson.question).forEach(code => {
        let p = newJson.question[code];
        if (p.shuffleChildren) {
            p.children = shuffle(p.children);
        }
        if (p.shuffleChoices){
            p.choices = shuffleChoices(p.choices);
        }
    });
    return newJson;
}





export const questionnaire = applyShuffles(sourceJson);


// condition = null/undefined -> always show
// how to handle S_FRAGEN ?
// matrix  --- solved
// subsections  --- solved
// text variables
// shuffles --- solved
// thank you pages
// start pages
// response_JSON ...
//
//     "caseId": "",
//     "orgUnitId": "",
//     "brandId": "",
//     "businessTypeId": "",
//     "clientId": "",
//     "questionnaireId":


