import React from 'react';
import OwlCarousel from "react-owl-carousel";

import img1 from '../../../../assets/images/features-split-image-01.png';
import img2 from '../../../../assets/images/features-split-image-02.png';
import img3 from '../../../../assets/images/features-split-image-03.png';
// import img4 from '../../../../assets/images/features-split-image-01.png';

const OwlCarouselHome = () => {
    return(
        <>
            <OwlCarousel className="owl-theme" items={5} loop margin={10} nav>
                <div className="item">
                    <img src={img1} alt="" />
                </div>
                <div className="item">
                    <img src={img2} alt="" />
                </div>
                <div className="item">
                    <img src={img3} alt="" />
                </div>
                <div className="item">
                    <img src={img3} alt="" />
                </div>
                <div className="item">
                    <img src={img3} alt="" />
                </div>
                <div className="item">
                    <img src={img3} alt="" />
                </div>
                <div className="item">
                    <img src={img3} alt="" />
                </div>
                <div className="item">
                    <img src={img3} alt="" />
                </div>
                <div className="item">
                    <img src={img3} alt="" />
                </div>
                {/* <div class="item">
                    <img src="assets/img/4.jpg" />
                </div>
                <div class="item">
                    <img src="assets/img/5.jpg" />
                </div> */}
            </OwlCarousel>
        </>
    );
}

export default OwlCarouselHome