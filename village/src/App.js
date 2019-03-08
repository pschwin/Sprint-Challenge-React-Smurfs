import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

//new imports
import axios from 'axios';
import {Route, Link, NavLink} from 'react-router-dom';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      error: 'RIP'
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount(){
    axios
      .get("http://localhost:3333/smurfs")
      .then(res =>{
        console.log(res);
        this.setState({smurfs: res.data});
      })
      .catch(err => {
        this.setState({error: err});
      })

  }


  addSmurf = (e,aSmurf) =>{
    e.preventDefault();
    axios
      .post("http://localhost:3333/smurfs", aSmurf)
      .then(res=>{
        this.setState({
          smurfs: res.data
        });
        //this.props.history.push('smurf-list')
      })
      .catch(err =>{
        console.log(err);
      })
  }
  render() {
    return (
      <div className="App">
        
        <div className="navigation">
        <NavLink className="nav-link" exact to="/" >Home</NavLink>
        <NavLink className="nav-link" to="smurf-form" >Add a Smurf to the Village</NavLink>
        </div>

        <Route 
        exact path='/' 
        render={() => <Smurfs smurfs={this.state.smurfs} />}
        />
        <Route 
        path='/smurf-form'
        render={() => <SmurfForm addSmurf={this.addSmurf}/>}
        />

        {/* <SmurfForm addSmurf={this.addSmurf}/>
        <Smurfs smurfs={this.state.smurfs} /> */}
      </div>
    );
  }
}

export default App;
