import React, { Component } from "react";
import logo from "./assets/logo.svg";
import "./App.css";
import Axios from 'axios'
import MovieItem from "./components/movieItem";
class App extends Component {
  constructor(props){
    super(props)
    this.state = {rows:[]}
  }
  componentDidMount(){
    this.search('Hello')
  }
  search  = (keyword) => {
    var dataArray = []
    var url = "https://api.themoviedb.org/3/search/movie?api_key=f5b1831414dc97da0f1eaa6087eaea29&query=" + keyword
    
    Axios.get(url).then(result=>{
      result.data.results.forEach(item => {
        item.poster_src = "https://image.tmdb.org/t/p/w185" + item.poster_path
        dataArray.push(item)
        console.log(dataArray)
      })
      this.setState({rows: dataArray})
    })
  }

  render() {
    return (
      <div className="App">
        <table className="Navbar">
          <tbody>
            <tr>
              <td>
                <img src={logo} alt="logo" width="50" />
              </td>
              <td>hello world</td>
            </tr>
          </tbody>
        </table>
        <input
          style={{
            fontSize: 24,
            display: "block",
            width: "100%",
            paddingLeft: 8,
          }}
          placeholder="Enter your movie name"
          onChange={(event) => { this.search(event.target.value)
          }}/>
        {this.state.rows.map(item=>(
        <MovieItem movie={item} />
        )
        ) }

      </div>
    );
  }
}
export default App;
