import React from "react";
import { Drawer } from "material-ui";

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state={toggle: false};
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    event.preventDefault();
    this.setState({toggle: !this.state.toggle});
  }

  render() {
    return (
      <div>
        <i className="fa fa-info-circle fa-lg" aria-hidden="true" onClick={this.handleToggle}></i>

        {this.state.toggle ?
          <Drawer width={400}
            containerStyle={{height: "calc(100% - 80px)", top: 80}}
            openSecondary={true}>

            <div className="drawer-icon">
              <i className="material-icons closeX"
                onClick={this.handleToggle}>close</i>
            </div>

            <div className="drawer-text-guide">Guide</div>

            <div className="tutorial">
              <section>
                <p><span>Navigation: &nbsp;</span> Click between tabs on the left.</p>
              </section>

              <section>
                <p><span>Search: &nbsp;</span>Click the icon located in the header.</p>
              </section>

              <section>
                <p><span>Add: &nbsp;</span>Type in a number, unit(optional), and name. Press "Enter" or click +.</p>
              </section>

              <section>
                <p><span>Duplicate Items: &nbsp;</span>Adding an item with same name and unit will auto-update the same item in pantry.</p>
              </section>

              <section>
                <p><span>Update: &nbsp;</span>Click on the item fields. Click off the field to save.</p>
              </section>

              <section>
                <p><span>Delete: &nbsp;</span>Click on the "garbage can" icon.</p>
              </section>

              <section>
                <p><span>Moving Items (Grocery only): &nbsp;</span>Check/uncheck to move an item to "Purchased" and vice versa.</p>
              </section>

              <section>
                <p><span>"Purchased" Items (Grocery only): &nbsp;</span>Items can also be updated and deleted.</p>
              </section>

              <section>
                <p><span>Auto-add to Pantry (Grocery only): &nbsp;</span>Click "Add to Pantry" to move "Purchased" items to pantry.</p>
              </section>
            </div>
          </Drawer> : ""
        }
      </div>
    )
  }
}

export default Tutorial;
