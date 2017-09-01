import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ElementDesigner from './ElementDesigner';

class FormDesigner extends Component {    

    static propTypes = {
        formDef: PropTypes.object,
        formVersion: PropTypes.number,
        data: PropTypes.object,
        schema: PropTypes.object
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.formVersion !== this.props.formVersion);
    }

    render() {
        return (
            <div>{this.props.formVersion}
            <ElementDesigner elemDef={this.props.formDef} key={1}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  formDef: state.form.form,
  formVersion: state.form.formVersion,
  schema: state.file.schema.file
});

export default connect(
  mapStateToProps
)(FormDesigner);

