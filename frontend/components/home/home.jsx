import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import HomeContainer from './home_container';
import Carousel from 'nuka-carousel';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: 'guest', password: 'password'};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    this.props.receiveCurrentUser({user});
  }

  render() {
    return (
      <div className="main-content">
        <button className="guest-sign-in" onClick={ this.handleSubmit }>Guest Sign In</button>
        <Carousel className="image" wrapAround={true} autopaly={true}>
          <img src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=1079&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
           alt="splash-img"/>
          <img src="https://images.unsplash.com/photo-1492739159057-7d1896b3c63f?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=844&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
            alt="splash-img"/>
          <img src="https://images.unsplash.com/photo-1482012792084-a0c3725f289f?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=1000&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
           alt="splash-img"/>
          <img src="https://images.unsplash.com/photo-1491994778642-b286df793bf6?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=1000&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
            alt="splash-img"/>
       </Carousel>
      </div>
    )
  }
}

export default Home;
