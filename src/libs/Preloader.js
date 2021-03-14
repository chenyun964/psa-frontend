import React, { Component } from 'react';

class Preloader extends Component {
    render() {
        return (
            <div className="col-12 text-center">
                <div className="preloader pl-lg pls-danger">
                    <svg className="pl-circular" viewBox="25 25 50 50">
                        <circle className="plc-path" cx="50" cy="50" r="20"></circle>
                    </svg>
                </div>
            </div>
        )
    }
}

export default Preloader;