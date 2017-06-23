import { UPDATE_FORM, ELM_SELECTED } from '../constants/ActionTypes';

const initialState = {
    form: {
        elmType: 'MetaForm',
        props: {
            caption: 'My 3rd form' //data, schema, actions
        },
        exprs: [{
            id: "expr1",
            deps: "patient.firstName",
            stmt: "p0 == 'Jian'"
        },{
            id: "expr2",
            deps: "equipments.type",
            stmt: "p0 != 'iv1'"
        }],
        children: [{
            elmType: 'MetaSection',
            props: {
                caption: "p2"
            },
            children: [{
                elmType: 'MetaField',
                props: {
                    caption: "First Name",
                    valuePath: "patient.firstName"
                }
            },{
                elmType: 'MetaField',
                props: {
                    caption: "First Name",
                    valuePath: "patient.firstName"
                }
            },{
                elmType: 'MetaField',
                props: {
                    caption: 'Last Name',
                    valuePath: 'patient.lastName',
                    visExpr: 'expr1'
                }
            }]
        },{
            elmType: 'MetaSection',
            props: {
                caption: "p3"
            },
            children: [{
                elmType: "MetaList",
                props: {
                    path: "equipments"
                },
                children: [{
                    elmType: "MetaSection",
                    props: {},
                    children: [{
                        elmType: 'MetaField',
                        props: {
                            caption: "Type",
                            valuePath: "equipments.type"
                        }
                    },{
                        elmType: 'MetaField',
                        props: {
                            caption: 'Brand',
                            valuePath: 'equipments.brand',
                            visExpr: 'expr2'
                        }
                    }]
                }]
            }]
        }]
    },
    formVersion: 0,
    currElement: null
};

const form = (state = initialState, action) => {

    switch(action.type) {
       case ELM_SELECTED: 
         state.currElement = action.elmDef;
         return Object.assign({},state);
       case UPDATE_FORM: 
         state.formVersion = state.formVersion +1;
         return Object.assign({},state);
       default: return state;
    }
};

export default form;