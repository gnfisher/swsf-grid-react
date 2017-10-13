import React, { Component } from 'react';
import AddUnitsForm from './AddUnitsForm';
import Board from './Board';
import { gameClient } from '../lib/Game';
import { canMove } from '../lib/moves/Moves';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddUnitsForm: true,
      friendlyUnits: {},
      enemyUnits: {},
      selectedUnit: null
    };

    gameClient.addListener('selectUnit', this.selectUnit);
    gameClient.addListener('moveSelectedUnit', this.moveSelectedUnit);
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

    let friendlyUnits = {...this.state.friendlyUnits};
    friendlyUnits[id] = Object.assign(friendlyUnits[id], {selected: true});
    this.setState({friendlyUnits});
  };

  moveSelectedUnit = (space) => {
    if (this.state.selectedUnit === null) {
      return;
    }

    const unit = this.state.friendlyUnits[this.state.selectedUnit];
    const allUnits = Object.assign({}, this.state.friendlyUnits, this.state.enemyUnits);
    let newState;
    if (newState = canMove(space, unit, allUnits)) {
      let friendlyUnits = {...this.state.friendlyUnits};
      friendlyUnits[this.state.selectedUnit] = Object.assign(newState, {selected: false});
      this.setState({friendlyUnits});
      this.setState({selectedUnit: null});
    }
  };

  clearSelectedUnit = () => {
    if (this.state.selectedUnit !== null) {
      let friendlyUnits = {...this.state.friendlyUnits};
      let selectedUnit = friendlyUnits[this.state.selectedUnit];
      friendlyUnits[this.state.selectedUnit] = Object.assign(selectedUnit, {selected: false});
      this.setState({friendlyUnits});
      this.setState({selectedUnit: null});
    }
  }

  renderShowAddUnitsForm = () => {
    return (
      <AddUnitsForm
        toggleForm={this.toggleAddUnitsForm}
        addFriendlyUnits={this.addFriendlyUnits}
        addEnemyUnits={this.addEnemyUnits}
      />
    )
  };

  render() {
    return (
      <div className="App">
        {this.state.showAddUnitsForm && this.renderShowAddUnitsForm()}
        <Board friendlyUnits={this.state.friendlyUnits} enemyUnits={this.state.enemyUnits} />
      </div>
    );
  }
}

export default App;
