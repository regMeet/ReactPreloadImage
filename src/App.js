import React, { Component } from 'react';
import ImagePreload from './ImagePreload';

let s3URL = 'http://www.wallpapereast.com/static/images/beautiful-ocean-wallpaper-hd-1.jpg';
let s3URL2 = 'http://www.wallpapereast.com/static/images/marvel-hd-wallpaper-high-quality-suu_75pPUJZ.jpg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ImagePreload src={s3URL} />

        <ImagePreload src={s3URL2}/>
      </div>
    );
  }
}

export default App;
