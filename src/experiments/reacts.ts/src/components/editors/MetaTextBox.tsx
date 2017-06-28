import * as React from 'react';
import AbstractEditor, {EditorProps} from './AbstractEditor';

class MetaTextBox extends AbstractEditor<EditorProps> {
  constructor(props: any) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: any) {
     if(this.props.onChange) {
       this.props.onChange(event);
     }
  }

  render() {
    return (
      <input type="text" value={this.props.value} onChange={this.handleChange} />
    );
  }
}

export default MetaTextBox;
