import React from "react";
import '../../assets/style/BannerHeader.scss';
import logo from '../../assets/images/logowebsite.webp';

const BannerHeader = () => {
    return (
        <>
        <div className="banner-header">
            <div className="container">
                <div className="row banner-header__side-label">
                    <div className="col-md-12 text-right">
                        Liên hệ chủ sân: 0987654567 
                    </div>
                </div>
                <div className="row banner-header__content">
                    <div className="banner-header__content__logo-header">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="banner-header__content_header">

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default BannerHeader;