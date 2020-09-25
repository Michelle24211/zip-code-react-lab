import React, { Component} from 'react';
import './App.css';

function City(props) {
  return (<div>
    <table>
      <thead>
        <h5>{props.city + ", " + props.sstate}</h5>
      </thead>
      <tbody>
        <ul>
          <li><tr>State: {props.sstate}</tr></li>
          <li><tr>Location: {props.location}</tr></li>
          <li><tr>Population (estimated): {props.population}</tr></li>
          <li><tr>Total Wages: {props.totalWages}</tr></li>
        </ul>
      </tbody>
    </table>
  </div>);
}

function ZipSearchField(props) {
  return (<div>
    <label for = 'zip'>Zip Code: </label>
    <input type = 'text' id = 'zip' onKeyDown = {props.onKeyDown}></input>
    </div>);
}

class App extends Component {
  state = {
    result: []
  }
  
  handleKey(event){
    let result = [];
    let link = 'http://ctp-zip-api.herokuapp.com/zip/' + event.target.value;
    fetch(link)
    .then(res => res.json())
    .then((body) => {
      for(let i = 0; i < body.length; i++){
        result.push(<City city = {body[i]["City"]} 
        sstate = {body[i]["State"]} 
        location = {body[i]["LocationText"]} 
        population = {body[i]["EstimatedPopulation"]} 
        totalWages = {body[i]["TotalWages"]} 
        key = {i}/>);
      }
        this.setState({result: result});
    })
    .catch(error => {
      result.push(<p>No Result</p>);
      this.setState({result: result});
    });

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField onKeyDown={(ele) =>{
      if(ele.keyCode === 13)
          this.handleKey(ele);
      }}/>
        <div>
          {this.state.result}
        </div>
      </div>
    );
  }
}

export default App;
