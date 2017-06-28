import * as React from 'react';

export interface EditorProps{
    value: string,
    onChange: Function
}

class AbstractEditor<T extends EditorProps> extends React.Component<T,{}> {
}

export default AbstractEditor;
