import * as _ from 'lodash';
import { UPDATE_FILE } from '../constants/ActionTypes';

const initialState = {
    schema: {
        file: {
            patient: {
                firstName: {
                    dataType: 'text'
                },
                lastName: {
                    dataType: 'text'
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
            firstName: "Jian1",
            lastName: "Zhou"
        },
        equipments: [{
            id: 1,
            type: "x-ray",
            brand: "hp",
            serialNo: "12345"
        }, {
            id: 2,
            type: "iv",
            brand: "ibm",
            serialNo: "98765"
        }, {
            id: 3,
            type: "needle",
            brand: "intel",
            serialNo: "aabbcc"
        }]
    }
};

const file = (state = initialState, action: any) => {
    if (action.type === UPDATE_FILE) {
        _.set(state.file, action.path, action.value);
        return Object.assign({}, state);
    }
    return state;
};

export default file;