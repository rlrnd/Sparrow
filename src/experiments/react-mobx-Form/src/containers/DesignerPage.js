import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
                
                </div>
                <div className="Form-observer">
                
                    <hr/>
                    <button type="button" onClick={this.updateForm}>Update</button>
                </div>
            </div>
        );
    }
}

export default DesignerPage;
