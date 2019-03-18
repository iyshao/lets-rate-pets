import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SimpleMenu from './components/menu.jsx';
import RenderPet from './components/renderPet.jsx';
import PostPet from './components/postPet.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      posting: false,
      type: 'dogs',
      id: 5,
      image: 'https://s3-us-west-1.amazonaws.com/mvp-pets/Pippy.JPG',
      description: 'Meet Pippy. Chief Happiness Officer at Khan Academy. Likes to make everyone smile when they come by his desk.',
      ratings: 13
    }

    this.handleNext = this.handleNext.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleDogs = this.handleDogs.bind(this);
    this.handleCats = this.handleCats.bind(this);
    this.handleOthers = this.handleOthers.bind(this);
    this.handlePostPet = this.handlePostPet.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/${this.state.type}`)
      .then(response => response.json())
      .then(data => {
        var reducer = (accumulator, currentValue) => accumulator + currentValue;
        var ratingTotal = data.ratings.reduce(reducer);
        var rating = Math.round(ratingTotal / data.ratings.length);

        this.setState({
          id: data.id,
          image: data.image,
          description: data.description,
          ratings: rating
        })
      });
  }

  handleNext() {
    if (this.state.id === 1) {
      this.componentDidMount();
    } else {
      fetch(`http://localhost:3000/api/${this.state.type}/${this.state.id}`)
        .then(response => response.json())
        .then(data => {
          var reducer = (accumulator, currentValue) => accumulator + currentValue;
          var ratingTotal = data.ratings.reduce(reducer);
          var rating = Math.round(ratingTotal / data.ratings.length);
  
          this.setState({
            id: data.id,
            image: data.image,
            description: data.description,
            ratings: rating
          })
        })
        .catch(() => {
          alert('There are no pets posted yet. Why don\'t you post one of your own?');
        })
    }
  }

  handleOpenMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu() {
    this.setState({ anchorEl: null });
  };

  handleDogs() {
    this.setState({
      posting: false,
      type: 'dogs',
      id: 1,
      image: 'https://s3-us-west-1.amazonaws.com/mvp-pets/Pippy.JPG',
      description: 'Awwww. Click \'Next\' to rate cute doggos!',
      ratings: null
    })
    this.handleCloseMenu();
  }

  handleCats() {
    this.setState({
      posting: false,
      type: 'cats',
      id: 1,
      image: 'https://s3-us-west-1.amazonaws.com/mvp-pets/cat.jpg',
      description: 'Ew. It\'s a cat. If you insist on looking at more cats, go ahead  I guess...',
      ratings: null
    })
    this.handleCloseMenu();
  }

  handleOthers() {
    this.setState({
      posting: false,
      type: 'others',
      id: 1,
      image: 'https://s3-us-west-1.amazonaws.com/mvp-pets/hedgehog.jpg',
      description: 'Click \'Next\' to rate all kinds of pets!',
      ratings: null
    })
    this.handleCloseMenu();
  }

  handlePostPet() {
    this.setState({posting: true});
    this.handleCloseMenu();
  }

  render () {
    return (<div>
      <SimpleMenu renderDogs={this.handleDogs} renderCats={this.handleCats} renderOthers={this.handleOthers} postPet={this.handlePostPet} anchorEl={this.state} openMenu={this.handleOpenMenu} closeMenu={this.handleCloseMenu}/>
      <h1>Let's Rate Pets!</h1>
      {this.state.posting && <PostPet />}
      {!this.state.posting && <RenderPet image={this.state.image} description={this.state.description} ratings={this.state.ratings} handleNext={this.handleNext}/>}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));