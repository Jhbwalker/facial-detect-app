import React, { Component } from 'react';
import Particles from 'react-particles-js'
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Imagelinkform from './Components/Imagelinkform/Imagelinkform';
import FaceRecon from './Components/FaceRecon/FaceRecon'
import Rank from './Components/Rank/Rank';
import './App.css';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey:'6f927571bf9d4a3b88e96371b1842cc3'
});

const particlesOptions = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 900
            }
        }
    }
};

class App extends Component {
    constructor(){
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},

        }
    }

    calcFaceLocation =(data)=>{
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
        const width = Number(image.width);
        const height = Number(image.height);
        console.log(width, height); 
    };
    onInputChange = (event) =>{
        console.log(event.target.value);
        this.setState({input: event.target.value});
    };

    onButtonSubmit = () =>{
        this.setState({imageUrl: this.state.input});
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input).then( response => this.calcFaceLocation(response)
            .catch(err => console.log(err))
        );
    };
  render() {
    return (
      <div className="App">
          <Particles className='particles'
              params={particlesOptions}
          />
       <Navigation />
          <Logo />
          <Rank />
          <Imagelinkform onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <FaceRecon imageUrl ={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
