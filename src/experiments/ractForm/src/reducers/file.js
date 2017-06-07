import _ from 'lodash';
import { UPDATE_FILE } from '../constants/ActionTypes';

const initialState = {
    schema: {
        file: {
            patient: {
                firstName: {
                    dataType: "text"
                },
                lastName: {
                    dataType: "text"
                }
            },
            equipments: {
                type: {
                    dataType: "text"
                },
                brand: {
                    dataType: "text"
                }
            }
        }
    },
    file: {
        patient: {
            firstName: "Jian",
            lastName: "Zhou"
        },
        equipments: [{
            id: 1,
            type: 'x-ray',
            brand: 'hp'
        }, {
            id: 2,
            type: 'iv',
            brand: 'ibm'
        }, {
            id: 3,
            type: 'needle',
            brand: 'intel'
        }]
    },
    form: {
        elmType: 'MetaForm',
        props: {
            caption: 'My 3rd form' //data, schema, actions
        },
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
                    caption: 'Last Name',
                    valuePath: 'patient.lastName'
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
                            valuePath: 'equipments.brand'
                        }
                    }]
                }]
            }]
        }]
    }
};

const file = (state = initialState, action) => {
    if (action.type === UPDATE_FILE) {
        _.set(action.data, action.path, action.value);
        return Object.assign({}, state);
    }
    return state;
};

export default file;