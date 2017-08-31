import React, { Component } from 'react';
import AddUnitsForm from './AddUnitsForm';

class App extends Component {
  constructor() {
    super();
    
    this.state = {
      showAddUnitsForm: true
    };
  }

  toggleAddUnitsForm = () => {
    const newState = !this.state.showAddUnitsForm;
    console.log(newState);
    this.setState({showAddUnitsForm: !this.state.showAddUnitsForm});
  }

  render() {
    return (
      <div className="App">
        {this.state.showAddUnitsForm && <AddUnitsForm toggleForm={this.toggleAddUnitsForm} />}
      </div>
    );
  }
}

export default App;
