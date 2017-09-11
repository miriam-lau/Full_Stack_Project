import React from "react";
import { Link } from "react-router-dom";

import Conversion from "../conversion_chart/conversion";
import Tutorial from "../tutorial/tutorial";
import SearchFormContainer from "../search/search_form_container";
import { Drawer } from "material-ui";

class PersonalGreeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openTutorial: false, openConversion: false };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleTutorial = this.handleTutorial.bind(this);
    this.handleConversion = this.handleConversion.bind(this);
  }

  /*
    Logs out user and redirects to home.
    @param {event}
  */
  handleSignOut(event) {
    event.preventDefault();
    return this.props.signout().then(() => { this.props.history.push("/") });
  }

  /*
    Toggles the state of the tutorial page from open to close.
    @param {event}
  */
  handleTutorial(event) {
    this.setState({ openConversion: false,
        openTutorial: !this.state.openTutorial });
  }

  /*
    Toggles the state of the conversion page from open to close.
    @param {event}
  */
  handleConversion(event) {
    this.setState({ openTutorial: false,
        openConversion: !this.state.openConversion });
  }

  render() {
    return (
      <nav className="header-group2">
        <div className="header">
          <h1 className="greeting">myPantry</h1>
          <div className="search-bar"><SearchFormContainer /></div>
        </div>

        <div className="header">
          <section className="header2">
            <h2 className="header-name">Hello, &nbsp;
              { this.props.currentUser.username }!
            </h2>
          </section>

          <section className="header2">
            <i className="fa fa-info-circle fa-lg" aria-hidden="true"
                onClick={ this.handleTutorial }>
            </i>
            {this.state.openTutorial ?
              <Drawer
                  width={ 400 }
                  containerStyle={ { height: "calc(100% - 80px)", top: 80 } }
                  openSecondary={ true }>
                <div className="drawer-icon">
                  <i className="material-icons closeX"
                      onClick={ this.handleTutorial }>close
                  </i>
                </div>
                <Tutorial />
              </Drawer> : ""
            }
          </section>

          <section className="header2">
            <i className="fa fa-calculator fa-lg" aria-hidden="true"
                onClick={ this.handleConversion }>
            </i>
            {this.state.openConversion ?
              <Drawer
                  width={ 400 }
                  containerStyle={ { height: "calc(100% - 80px)", top: 80 } }
                  openSecondary={ true }>
                  <div className="drawer-icon">
                    <i className="material-icons closeX"
                        onClick={ this.handleConversion }>close
                    </i>
                  </div>
                  <Conversion />
              </Drawer> : ""
            }
          </section>

          <section className="header2">
            <button className="header-link" onClick={ this.handleSignOut }>
                Sign Out
            </button>
          </section>
        </div>
      </nav>
    )
  }
}

export default PersonalGreeting;
