import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from '../../elements/Image';
import imgLogo from '../../../assets/images/logowebsite.webp';

const Logo = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'brand',
    className
  );

  return (
    <div
      {...props}
      className={classes}
    >
      <h1 className="m-0">
        <Link to="/">
          <Image
            src={imgLogo}
            alt="Open"
            width={60}
            height={60} />
        </Link>
      </h1>
    </div>
  );
}

export default Logo;