import React, { Component} from 'react';
import './App.css';

function Zip(props) {
  return (<p>
      {props.zipCode} 
  </p>);
}

function CitySearchField(props) {
  return (<div>
    <label for = 'zip'>City: </label>
    <input type = 'text' id = 'zip' onKeyDown = {props.onKeyDown}></input>
    </div>);
}

class App extends Component {
  state = {
    result: []
  }
  
  handleKey(event){
    let result = [];
    let link = 'http://ctp-zip-api.herokuapp.com/city/' + event.target.value.toUpperCase();
    fetch(link)
    .then(res => res.json())
    .then((body) => {
      for(let i = 0; i < body.length; i++){
        result.push(<Zip zipCode = {body[i]} key = {i}/>);
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
        <CitySearchField onKeyDown={(ele) =>{
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
