import React from 'react';
import { Drawer } from 'material-ui';

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
          <Drawer
            width={400}
            containerStyle={{height: 'calc(100% - 80px)', top: 80}}
            openSecondary={true}>

            <div className="drawer-icon">
              <i className="material-icons closeX"
                onClick={this.handleToggle}>close</i>
            </div>

            <div className="drawer-text-guide">Guide</div>

            <section className="tutorial">
              <p><span className="tutorial-topic">Navigation: &nbsp;</span> Click between tabs on the left.</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">Search: &nbsp;</span>Click the icon located in the header.</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">Add: &nbsp;</span>Type in a number, unit(optional), and name. Press "Enter" or click +.</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">Duplicate Items: &nbsp;</span>Adding an item with same name and unit will auto-update the same item in pantry.</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">Update: &nbsp;</span>Click on the item fields. Click off the field to save.</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">Delete: &nbsp;</span>Click on the "garbage can" icon.</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">Moving Items (Grocery only): &nbsp;</span>Check/uncheck to move an item to "Purchased" and vice versa.</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">"Purchased" Items (Grocery only): &nbsp;</span>Items can also be updated and deleted.</p>
            </section>

            <section className="tutorial">
              <p><span className="tutorial-topic">Auto-add to Pantry (Grocery only): &nbsp;</span>Click "Add to Pantry" to move "Purchased" items to pantry.</p>
            </section>
          </Drawer> : ""
        }
      </div>
    )
  }
}

export default Tutorial;
