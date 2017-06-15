import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import HomeContainer from './home_container';
import Carousel from 'nuka-carousel';
// import Decorator from './decorator';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: 'guest', password: 'password'};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    return this.props.receiveCurrentUser({user})
      .then( () => { this.props.history.push('/pantry_items');
    });
  }

  render() {
    return (
      <div className="main-content">
        <Carousel className="image" wrapAround={true} autoplay={true}
          autoInterval={5000}>

          <div className="home-panels">
            <h2 className="home-titles1">myPantry</h2>
            <img src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=1079&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
              alt="splash-img"/>
          </div>

          <div>
            <h2 className="home-titles">Keep Track of Your Pantry</h2>
            <img src="https://images.unsplash.com/photo-1492739159057-7d1896b3c63f?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=844&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
              alt="splash-img"/>
          </div>

          <div>
            <h2 className="home-titles">Auto-Update Your Pantry</h2>
            <img src="https://images.unsplash.com/photo-1482012792084-a0c3725f289f?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=1000&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
             alt="splash-img"/>
          </div>

          <div>
            <h2 className="home-titles">Make Grocery Lists</h2>
            <img src="https://images.unsplash.com/photo-1491994778642-b286df793bf6?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=1000&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
              alt="splash-img"/>
          </div>

          <div>
            <h2 className="home-titles">Save Recipes</h2>
            <img src="https://images.unsplash.com/photo-1491994778642-b286df793bf6?dpr=2&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=1000&amp;q=80&amp;cs=tinysrgb&amp;crop=&amp;bg="
              alt="splash-img"/>
          </div>
        </Carousel>

        <div className="app-info">
          <section>
            <h3>Keep Track of Your Pantry</h3>
            <p>hello</p>
          </section>
          <section>
            <h3>Auto-Update Your Pantry</h3>
            <p>hello</p>
          </section>
          <section>
            <h3>Make Grocery Lists</h3>
            <p>hello</p>
          </section>
          <section>
            <h3>Save Recipes</h3>
            <p>hello</p>
          </section>
        </div>

       <div id="footer">
         <footer className="home-footer">
           <div>Copyright 2017 myPantry. All rights reserved.
           </div>
         </footer>
       </div>

      </div>
    )
  }
}

export default Home;


// <button className="guest-sign-in" onClick={ this.handleSubmit }>Guest Sign In</button>
