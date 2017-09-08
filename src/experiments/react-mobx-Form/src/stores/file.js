import { observable } from 'mobx';

const defaultFile = {
    patient: {
        firstName: "Jian1",
        lastName: "Zhou"
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
};

class FileStore {
    constructor() {
        this.currentFile = observable(defaultFile);
    }
}

const fileStore = new FileStore();

export default fileStore;
export {FileStore};