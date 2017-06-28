import * as React from 'react';

interface Props {
    caption?: string;
}

class MetaSection extends React.Component<Props, {}> {

    render() {
        return (
            <div className="meta-section">
                { this.props.caption && 
                  <div className="meta-section-header">{this.props.caption}</div>
                }
                <div className="meta-section-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default MetaSection;