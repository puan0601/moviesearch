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
    // limits API call to happen only after input stops for 500ms
    this.debounced = debounce(this.fetchData, 500);
  }
  // when a user types in the search input
  handleInputChange = (event) => {
    const { value } = event.target;

    this.setState({ 
      input: value,
    });
    // makes the fetchData call with debouncing
    this.debounced(value);    
  }
  // when a user clicks on an item
  handleItemClick = (event) => {
    this.setState({ selectedItemID: parseInt(event.target.getAttribute('itemID')) });
  }

  // queries movie search api based on input value
  fetchData = (value) => {
    fetch(`${API_URL}search/movie?api_key=${KEY}&query=${value}`)
      .then(response => response.json())
      .then(data => this.setState({
        data: data.results
      }))
  }

  // queries popular list of movies and takes 10 top 
  fetchPopularList = () => {
    fetch(`${API_URL}movie/popular?api_key=${KEY}`)
      .then(response => response.json())
      .then(data => this.setState({
        popularList: data.results.splice(0, 10),
        popularListRender: true
      })) 
  }

  // grabs top 10 popular movies list from themoviedb.org 
  componentDidMount() {
    this.fetchPopularList();
  }
  
  render() {
    const { popularList, popularListRender, data, selectedItemID, input } = this.state;

    return (
      <div className="App">
        <div>Search any movie from TheMovieDB.org</div>
        
        {popularListRender && <div className="popular">Most Popular Movies of Today</div>}
        <div className="popularContainer">
          {popularList.map(movie => {
            const { id, title } = movie
            return <div className="popularItem" 
                        key={id}
                    >
                        {title}
                    </div>
          })}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <input value={this.state.input} 
                type="search"
                placeholder="Enter movie title here" 
                onChange={this.handleInputChange} 
                autoFocus 
          />
        </form> 
        
        {input && data && <div>Results ({data.length}) <span className="smallGray"> 
          click on each result to view more info</span></div>}
          
        <div className="dataContainer">
          {data && data.map(movie => {
            const { title, poster_path, release_date, overview, vote_count } = movie;
            if (selectedItemID === movie.id) {
              return (
                <div className="item"
                  id="selected"
                  key={movie.id}
                  itemID={movie.id}
                  onClick={this.handleItemClick}
                >
                  <div><b>{title}</b></div>
                  {poster_path && <img alt={title} src={`${IMG_URL}${poster_path}`} />}
                  <div><b>Release Date:</b> {release_date}</div>
                  <div><b>Overview:</b> {overview}</div>
                  <div><b>Vote Count:</b> {vote_count}</div>
                </div> 
              )
            }

            return (
              <div className="item" 
                        key={movie.id}
                        itemID={movie.id}
                        onClick={this.handleItemClick}
              >
                {title}
              </div>
            );
          })}
        </div>     
      </div>
    )  
  }
};
  
export default App;
