import React from 'react';
// import sections
import { connect } from 'react-redux';
import '../assets/style/notfound.css';

const NotFound = (props) => {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                        <h2>Page not found</h2>
                    </div>
                    <a href="/">Homepage</a>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = state =>({});

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);