import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormDesigner from '../components/FormDesigner';
import ElementObserver from '../components/ElementObserver';

class DesignerPage extends Component {

     static propTypes = {
        designer: PropTypes.object
    };
    
    constructor(props) {
        super(props);
        this.updateForm = this.updateForm.bind(this);
    }

    updateForm() {
        if(this.designer) {
            this.designer.forceUpdate();
        }
    }

    render() {
        return (
            <div>
                <div className="Form-designer">
                    <FormDesigner ref={(designer)=> { this.designer = designer;}} />
                </div>
                <div className="Form-observer">
                    <ElementObserver/>
                    <hr/>
                    <button type="button" onClick={this.updateForm}>Update</button>
                </div>
            </div>
        );
    }
}

export default DesignerPage;
