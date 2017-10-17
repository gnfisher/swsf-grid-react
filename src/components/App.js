import React, { Component } from 'react';
import AddUnitsForm from './AddUnitsForm';
import Board from './Board';
import Hud from './Hud';
import { gameClient } from '../lib/Game';
import { canMove } from '../lib/moves/Moves';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddUnitsForm: true,
      friendlyUnits: {},
      enemyUnits: {},
      selectedUnit: null
    };

    gameClient.addListener('moveSelectedUnit', this.moveSelectedUnit);
    gameClient.addListener('selectUnit', this.selectUnit);
  }

  toggleAddUnitsForm = () => {
    const newState = !this.state.showAddUnitsForm;
    this.setState({showAddUnitsForm: !this.state.showAddUnitsForm});
  };

  addFriendlyUnits = (newFriendlyUnits) => {
    let friendlyUnits = {...this.state.friendlyUnits};
    friendlyUnits = Object.assign(newFriendlyUnits);
    this.setState({friendlyUnits});
  };

  addEnemyUnits = (newEnemyUnits) => {
    let enemyUnits = {...this.state.enemyUnits};
    enemyUnits = Object.assign(newEnemyUnits);
    this.setState({enemyUnits});
  };

  isEnemyUnit = (id) => {
    const keys = Object.keys(this.state.enemyUnits);
    return keys.find(unitId => this.enemyUnits[unitId] === id);
  };

  selectUnit = (id) => {
    if (this.isEnemyUnit(id)) {
      return;
    }

    if (this.state.selectedUnit !== null) {
      this.clearSelectedUnit();
    }
    this.setState({selectedUnit: id});

    console.log('here');
    let friendlyUnits = {...this.state.friendlyUnits};
    friendlyUnits[id] = Object.assign(friendlyUnits[id], {selected: true});
    this.setState({friendlyUnits});
  };

  moveSelectedUnit = (unitId, space) => {
    const { friendlyUnits, enemyUnits } = this.state;
    const unit = friendlyUnits[unitId];
    const allUnits = Object.assign({}, friendlyUnits, enemyUnits);

    let newUnitState;
    if (newUnitState = canMove(space, unit, allUnits)) {
      const newFriendlyUnits = {...friendlyUnits};
      newFriendlyUnits[unitId] = newUnitState;
      this.setState({friendlyUnits: newFriendlyUnits});
    }
  };

  renderShowAddUnitsForm = () => {
    return (
      <AddUnitsForm
        toggleForm={this.toggleAddUnitsForm}
        addFriendlyUnits={this.addFriendlyUnits}
        addEnemyUnits={this.addEnemyUnits}
      />
    )
  };

  renderHud = () => {
    // Get full object representation of the unit
    // Signal if its enemy of friendly
    const { selectedUnit, friendlyUnits, enemyUnits } = this.state;
    const allUnits = Object.assign({}, friendlyUnits, enemyUnits);
    const unit = Object.assign({},
      allUnits[selectedUnit],
      {enemy: this.isEnemyUnit(selectedUnit)}
    );

    return (
      <Hud selectedUnit={unit} />
    );
  };

  render() {
    return (
      <div className="App">
        {this.state.selectedUnit !== null && this.renderHud()}
        {this.state.showAddUnitsForm && this.renderShowAddUnitsForm()}
        <Board friendlyUnits={this.state.friendlyUnits} enemyUnits={this.state.enemyUnits} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
