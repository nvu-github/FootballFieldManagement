import React from "react";
import '../../assets/style/User/BannerHeader.scss';
// import logo from '../../assets/images/logowebsite.webp';
import MenuLogin from "./partials/MenuLogin";

const BannerHeader = () => {
    return (
        <>
        <div className="banner-header">
            {/* <div className="row banner-header__side-label">
                <div className="container">
                    <div className="col-md-12 text-right">
                        Liên hệ chủ sân: 0987654567 
                    </div>
                </div>
            </div> */}
            <div className="container">
                <div className="banner-header__content">
                    {/* <div className="banner-header__content__logo-header">
                        <img src={logo} alt="logo" />
                        Liên hệ chủ sân: 0987654567 
                    </div> */}
                    <div className="banner-header__content__content-right">
                        <div className="banner-header__content__content-right__title">
                            {/* <h5>Sân bóng Hoàng Quân</h5> */}
                            Liên hệ chủ sân: 0987654567 
                        </div>
                        <div className="banner-header__content__content-right__actions">
                            <MenuLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default BannerHeader;