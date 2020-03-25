import React, { Component } from 'react';
import './App.css';
import debounce from 'lodash/debounce';

const API_URL = 'https://api.themoviedb.org/3/';
const IMG_URL = 'https://image.tmdb.org/t/p/w200/';
const KEY = '72488761d7135320d1cbbec467fac5a8';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popularList: [],
      popularListRender: false,
      input: '',
      selectedItemID: null,
      data: [],
    };

    this.debounced = debounce(this.getData, 1000);
  }

  handleInputChange = (event) => {
    const { value } = event.target;

    this.setState({ 
      input: value,
    });

    this.debounced(value);    
  }

  handleItemClick = (event) => {
    this.setState({ selectedItemID: parseInt(event.target.getAttribute('itemID')) });
  }

  getData = (value) => {
    fetch(`${API_URL}search/movie?api_key=${KEY}&query=${value}`)
      .then(response => response.json())
      .then(data => this.setState({
        data: data.results
      }))
  }

  // grabs top 10 popular movies list from themoviedb.org 
  componentDidMount() {
    fetch(`${API_URL}movie/popular?api_key=${KEY}`)
      .then(response => response.json()) 
      .then(data => this.setState({ 
        popularList: data.results.splice(0,10),
        popularListRender: true  
      })) 
  }
  
  render() {
    const { popularList, popularListRender, data, selectedItemID, input } = this.state;

    return (
      <div className="App">
        <div>Search any movie from TheMovieDB.org</div>
        {popularListRender && <div className="popular">Most Popular Movies of Today</div>}
        <div className="popularContainer">
          {popularList.map(movie => {
            return <div className="popularItem" 
                        key={movie.id}
                    >
                        {movie.title}
                    </div>
          })}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <input value={this.state.input} 
                placeholder="Enter movie title here to start" 
                onChange={this.handleInputChange} 
                autoFocus 
          />
        </form> 
        
        {input && data && <div>Results ({data.length}) <span className="smallGray"> click on each to view more info</span></div>}
        <div className="dataContainer">
          {data && data.map(movie => {
            if (selectedItemID === movie.id) {
              return (
                <div className="item"
                  id="selected"
                  key={movie.id}
                  itemID={movie.id}
                  onClick={this.handleItemClick}
                >
                  <div>{movie.title}</div>
                  {movie.poster_path && <img alt={movie.title} src={`${IMG_URL}${movie.poster_path}`} />}
                  <p><b>Release Date:</b> {movie.release_date}</p>
                  <p><b>Overview:</b> {movie.overview}</p>
                </div> 
              )
            }
            return (
              <div className="item" 
                        key={movie.id}
                        itemID={movie.id}
                        onClick={this.handleItemClick}
                    >
                        {movie.title}
              </div>
            );
          })}
        </div>     
      </div>
    )  
  }
};
  
export default App;
