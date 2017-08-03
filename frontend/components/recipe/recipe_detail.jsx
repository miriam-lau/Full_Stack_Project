import React from "react";
import { Route, Link } from "react-router-dom";

import CalendarModalForm from "./calendar_modal_form";
import RecipeIndexContainer from "./recipe_index_container";
import RecipeUpdateContainer from "./recipe_update_container";

import Modal from "react-modal";
import { recipeModalStyle } from "../utils/modal_styles";
import { FontIcon, TextField } from "material-ui/";
import { underlineFocusStyle, underlineStyle, itemStyleDefault, styles } from
    "../utils/material_ui_styles";

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openUpdate: false, showCalendar: false, modalIsOpen: false };

    this.strSplit = this.strSplit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCalendar = this.handleCalendar.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // calendar modal functions
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

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

  strSplit(str) {
    let strArray = str.split("\n");
    return strArray;
  }

  handleUpdate(event) {
    this.setState({ openUpdate: !this.state.openUpdate });
  }

  handleCalendar(event){
    this.setState({ showCalendar: !this.state.showCalendar });
  }

  handleSetDate(event) {
    console.log("in recipe detail handle set date");
    return event => {
      const recipeId = parseInt(this.props.match.params.id);
      const updatedRecipe = this.props.recipe[recipeId];
      console.log(event.target.value);
      updatedRecipe.due_date = event.target.value;
      this.props.updateRecipe({ recipe: updatedRecipe }).then( (recipe) => {
        this.props.history.push("/pantry_items");
      });
    }
  }

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

    return (
      <div className="wrapper">
        <div>
          <img src="http://res.cloudinary.com/miriam-lau/image/upload/v1498447618/side_nav_recipe_c4agb9.png" alt="side-bar-img-recipe" className="side-nav-img"/>
        </div>

        {this.state.openUpdate ?
          <RecipeUpdateContainer recipe={ recipe } /> :
          <div className="recipe-detail">
            <div className="recipe-detail-options">
              <section id="link-to-recipes">
                <Link className="recipe-link" to="/recipes">
                    Back to Recipes
                </Link>
                <Route exact path="/recipes"
                    component={ RecipeIndexContainer }
                />
              </section>

              <section id="recipe-detail-icon-wrapper">
                <div id="fa-calendar-wrapper">
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
                    <CalendarModalForm recipe={ recipe }/>
                   </Modal>
                </div>

                <div id="fa-pencil-wrapper">
                    <i className="fa fa-pencil fa-lg" aria-hidden="true"
                        onClick={ this.handleUpdate }>
                    </i>
                </div>

                <div id="fa-trash-can-wrapper">
                  <i className="material-icons trash-can-recipe"
                      style={ styles }
                      onClick={ this.handleDelete }>
                      delete_forever
                  </i>
                </div>
              </section>
            </div>

            <section className="recipe-detail-info">
              <h2>{recipe.name}</h2>
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
