import React, { useRef, useState, useEffect } from "react";
import "./imageSlider.css";

const ImageSlider = ({ products, isLoading }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  function nextSlide() {
    if (slideIndex < 2) {
      setSlideIndex(slideIndex + 1);
    } else {
      setSlideIndex(slideIndex - (products.length - 1));
    }
  }
  function prevSlide() {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(slideIndex + products.length - 1);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="image-slider-container">
      <div className="image-slider-wrapper">
        <ul className="image-slider">
          <liv key={slideIndex} className="image-slide">
            <h1>{products[slideIndex].name}</h1>
            <img
              alt={products[slideIndex].name}
              src={products[slideIndex].thumbnail_url}
              key={slideIndex}
              className="image"
            ></img>
          </liv>
        </ul>
      </div>
      <button onClick={() => prevSlide()} className="arrow left">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button onClick={() => nextSlide()} className="arrow right">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default ImageSlider;
