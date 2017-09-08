import React, {Component} from 'react';
import {file/*, form, schema*/} from '../stores';
import MetaForm from '../components/controls/MetaForm';
import MetaSection from '../components/controls/MetaSection';
import MetaField from '../components/controls/MetaField';
import MetaList from '../components/controls/MetaList';

class StaticPage extends Component {
    render() {
        return (
            <MetaForm caption="My Static Form" data={file.currentFile}>
                <MetaSection caption="p2">
                    <MetaField caption="First Name" valuePath="patient.firstName" />
                    <MetaField caption="First Name2" valuePath="patient.firstName" />
                    <MetaField caption="Last Name" valuePath="patient.lastName" visExpr="@.patient.firstName === 'Jian'" />
                </MetaSection>
                <MetaSection caption="p3">
                    <MetaList valuePath="equipments">
                        <MetaSection>
                            <MetaField caption="Type" valuePath="equipments.type" />
                            <MetaField caption="Brand" valuePath="equipments.brand" />
                            <MetaField caption="Serial No." valuePath="equipments.serialNo" />
                        </MetaSection>
                    </MetaList>
                </MetaSection>
            </MetaForm>
        ); 
    }
}

export default StaticPage;
