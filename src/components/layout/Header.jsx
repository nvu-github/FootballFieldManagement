import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import Logo from './partials/Logo';
// import MenuLogin from './partials/MenuLogin';
import BannerHeader from './BannerHeader';
import {connect} from 'react-redux';
import sha1 from 'sha1';

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {
    const [isActive, setIsactive] = useState(false);

    const nav = useRef(null);
    const hamburger = useRef(null);
    const location = useLocation();
    const [stickyClass, setStickyClass] = useState('');

    const activeRoute = (routeName) => {
        return location.pathname.indexOf(routeName) > -1 ? "active" : "";
    };

    useEffect(() => {
        isActive && openMenu();
        document.addEventListener('keydown', keyPress);
        document.addEventListener('click', clickOutside);
        window.addEventListener('scroll', stickNavbar);
        return () => {
            document.removeEventListener('keydown', keyPress);
            document.removeEventListener('click', clickOutside);
            closeMenu();
            window.removeEventListener('scroll', stickNavbar);
        };
    });  

    const stickNavbar = () => {
        if (window !== undefined) {
          let windowHeight = window.scrollY;
          windowHeight > 150 ? setStickyClass('sticky-nav') : setStickyClass('');
        }
    };

    const openMenu = () => {
        document.body.classList.add('off-nav-is-active');
        nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
        setIsactive(true);
    }

    const closeMenu = () => {
        document.body.classList.remove('off-nav-is-active');
        nav.current && (nav.current.style.maxHeight = null);
        setIsactive(false);
    }

    const keyPress = (e) => {
        isActive && e.keyCode === 27 && closeMenu();
    }

    const clickOutside = (e) => {
        if (!nav.current) return
        if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
        closeMenu();
    }  

    // const classes = classNames(
    //     'site-header',
    //     bottomOuterDivider && 'has-bottom-divider',
    //     className
    // );

    return (
        <header
        // {...props}
        className={'site-header'}
        >
        <BannerHeader />
        <div className={`menu-content ${stickyClass}`}>
            <div className="container">
                <div className={'site-header-inner'}>
                <Logo />
                {!hideNav &&
                    <>
                    <button
                        ref={hamburger}
                        className="header-nav-toggle"
                        onClick={isActive ? closeMenu : openMenu}
                    >
                        <span className="screen-reader">Menu</span>
                        <span className="hamburger">
                        <span className="hamburger-inner"></span>
                        </span>
                    </button>
                    <nav
                        ref={nav}
                        className={
                        classNames(
                            'header-nav',
                            isActive && 'is-active'
                        )}>
                        <div className="header-nav-inner">
                        <ul className={
                            classNames(
                            'list-reset text-xs',
                            navPosition && `header-nav-${navPosition}`
                            )}>
                            {props.routes.map((prop, key) => {
                                if (prop.path !== '/' && prop.component !== '') {
                                    if (props.dataLogin && prop.auth === true && props.dataLogin.permission === sha1(prop.permission)) {
                                        return (
                                            <li
                                            className={
                                                activeRoute(prop.path) + (prop.pro ? " active-item" : "")
                                            }
                                            key={key}>
                                                <Link to={prop.path}>{prop.name}</Link>
                                            </li>
                                        );
                                    } 
                                    if (prop.auth === false && !props.dataLogin) {
                                        return (
                                            <li
                                            className={
                                                activeRoute(prop.path) + (prop.pro ? " active-item" : "")
                                            }
                                            key={key}>
                                                <Link to={prop.path}>{prop.name}</Link>
                                            </li>
                                        );
                                    }
                                    if (prop.auth === false) {
                                        return (
                                            <li
                                            className={
                                                activeRoute(prop.path) + (prop.pro ? " active-item" : "")
                                            }
                                            key={key}>
                                                <Link to={prop.path}>{prop.name}</Link>
                                            </li>
                                        );
                                    }
                                }
                                return null;
                            })}
                        </ul>
                        </div>
                    </nav>
                    </>}
                </div>
            </div>
        </div>
        </header>
    );
}

const mapStateToProps = state =>{
    return {
        isLogin: state.userLogin.isLogin,
        dataLogin: state.userLogin.userInfo
    }
};
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default connect(mapStateToProps, null)(Header);
