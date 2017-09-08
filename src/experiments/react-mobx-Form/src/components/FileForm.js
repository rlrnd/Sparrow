import React from 'react';
import PropTypes from 'prop-types';

import MetaForm from './controls/MetaForm';
import MetaSection from './controls/MetaSection';
import MetaField from './controls/MetaField';
import MetaList from './controls/MetaList';

const FileForm = ({caption, data, schema, actions}) => (
        <MetaForm caption="My first form" data={data} schema={schema} actions={actions}>
          <MetaSection caption="Patient Demographic">
            <MetaField caption="First Name" valuePath="patient.firstName" />
            <MetaField caption="Last Name" valuePath="patient.lastName" />
          </MetaSection>
          <MetaSection caption="Equipments">
            <MetaList path="equipments">
              <MetaSection>
                <MetaField caption="Type" valuePath="equipments.type" />
                <MetaField caption="Brand" valuePath="equipments.brand" />
              </MetaSection>
            </MetaList>
          </MetaSection>
        </MetaForm>);

FileForm.propTypes = {
    caption: PropTypes.string,
    file: PropTypes.object,
    schema: PropTypes.object,
    actions: PropTypes.object.isRequired
};

export default FileForm;
