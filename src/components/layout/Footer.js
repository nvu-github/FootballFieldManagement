import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import Logo from './partials/Logo';
// import FooterNav from './partials/FooterNav';
import FooterSocial from './partials/FooterSocial';
import logo from '../../assets/images/logowebsite.webp';

const propTypes = {
  topOuterDivider: PropTypes.bool,
  topDivider: PropTypes.bool
}

const defaultProps = {
  topOuterDivider: false,
  topDivider: false
}

const Footer = ({
  className,
  topOuterDivider,
  topDivider,
  ...props
}) => {

    const classes = classNames(
        'site-footer center-content-mobile',
        topOuterDivider && 'has-top-divider',
        className
    );

    return (
        <footer
        className={classes}
        >
        <div className="container">
            <div className={
            classNames(
                'site-footer-inner',
                topDivider && 'has-top-divider'
            )}>
            <div className="footer-top space-between text-xxs">
                {/* <Logo /> */}
                <div className='footer-top__logo-footer d-flex'>
                    <div style={{ width: '80px', marginRight: '20px' }} className='bg-white'>
                        <img src={logo} alt="" />
                    </div>
                    {/* <h5>Sân bóng Hoàng Quân</h5> */}
                </div>
                <FooterSocial />
            </div>
            <div className="footer-bottom space-between text-xxs invert-order-desktop">
            </div>
            </div>
        </div>
        </footer>
    );
}

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;