import React, {useState} from 'react';

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption 
} from 'reactstrap';

import img1 from "../../../../assets/images/home/IMG20220211195849.jpg";
import img2 from "../../../../assets/images/home/IMG_20211018_204019.jpg";
import img3 from "../../../../assets/images/home/IMG_20211119_180611.jpg";

const CarouselHome = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const items = [
        {
            src: img1,
            altText: 'Slide 1',
            caption: 'Slide 1'
        },
        {
            src: img2,
            altText: 'Slide 2',
            caption: 'Slide 2'
        },
        {
            src: img3,
            altText: 'Slide 3',
            caption: 'Slide 3'
        }
    ];

    const onExiting = () => {
        setAnimating(true)
    }

    const onExited = () => {
        setAnimating(false)
    }

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }


    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={onExiting}
          onExited={onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText="" captionHeader="" />
          {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
        </CarouselItem>
      );
    });

    return (
        <>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </>
    );
}

export default CarouselHome;