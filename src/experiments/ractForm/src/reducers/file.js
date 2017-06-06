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