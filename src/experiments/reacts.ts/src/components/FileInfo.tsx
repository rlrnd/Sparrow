import * as React from 'react';
import { connect } from 'react-redux';

interface Props {
  lastName?: string;
  firstName?: string;
}

class FileInfo extends React.Component<Props, {}> {
    render() {
        return (
            <div>{this.props.lastName}, {this.props.firstName}</div>
        );
    }
}

const mapStateToProps = (state: any) => ({
  lastName: state.file.file.patient.lastName,
  firstName: state.file.file.patient.firstName
});

export default connect<Props, {}, {}>(
  mapStateToProps
)(FileInfo as any);
