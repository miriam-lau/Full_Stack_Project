import React from "react";

// Home page carousel styles.
const CarouselStyles = [
  {component: React.createClass({
    render() {
      return (
        <button
            style={ this.getButtonStyles(this.props.currentSlide === 0
                && !this.props.wrapAround) }>
          <img className="carousel-arrows"
              src="https://res.cloudinary.com/miriam-lau/image/upload/v1497910926/left_arrow_zijqiu.png" id="left-button"
              onClick={ this.handleClick }
          />
        </button>
      );
    },
    handleClick(event) {
      event.preventDefault();
      this.props.previousSlide();
    },
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
  }),
  position: "CenterLeft"
  },
  {component: React.createClass({
    render() {
      return (
        <button
            style={ this.getButtonStyles(this.props.currentSlide +
                this.props.slidesToScroll >= this.props.slideCount && !this.props.wrapAround) }>
          <img className="carousel-arrows"
              src="https://res.cloudinary.com/miriam-lau/image/upload/v1497910923/right_arrow_amcxml.png" id="right-button"
              onClick={ this.handleClick }
          />
        </button>
      );
    },
    handleClick(event) {
      event.preventDefault();
      this.props.nextSlide();
    },
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
  }),
  position: "CenterRight"
  },
  {component: React.createClass({
    render() {
      var self = this;
      var indexes = this.getIndexes(self.props.slideCount,
          self.props.slidesToScroll);
      return (
        <ul style={ self.getListStyles() }>
          {indexes.map(function(index) {
            return (
              <li style={ self.getListItemStyles() } key={ index }>
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
    },
    getIndexes(count, inc) {
      var arr = [];
      for (var i = 0; i < count; i += inc) {
        arr.push(i);
      }
      return arr;
    },
    getListStyles() {
      return {
        position: "relative",
        margin: 0,
        top: -10,
        padding: 0
      };
    },
    getListItemStyles() {
      return {
        listStyleType: "none",
        display: "inline-block"
      }
    },
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
  }),
  position: "BottomCenter"
  }
];

export default CarouselStyles;
