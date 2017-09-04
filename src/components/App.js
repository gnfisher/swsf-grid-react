import React, { Component } from 'react';
import AddUnitsForm from './AddUnitsForm';
import Board from './Board';

class App extends Component {
  constructor() {
    super();

    this.state = {
      showAddUnitsForm: true,
      friendlyUnits: {},
      enemyUnits: {}
    };
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
        <Board />
      </div>
    );
  }
}

export default App;
