import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    popularList: []
  };

  componentDidMount() {
    const POPULAR = 'https://api.themoviedb.org/3/movie/popular';
    const KEY = '72488761d7135320d1cbbec467fac5a8';

    fetch(`${POPULAR}?api_key=${KEY}`)
      .then(response => response.json())
      .then(data => this.setState({ popularList: data.results.splice(0,10) })) 
  }
  
  render() {
    const { popularList } = this.state;
    
    return (
      <div className="App">
        <h1>Search any movie!</h1>
        <h2>Most Popular Movies of Today</h2>
        <div className="container">
          {popularList.map(movie => {
            return <div className="item" key={movie.id}>{movie.title}</div>
          })}
        </div>
      </div>
    )  
  }
};
  
export default App;
