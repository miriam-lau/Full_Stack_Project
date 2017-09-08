import React from "react";
import { Link, withRouter } from "react-router-dom";

import HomeContainer from "./home_container";
import ModalFormContainer from "../modal/modal_container";
import Carousel from "nuka-carousel";
import CarouselStyles from "../utils/carousel_styles";

/*
  Opens a new session, either signin or signup
  @param {modalOpen} state of modal
  @param {openModal} type of modal, either signin or signup
*/
// extract to it's own file?
const sessionLinks = ({ modalOpen, openModal, signin, signup, errors,
    clearErrors }) => {
  return (
    <nav className="header-group">
      <div className="header">
        <h1 className="greeting">myPantry</h1>
      </div>

      <div className="header">
        <div className="nav-link">
          <button onClick={ openModal("signin") }>Sign In</button>
        </div>

        <div className="nav-link">
          <button onClick={ openModal("signup") }>Create Account</button>
        </div>

        <ModalFormContainer openModal={ openModal } modalOpen={ modalOpen } />
      </div>
    </nav>
  )
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "guest", password: "password", modalOpen: "" };
    this.openModal = this.openModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
    Opens the modal
    @param {type} type is either "Sign In" or "Sign Up"
  */
  openModal(type) {
    return () => this.setState({ modalOpen: type });
  }

  /*
    On submit, signs in user and redirects to pantry items page.
    @param {event}
  */
  handleSubmit(event) {
    event.preventDefault();
    const user = this.state;
    return this.props.receiveCurrentUser({ user })
        .then(() => { this.props.history.push("/pantry_items") });
  }

  render() {
    const { signin, signup, errors, clearErrors } = this.props;
    const openModal = this.openModal;
    const { modalOpen } = this.state;

    return (
      <div className="main-content">
        {sessionLinks({ modalOpen, openModal, signin, signup, errors,
            clearErrors })}

        <Carousel className="image" wrapAround={ true } autoplay={ true }
            autoInterval={ 5000 } decorators={ CarouselStyles }>

          <div className="home-panels">
            <h2 className="home-titles1">myPantry</h2>
            <img src="http://res.cloudinary.com/miriam-lau/image/upload/c_scale,w_3000/v1497914784/splash1_ewnc3w.jpg"
              alt="splash-img"/>
          </div>

          <div>
            <h2 className="home-titles">Keep Track of Your Pantry</h2>
            <img src="http://res.cloudinary.com/miriam-lau/image/upload/c_scale,w_3000/v1498091372/splash6_ltuu4o.jpg"
              alt="splash-img"/>
          </div>

          <div>
            <h2 className="home-titles">Add Items to Groceries</h2>
            <img src="http://res.cloudinary.com/miriam-lau/image/upload/c_scale,w_3000/v1498091070/splash5_ahikxd.jpg"
              alt="splash-img"/>
          </div>

          <div>
            <h2 className="home-titles">Create and Save Recipes</h2>
            <img src="http://res.cloudinary.com/miriam-lau/image/upload/c_scale,w_3000/v1497914707/splash2_lqb1eb.jpg"
                alt="splash-img"/>
          </div>
        </Carousel>

        <div>
          <section className="app-info">
            <section>
              <h3>Keep Track of Your Pantry</h3>
              <p>Always know what you have in your pantry.  Check out the
              auto-update feature: after purchasing groceries, click a button and myPantry will combine duplicate items and add new items to your pantry from your Grocery page.</p>
            </section>
            <section>
              <h3>Add Items to Groceries</h3>
              <p>Grocery Shopping has never been easier! Add items to your grocery list. Check off items to transfer them to the "Purchased" list. Click a button to add purchased items to your pantry.</p>
            </section>
            <section>
              <h3>Create and Save Recipes</h3>
              <p>Save your favorite recipes in myPantry.  Create and view your recipes in the Recipe page. Add personal notes, upload food photos, and rate your recipes.</p>
              </section>
          </section>
        </div>

        <div>
          <footer className="home-footer">
            <div>
              <i className="fa fa-copyright" aria-hidden="true"></i>
                  2017 myPantry. &nbsp; All rights reserved.
            </div>
          </footer>
        </div>

      </div>
    )
  }
}

export default Home;
