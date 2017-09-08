import { observable } from 'mobx';

const defaultForm = {
    elmType: 'MetaForm',
    props: {
        caption: 'My 3rd form' //data, schema, actions
    },
    exprs: [{
        id: "expr1",
        deps: "patient.firstName",
        stmt: "p0 == 'Jian'"
    }, {
        id: "expr2",
        deps: "equipments.type",
        stmt: "p0 != 'iv1'"
    }, {
        id: "expr3",
        deps: "patient.firstName,equipments.type",
        stmt: "(p0 == 'Jian1') && (p1 != 'iv2')"
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
        }, {
            elmType: 'MetaField',
            props: {
                caption: "First Name",
                valuePath: "patient.firstName"
            }
        }, {
            elmType: 'MetaField',
            props: {
                caption: 'Last Name',
                valuePath: 'patient.lastName',
                visExpr: 'expr1'
            }
        }]
    }, {
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
                }, {
                    elmType: 'MetaField',
                    props: {
                        caption: 'Brand',
                        valuePath: 'equipments.brand',
                        visExpr: 'expr2'
                    }
                }, {
                    elmType: 'MetaField',
                    props: {
                        caption: "Serial No.",
                        valuePath: "equipments.serialNo",
                        visExpr: 'expr3'
                    }
                }]
            }]
        }]
    }]
};

class FormStore {
    constructor() {
        this.formVersion = 0;
        this.currElement = null;
        this.currentForm = observable(defaultForm);
    }
}

const formStore = new FormStore();

export default formStore;
export { FormStore };