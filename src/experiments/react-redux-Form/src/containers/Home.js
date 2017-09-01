import React, {Component} from 'react';

class HomePage extends Component {
    render() {
        let v = window["done"];
        if(!v) {
            v ="no";
        }
        return (
            <p>Nothing, some random notes {v}</p>
        );
    }
}

export default HomePage;
