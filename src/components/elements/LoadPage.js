import React from 'react'
import loaderImg from '../../assets/images/giphy2.gif';
import { connect } from 'react-redux';

const PageLoader = (props) => {
    const {loading} = props;
    if(!loading) return null;

    return(
        <>
            <div style={{position: "fixed", zIndex: 1060, top: 0, left: 0, width: "100%", height: "100%", backgroundColor : "#F8F8F8AD", display: "flex", alignItems: "center", justifyContent: "center"}} className="loading-container">
                <div style={{zIndex: 1060, position: "absolute"}} className="loading">
                    <img src={loaderImg} alt=""></img>
                </div>
            </div>
        </>
        
    )
}
const mapStateToProps = state => {
    return{ 
        loading: state.app.loading 
    }
}

export default connect(mapStateToProps)(PageLoader);

