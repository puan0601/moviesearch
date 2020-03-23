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
      .then(data => this.setState({ popularList: data.results })) 
  }
  
  render() {
    const { popularList } = this.state;
    
    return (
      <div className="App">
        <ol>
          {popularList.map(movie => {
            return <li key={movie.id}>{movie.title}</li>
          })}
        </ol>
      </div>
    )  
  }
};
  
export default App;
