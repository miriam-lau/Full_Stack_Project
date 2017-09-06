import React from "react";
import { Route, Link } from "react-router-dom";

import RecipeIndexContainer from "./recipe_index_container";
import RecipeUpdateContainer from "./recipe_update_container";

import DayPicker from "react-day-picker";
import merge from "lodash/merge";
import Modal from "react-modal";

import { recipeModalStyle } from "../utils/modal_styles";
import { FontIcon, TextField } from "material-ui/";
import { underlineFocusStyle, underlineStyle, itemStyleDefault, styles } from
    "../utils/material_ui_styles";

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    let moment = require("moment");
    this.state = { selectedDay: moment().format("MM-DD-YYYY"),
        openUpdate: false, modalIsOpen: false, due_date: "" };

    this.strSplit = this.strSplit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSetDate = this.handleSetDate.bind(this);

    // calendar modal functions
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // Opens the modal
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  // afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  // }

  // Opens the modal
  closeModal() {
    this.setState({modalIsOpen: false});
  }

  // Defines what html element the modal will mount with
  componentWillMount() {
    Modal.setAppElement("div");
  }

  componentDidMount() {
    this.props.requestRecipe(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.requestRecipe(nextProps.match.params.id);
    }
  }

  /*
    Splits the html string on "\n".
    @param {string}
  */
  strSplit(str) {
    let strArray = str.split("\n");
    return strArray;
  }

  /*
    Toggles the open and close state of update form.
    @param {event}
  */
  handleUpdate(event) {
    this.setState({ openUpdate: !this.state.openUpdate });
  }

  /*
    On click, sets the date of a recipe in the format "MM-DD-YYYY", and updates the recipe with the date.
    @param {event}
  */
  handleSetDate(event) {
    const recipeId = parseInt(this.props.match.params.id);
    const recipe = this.props.recipe[recipeId];

    console.log("in modal set recipe date");

    let month = event.getMonth() + 1;
    let monthStr = "";
    monthStr = (month < 10) ? ("0" + month) : ("" + month);

    let dayStr = "";
    let day = event.getDate();
    dayStr = (day < 10) ? ("0" + day) : ("" + day);

    let year = event.getFullYear();
    let customDate = monthStr + "-" + dayStr + "-" + year;

    console.log(customDate);

    this.setState({ due_date: customDate }, () => {
      this.closeModal();
      let updatedRecipe = merge({}, this.props.recipe);
      updatedRecipe.due_date = this.state.due_date;
      this.props.updateRecipe({ recipe: updatedRecipe }).then( (recipe) => {
        this.props.history.push("/pantry_items");
      });
    });
  }

  /*
    On click, deletes the recipe.
    @param {event}
  */
  handleDelete(event) {
    const recipeId = parseInt(this.props.match.params.id);
    const recipe = this.props.recipe[recipeId];
    this.props.deleteRecipe(recipe.id).then( () => {
      this.props.history.push("/recipes");
    });
  }

  render() {
    const recipeId = parseInt(this.props.match.params.id);
    const recipe = this.props.recipe[recipeId];
    // if type recipes.recipe_id it will become a string literal, need index
    if (!recipe) return null;
    let disabledDays = {};
    let selectedDay = this.state.selectedDay;

    return (
      <div className="wrapper">
        <div>
          <img src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447618/side_nav_recipe_c4agb9.png" alt="side-bar-img-recipe" className="side-nav-img"/>
        </div>

        {this.state.openUpdate ?
          <RecipeUpdateContainer recipe={ recipe } /> :
          <div className="recipe-detail">
            <section className="recipe-link-wrapper">
              <Link className="recipe-link" to="/recipes">All Recipes</Link>
              <Route exact path="/recipes" component={ RecipeIndexContainer } />
            </section>

            <section className="recipe-detail-info">
              <h2>{recipe.name}</h2>

              <div className="recipe-detail-choices">
                <section id="recipe-detail-icon-wrapper">
                  <div id="recipe-button-wrapper">
                    <i className="fa fa-calendar fa-lg" aria-hidden="true"
                        onClick={ this.openModal }>
                    </i>
                    <Modal
                        isOpen={ this.state.modalIsOpen }
                        onAfterOpen={ this.afterOpenModal }
                        onRequestClose={ this.closeModal }
                        style={ recipeModalStyle } >
                      <div className="modal-icon">
                        <i className="material-icons calendar-closeX"
                            onClick={ this.closeModal }>close</i>
                      </div>
                      <div>
                        <h2 className="calendar-title">Select a Date</h2>
                        <div className="recipe-calendar-directions">To make: "{recipe.name}"</div>

                        <DayPicker
                          enableOutsideDays
                          disabledDays={ disabledDays }
                          selectedDays={ this.state.selectedDay }
                          onDayClick={ this.handleSetDate }
                        />
                      </div>
                     </Modal>
                  </div>

                  <div id="recipe-button-wrapper">
                      <i className="fa fa-pencil fa-lg" aria-hidden="true"
                          onClick={ this.handleUpdate }>
                      </i>
                  </div>

                  <div id="recipe-button-wrapper">
                    <i className="material-icons trash-can-recipe"
                        style={ styles }
                        onClick={ this.handleDelete }>
                        delete_forever
                    </i>
                  </div>
                </section>

                {recipe.due_date != "" ?
                    <section className="recipe-choosen-date">
                        Date to make recipe: { recipe.due_date }
                    </section> :
                    <section className="recipe-choosen-date">
                        Date to make recipe: None
                    </section>
                }

              </div>

              <div className="recipe-detail-content">
                <figure className="recipe-detail-img">
                  {recipe.image_url !== "" ?
                    <img src={ recipe.image_url } alt={ recipe.name }/> :
                    <img
                        src="http://res.cloudinary.com/miriam-lau/image/upload/c_scale,w_300/v1499837766/recipe_img_ifau7s.jpg"/>
                  }
                </figure>

                <section className="recipe-detail-content1">
                  <div className="recipe-1">
                    <div className="recipe-detail-servings-title">Servings: </div>
                    <div className="recipe-servings-text">
                        {recipe.serving === 0 ? "Not Specified" : recipe.serving}
                    </div>
                  </div>

                  <div className="recipe-1">
                    <div className="recipe-detail-title">Rating: </div>
                    <div className="recipe-text">{recipe.rating === 0 ?
                        "No Rating Yet" : recipe.rating}
                    </div>
                  </div>

                  <div className="recipe-1">
                    <div  className="recipe-detail-title">Website: </div>
                    <a href={recipe.link}
                        className="recipe-detail-link">{recipe.link}
                    </a>
                  </div>

                  <div>
                    <h3 className="recipe-detail-description-title">Description</h3>
                    <div className="recipe-description-text">
                        {recipe.description}
                    </div>
                  </div>
                </section>
              </div>

              <div className="recipe-detail-content2">
                <section className="recipe-detail-ingredients">
                  <h3 className="recipe-detail-title2">Ingredients</h3>
                  <ul>{ this.strSplit(recipe.ingredients).map((line, idx) => {
                    return (<li key={ idx }>{ line }</li>)
                  })}
                  </ul>
                </section>

                <section className="recipe-detail-directions">
                  <h3 className="recipe-detail-title3">Directions</h3>
                  <ul>{ this.strSplit(recipe.directions).map((line, idx) => {
                    return (<li key={ idx }>{ line }</li>)
                  })}
                  </ul>
                </section>

              </div>

              <section>
                <h3 className="recipe-detail-title2">Cooking Notes</h3>
                <div className="recipe-detail-notes">{recipe.notes}
                </div>
              </section>
            </section>
          </div>
        }
      </div>
    );
  }
}

export default RecipeDetail;
