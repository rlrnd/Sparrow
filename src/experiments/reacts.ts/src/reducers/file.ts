import * as _ from 'lodash';
import { Action } from 'redux';
import { ActionUpdateFile } from '../actions';
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
                    dataType: 'text'
                },
                brand: {
                    dataType: 'text'
                }
            }
        }
    },
    file: {
        patient: {
            firstName: 'Jian1',
            lastName: 'Zhou'
        },
        equipments: [{
            id: 1,
            type: 'x-ray',
            brand: 'hp',
            serialNo: '12345'
        }, {
            id: 2,
            type: 'iv',
            brand: 'ibm',
            serialNo: '98765'
        }, {
            id: 3,
            type: 'needle',
            brand: 'intel',
            serialNo: 'aabbcc'
        }]
    }
};

const file = (state = initialState, action: Action) => {
    if (action.type === UPDATE_FILE) {
        const act: ActionUpdateFile = action as ActionUpdateFile;
        _.set(state.file, act.path, act.value);
        return Object.assign({}, state);
    }
    return state;
};

export default file;