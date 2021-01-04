import React, { Component } from "react";
import "./App.css";
import Axios from "axios";
import MovieItem from "./components/movieItem";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] };
  }
  componentDidMount() {
    this.search("Hello");
  }
  search = (keyword) => {
    var dataArray = [];
    var url =
      "https://api.themoviedb.org/3/search/movie?api_key=f5b1831414dc97da0f1eaa6087eaea29&query=" +
      keyword;

    Axios.get(url).then((result) => {
      result.data.results.forEach((item) => {
        item.poster_src = "https://image.tmdb.org/t/p/w185" + item.poster_path;
        dataArray.push(item);
        console.log(dataArray);
      });
      this.setState({ rows: dataArray });
    });
  };

  render() {
    return (
      <div className="App">
        <table className = "Navbar">
          <tbody >
            <tr>
              <td>
                <div className="Navbar-text">
                  <h1 style={{ fontSize: 80 }}>Moive Searcher</h1>
                  <h3>the app will be able to search for movies via the OMDB API</h3>
                  <input
                    style={{
                      fontSize: 24,
                      display: "block",
                      width: "100%",
                      paddingLeft: 8,
                    }}
                    placeholder="Enter your movie name"
                    onChange={(event) => {
                      this.search(event.target.value);
                    }}
                  ></input>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {this.state.rows.map((item) => (
          <MovieItem movie={item} />
        ))}
      </div>
    );
  }
}
export default App;
