import {useEffect, useState} from 'react';
import Carousel from 'react-bootstrap/Carousel';


const carouselItems = [
  {
    text: "First slide",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    image: "1.jpg"
  },
  {
    text: "Second slide",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    image: "1.jpg"
  },
  {
    text: "Third slide",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    image: "1.jpg"
  }
]

function SlideItem(props: any) {
  return (
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={`${process.env.REACT_APP_IMAGE_PATH}${props.image}`}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>{props.text}</h3>
        <p>{props.description}</p>
      </Carousel.Caption>
    </Carousel.Item>
  );
}

function CustomCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    console.log('CustomCarousel', selectedIndex);
    setIndex(selectedIndex);
  };

  useEffect(() => {
    console.log('CustomCarousel', index);
  }, [index]);

  return (
    // <div className="custom-carousel">Carousel</div>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {carouselItems.map((carouselItem, idx) =>
        <SlideItem
          key={idx}
          text={carouselItem.text}
          image={carouselItem.image}
          description={carouselItem.description}
        />
      )}
    </Carousel>
  );
}

export default CustomCarousel;