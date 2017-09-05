import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import UnitImporter from '../lib/UnitImporter';

export class AddUnitsForm extends Component {
  createUnits = (event) => {
    event.preventDefault();
    this.refs.btn.setAttribute("disabled", "disabled"); // disable button

    const friendlyUnits = UnitImporter.getUnitsFromText(this.friendlyUnits.value);
    const enemyUnits = UnitImporter.getUnitsFromText(this.enemyUnits.value);

    // TODO: If friendly or enemy units has errors key then dont add to state, reset
    // form and make an alert pop up.
    const combinedUnits = Object.assign(friendlyUnits, enemyUnits);
    if (Object.keys(combinedUnits).includes('errors')) {
      // return with errors
      let errorMsg = "Sorry! Looks like there were some issues with your submission!\n";
      combinedUnits.errors.forEach((err) => {
        errorMsg += ` - ${err.message} (Line: ${err.line}) `;
      });
      alert(errorMsg);
      this.refs.addUnitsForm.reset();
      this.refs.btn.setAttribute("disabled", null);
      return;
    }

    this.props.addFriendlyUnits(friendlyUnits);
    this.props.addEnemyUnits(enemyUnits);
    this.props.toggleForm(); // only execute if form submits properly.
  };

  render() {
    return (
      <div className="shadow">
        <ReactCSSTransitionGroup
          transitionName="add-units"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={false}
          transitionLeave={false}
          >
          <div className="add-units-dropdown">
            <form ref="addUnitsForm" action="" className="add-units-form" onSubmit={(e) => this.createUnits(e)}>
              <h2>SWSF Grid Tool</h2>
              <div className="field">
                <label>
                  Friendly Units
                  <small>Insert your units here, one unit per line.</small>
                </label>
                <textarea
                  ref={(text) => this.friendlyUnits = text}
                  name="friendy-units"
                  id=""
                  placeholder="e.g. A>N: ISD Death's Head"
                />
              </div>
              <div className="field">
                <label>
                  Enemy Units
                  <small>Insert your opponent's units here, one unit per line.</small>
                </label>
                <textarea
                  ref={(text) => this.enemyUnits = text}
                  name="enemy-units"
                  placeholder="e.g. A>N: ISD Death's Head"
                />
              </div>
              <div className="field form-buttons">
                <button ref="btn">Ready!</button>
              </div>
            </form>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default AddUnitsForm;
