import { useState, useEffect } from "react";

const images = [
  "/images/img1.png",
  "/images/img2.png",
  "/images/img3.png",
];

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  },); 
  // }, [index]); 

  const nextSlide = () => {
    setPrevIndex(index);
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
    setProgressKey((prevKey) => prevKey + 1); 
  };

  return (
    <div className="SliderGroup">
      {images.map((img, i) => (
        <div
          key={i}
          className={`SliderItem ${i === index ? "" : i === (index + 1) % images.length ? "SgAfter" : "SgLast"
            } ${i === index && prevIndex !== index ? "swing-animation" : ""
            } ${i === (index + 1) % images.length && prevIndex !== index ? "swing-animation1" : ""
            } ${i === (index - 1 + images.length) % images.length && prevIndex !== index ? "swing-animation2" : ""
            }`}
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="CircularProgress" key={progressKey}>
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45"></circle>
              <circle className="progress" cx="50" cy="50" r="45"></circle>
            </svg>
          </div>

          <button onClick={nextSlide} className="SliderButton">
            Next Slide
          </button>
        </div>
      ))}
    </div>
  );
};

export default Slider;