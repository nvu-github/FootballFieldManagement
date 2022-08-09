import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Row,
    Col,
} from "reactstrap";
import CarouselHome from '../components/sections/User/home/CarouselHome';
import CardRight from '../components/sections/User/home/CardRight';
import CategoryHome from '../components/sections/User/home/CategoryHome';
import OwlCarouselHome from '../components/sections/User/home/OwlCarouselHome';
  
const Home = () => {

    useEffect(() => {
        document.title = 'Trang chủ';
    }, []);
    
    return (
        <>
            <Row>
                <Col md="9">
                    <CarouselHome />
                </Col>
                <Col md="3" >
                    <CardRight />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col md="12">
                    <CategoryHome />
                </Col>
            </Row>
            <Row className='mt-4'>
                <Col md="12">
                    <CategoryHome />
                </Col>
            </Row>
            <Row className='mt-4'>
                <OwlCarouselHome />
            </Row>
        </>
    );
}

// const mapStateToProps = state => {
//     return {
//         isLogin: state.userLogin.isLogin,
//         dataLogin: state.userLogin
//     }
// };

// const mapDispatchToProps = dispatch => {
//     return { };
// };

export default connect(null, null)(Home);