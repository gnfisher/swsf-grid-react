import React, { Component } from 'react';
import AddUnitsForm from './AddUnitsForm';

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
    console.log(newState);
    this.setState({showAddUnitsForm: !this.state.showAddUnitsForm});
  }

  addFriendlyUnits = (newFriendlyUnits) => {
    let friendlyUnits = {...this.state.friendlyUnits};
    friendlyUnits = Object.assign(newFriendlyUnits);
    this.setState({friendlyUnits});
  }

  addEnemyUnits = (newEnemyUnits) => {
    let enemyUnits = {...this.state.enemyUnits};
    enemyUnits = Object.assign(newEnemyUnits);
    this.setState({enemyUnits});
  }

  render() {
    return (
      <div className="App">
        {this.state.showAddUnitsForm && 
          <AddUnitsForm 
            toggleForm={this.toggleAddUnitsForm}
            addFriendlyUnits={this.addFriendlyUnits}
            addEnemyUnits={this.addEnemyUnits}
          />
        }
      </div>
    );
  }
}

export default App;
