import React, { Component } from 'react';
import axios from 'axios';
import PetForm from './components/Form/Form';
import paw from './paw.svg';
import './App.scss';

const getByProxy = (link, config = {}) => {
  return axios.get(`https://cors.io/?${link}`, config)
}

const PetGallery = ({ animalPhotos }) => {
  const listItems = animalPhotos.map((animalPhoto) => (
    <div key={animalPhoto} className="col-4 petTile">
      <img src={animalPhoto} alt="Animal"/>
    </div>
  ));

  return (
    <div className="row petGallery">
      {listItems}
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animalType: 'shibes',
      animalNumber: 0,
      animalPhotos: [],
    };
  }

  onUpdate = (val) => {
    this.setState({
      animalType: val.animalType,
      animalNumber: val.animalNumber,
      isPending: true,
    }, () => {
      this.getData();
    });
  };

  getRandomAnimalType = () => {
    const animals = ['shibes', 'cats', 'birds'];
    return animals[Math.floor(Math.random()*animals.length)];
  }

  getData = async () => {
    const animalType = this.state.animalType === 'random'
      ? this.getRandomAnimalType()
      : this.state.animalType;
    const link = `http://shibe.online/api/${animalType}?count=${this.state.animalNumber}&urls=true&httpsUrls=false`;

    const response = await getByProxy(link)

    this.setState({
      animalPhotos: response.data,
      isPending: false,
    })
  }

  render() {
    return (
      <div className="App">
        <div className="container">

          <div className="row">
            <div className="col-12">
              <img src={paw} className="App-paw" alt="logo" />
              <h1>REACTive Pets</h1>
              <p>
                Choose animal type and number of photos you want to display, then click Search!
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <PetForm onUpdate={this.onUpdate} isPending={this.state.isPending}/>
            </div>
          </div>
        </div>

        <div className="container">
          <PetGallery animalPhotos={this.state.animalPhotos} />
        </div>
      </div>
    );
  }
}

export default App;
