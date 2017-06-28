import * as React from 'react';
import AbstractEditor, {EditorProps} from './AbstractEditor';


class MetaLabel extends AbstractEditor<EditorProps> {
  render() {
    return (
      <label>{this.props.value}</label>
    );
  }
}

export default MetaLabel;
