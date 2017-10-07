import React from "react";

const carouselListStyles = {
  position: "relative",
  margin: 0,
  top: -10,
  padding: 0
}

const carouselListItemStyles = {
  listStyleType: "none",
  display: "inline-block"
}

class CarouselButtonStyles extends React.Component {
  constructor(props) {
    super(props);
  }

  getButtonStyles(disabled) {
    return {
      border: 0,
      background: "rgba(0,0,0,0)",
      color: "white",
      padding: 10,
      outline: 0,
      opacity: disabled ? 0.3 : 1,
    };
  }

  getButtonStyles(active) {
    return {
      border: 0,
      background: "transparent",
      color: "black",
      cursor: "pointer",
      padding: 10,
      outline: 0,
      fontSize: 24,
      opacity: active ? 1 : 0.5
    };
  }

  getIndexes(count, inc) {
    var arr = [];
    for (var i = 0; i < count; i += inc) {
      arr.push(i);
    }
    return arr;
  }

  handleClickRight(event) {
    event.preventDefault();
    this.props.nextSlide();
  }

  renderRightButton() {
    return (
      <button
          style={ this.getButtonStyles(this.props.currentSlide +
              this.props.slidesToScroll >= this.props.slideCount && !this.props.wrapAround) }>
        <img className="carousel-arrows"
            src="https://res.cloudinary.com/miriam-lau/image/upload/v1497910923/right_arrow_amcxml.png" id="right-button"
            onClick={ this.handleClickRight }
        />
      </button>
    );
  }

  handleClickLeft(event) {
    event.preventDefault();
    this.props.previousSlide();
  }

  renderLeftButton() {
    return (
      <button
          style={ this.getButtonStyles(this.props.currentSlide === 0
              && !this.props.wrapAround) }>
        <img className="carousel-arrows"
            src="https://res.cloudinary.com/miriam-lau/image/upload/v1497910926/left_arrow_zijqiu.png" id="left-button"
            onClick={ this.handleClickLeft }
        />
      </button>
    );
  }

  render() {
    var self = this;
    var indexes = this.getIndexes(self.props.slideCount,
        self.props.slidesToScroll);
    return (
      <ul style={ carouselListStyles }>
        {indexes.map(function(index) {
          return (
            <li style={ carouselListItemStyles } key={ index }>
              <button
                  style={ self.getButtonStyles(
                      self.props.currentSlide === index) }
                  onClick={ self.props.goToSlide.bind(null, index) }>
                &bull;
              </button>
            </li>
          )})
        }
      </ul>
    );
  }
}

export default CarouselButtonStyles;
