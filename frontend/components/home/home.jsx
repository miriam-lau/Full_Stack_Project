import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import HomeContainer from './home_container';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: 'guest', password: 'password'};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    const user = this.state;
    this.props.receiveCurrentUser({user});
  }

  render() {
    return (
      <div className="main-content">
        <button className="guest-sign-in" onClick={ this.handleSubmit }>Guest Sign In</button>
        <img className="image" src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=1079&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
         alt="splash-img"/>
      </div>
    )
  }
}

export default Home;
