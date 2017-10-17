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
    return keys.find(unitId => unitId === id);
  };

  selectUnit = (id) => {
    if (this.state.selectedUnit !== null) {
      this.clearSelectedUnit();
    }
    this.setState({selectedUnit: id});

    if (this.isEnemyUnit(id)) {
      let enemyUnits = {...this.state.enemyUnits};
      enemyUnits[id] = Object.assign(enemyUnits[id], {selected: true});
      this.setState({enemyUnits});
    } else {
      let friendlyUnits = {...this.state.friendlyUnits};
      friendlyUnits[id] = Object.assign(friendlyUnits[id], {selected: true});
      this.setState({friendlyUnits});
    }
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

  clearSelectedUnit = () => {
    if (this.state.selectedUnit !== null) {
      if (this.isEnemyUnit(this.state.selectedUnit)) {
        let enemyUnits = {...this.state.enemyUnits};
        let selectedUnit = enemyUnits[this.state.selectedUnit];
        enemyUnits[this.state.selectedUnit] = Object.assign(selectedUnit, {selected: false});
        this.setState({enemyUnits});
      } else {
        let friendlyUnits = {...this.state.friendlyUnits};
        let selectedUnit = friendlyUnits[this.state.selectedUnit];
        friendlyUnits[this.state.selectedUnit] = Object.assign(selectedUnit, {selected: false});
        this.setState({friendlyUnits});
      }

      this.setState({selectedUnit: null});
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
