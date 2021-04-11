import React, { Component } from 'react';

class Notfound extends Component {
    componentDidMount() {
        window.location.replace('/');
    }

    render() {
        return (
            <div className="clinic-page container"></div>
        );
    }
}

export default Notfound;
