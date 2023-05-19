import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {

  pageSize = 12;
  country = "in";
  api = process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }


  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}

            onLoaderFinished={() => this.setProgress(0)}
          />
          <Routes>
            <Route exact path='/general' element={<News setProgress={this.setProgress} apiKey={this.api} key="general" pageSize={this.pageSize} country={this.country} category='general' />}></Route>
            <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.api} key="business" pageSize={this.pageSize} country={this.country} category='business' />}></Route>
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.api} key="entertainment" pageSize={this.pageSize} country={this.country} category='entertainment' />}></Route>
            <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.api} key="health" pageSize={this.pageSize} country={this.country} category='health' />}></Route>
            <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.api} key="sports" pageSize={this.pageSize} country={this.country} category='sports' />}></Route>
            <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.api} key="science" pageSize={this.pageSize} country={this.country} category='science' />}></Route>
            <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.api} key="technology" pageSize={this.pageSize} country={this.country} category='technology' />}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}







