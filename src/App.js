import React, { Component } from 'react';
import './App.css';
const URL = 'https://api.themoviedb.org/3/';
const KEY = '72488761d7135320d1cbbec467fac5a8';

class App extends Component {
  state = {
    popularList: [],
    input: '',
    selectedItemID: null,
    data: []
  };

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({ input: value });

    fetch(`${URL}search/movie?api_key=${KEY}&query=${value}`)
      .then(response => response.json())
      .then(data => this.setState({ data: data.results }))
  }

  // grabs top 10 popular movies list from themoviedb.org 
  componentDidMount() {
    fetch(`${URL}movie/popular?api_key=${KEY}`)
      .then(response => response.json()) 
      .then(data => this.setState({ popularList: data.results.splice(0,10) })) 
  }
  
  render() {
    const { popularList, data, input } = this.state;

    return (
      <div className="App">
        <h1>Search any movie!</h1>
        <h2>Most Popular Movies of Today</h2>
        <div className="container">
          {popularList.map(movie => {
            return <div className="item" key={movie.id}>{movie.title}</div>
          })}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <input autoFocus value={this.state.input} placeholder="Enter Movie Title" onChange={this.handleChange} />
        </form> 
        {input && <h3>Results:</h3>}
        <div className="container">
          {data && data.map(movie => {
            return <div className="item" key={movie.id}>{movie.title}</div>
          })}
        </div>     
      </div>
    )  
  }
};
  
export default App;
