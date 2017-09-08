import { observable } from 'mobx';

const defaultSchema = {
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
};

class SchemaStore {
    constructor() {
        this.currentSchema = observable(defaultSchema);
    }
}

const schemaStore = new SchemaStore();

export default schemaStore;
export { SchemaStore };