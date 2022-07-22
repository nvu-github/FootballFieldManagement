import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardBody,
    Row,
    Col,
  } from "reactstrap";
  
const Home = (props) => {

    // const HomeAdminStyleContainer = {
    //     minHeight: "600px",
    //     fontSize: "40px",
    //     display: "flex",
    // }

    const HomeAdminStyleContent = {
        Margin: 0,
        Position: "absolute",
        Top: "50%",
        Left: "50%",

    }

    return (
        <>
        <div className="content">
            <Row>
            <Col md="12">
                <Card>
                    <CardBody>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px", fontSize: "50px" }} className="container-welcome">
                            <div style={HomeAdminStyleContent} className="content-welcome text-center">
                            <i className="fas fa-door-open"></i>  Hello, {(props.dataLogin.userInfo) ? props.dataLogin.userInfo.dataloginUsername  : ''}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            </Row>
        </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        isLogin: state.userLogin.isLogin,
        dataLogin: state.userLogin
    }
};

const mapDispatchToProps = dispatch => {
    return { };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);