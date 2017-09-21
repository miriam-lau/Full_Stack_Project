import React from "react";
import { Route, Link } from "react-router-dom";

import PantryIndexItemContainer from "./pantry_index_item_container";
import PantryItemFormContainer from "./pantry_item_form_container";
import ReminderIndexContainer from "../reminders/reminder_index_container";
import { indexCategory } from "../utils/item_categories";

class PantryIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.requestAllPantryItems();
  }

  render() {
    return (
      <div className="wrapper">
        <div>
          <img
              src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447620/side_nav_pantry_f4sutn.png"
              alt="side-bar-img-pantry" className="side-nav-img"
          />
        </div>

        <div className="index">
          <section>
            <h2 className="index-title">Pantry</h2>
          </section>

          <div className="add-item">
            <PantryItemFormContainer />
          </div>

          {indexCategory.map((category, idx) => {
            return (
              <div key={ idx } className="index-category-section">
                <h3 className="index-category">{ category === "" ?
                    "Uncategorized" : category}
                </h3>

                <ul className="items">
                  {this.props.pantryItems.map((item) => {
                    if (item.category === category) {
                      return (
                        <PantryIndexItemContainer
                          key={ item.id }
                          pantryItem={ item }
                        />
                      )
                    }
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="reminders">
          <ReminderIndexContainer />
        </div>
      </div>
    );
  }
}

export default PantryIndex;
