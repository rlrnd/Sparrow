import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fileActions from '../actions';

interface Props {
    element?: any;
}

interface State {
    caption?: string;
} 

class ElementObserver extends React.Component<Props, State> {    

  static contextTypes = {
    actions: PropTypes.any
  };

  constructor(props: Props) {
      super(props);
      this.state = {
        caption: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSave = this.handleSave.bind(this);
  }

  handleChange(event: any) {
    this.setState({ caption: event.target.value });
  }

  handleSave(event: any) {
    let elm = this.props.element;
    if (elm) {
      elm.props.caption = this.state.caption;
    }
    this.context.actions.updateForm();
  }

  componentWillUpdate(nextProps: Props, nextState: State) {
    if (this.props.element !== nextProps.element) {
      const elm = nextProps.element;
      if (elm) {
        this.setState({caption: elm.props.caption});
      } else {
        this.setState({caption: ''});
      }
    }
  }

  render() {
    const elm = this.props.element;
    if (elm) {
      return ( 
        <dl>
          <dt>type</dt>
          <dd>{elm.elmType}</dd>
          <dt>caption</dt>
          <dd><input type="text" value={this.state.caption} onChange={this.handleChange} /></dd>
          <dt>&nbsp;</dt>
          <dd><button type="button" onClick={this.handleSave}>Set</button></dd>
        </dl>
      );
    } else {
      return (<div>nothing</div>);
    }
  }
}

const mapStateToProps = (state: any) => ({
  element: state.form.currElement
});

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(fileActions, dispatch)
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(ElementObserver as any);