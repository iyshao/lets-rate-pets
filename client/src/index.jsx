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
      ratings: 13,
      newRating: 0,
      showRating: false,
      alert: false,
      alertMsg: ''
    }

    this.updateData = this.updateData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleOpenMenu = this.handleOpenMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleDogs = this.handleDogs.bind(this);
    this.handleCats = this.handleCats.bind(this);
    this.handleOthers = this.handleOthers.bind(this);
    this.handlePostPet = this.handlePostPet.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handlerEnterKey = this.handlerEnterKey.bind(this);
    this.handleRate = this.handleRate.bind(this);
  }

  updateData(data) {
    if (data.ratings.length) {
      var reducer = (accumulator, currentValue) => accumulator + currentValue;
      var ratingTotal = data.ratings.reduce(reducer);
      var rating = Math.round(ratingTotal / data.ratings.length);
    } else {
      rating = 'none';
    }

    this.setState({
      id: data.id,
      image: data.image,
      description: data.description,
      ratings: rating,
      newRating: 0,
      showRating: false,
      alert: false
    });
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/${this.state.type}`)
      .then(response => response.json())
      .then(data => {
        this.updateData(data);
      });
  }

  handleNext() {
    fetch(`http://localhost:3000/api/${this.state.type}/${this.state.id}`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          this.updateData(data);
        } else {
          this.componentDidMount();
        }
      });
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
      ratings: null,
      alert: false
    })
    this.handleCloseMenu();
  }

  handleCats() {
    this.setState({
      posting: false,
      type: 'cats',
      id: 1,
      image: 'https://s3-us-west-1.amazonaws.com/mvp-pets/cat.jpg',
      description: 'Ew. It\'s a cat. If you insist on looking at more cats, go ahead I guess...',
      ratings: null,
      alert: false
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
      ratings: null,
      alert: false
    })
    this.handleCloseMenu();
  }

  handlePostPet() {
    this.setState({posting: true});
    this.handleCloseMenu();
  }

  handleRating(event) {
    this.setState({newRating: event.target.value});
  }

  handlerEnterKey(event) {
    if (event.key === 'Enter') {
      this.handleRate();
    }
  }

  handleRate() {
    if (!Number.isInteger(Number(this.state.newRating))) {
      this.setState({alert: true, alertMsg: 'Rating must be an integer!'});
    } else {
      if (this.state.type === 'dogs' && (this.state.newRating > 15 || this.state.newRating < 11)) {
        this.setState({alert: true, alertMsg: 'Dogs must be rated between 11 and 15'});
      } else if (this.state.type === 'cats' && (this.state.newRating >= 0 || this.state.newRating < -10)) {
        this.setState({alert: true, alertMsg: 'Cats can only receive negative ratings (down to -10). Because they\'re cats...'});
      } else if (this.state.type === 'others' && (this.state.newRating > 10 || this.state.newRating < 0)) {
        this.setState({alert: true, alertMsg: 'Pets must be rated between 0 and 10'});
      } else {
        fetch(`http://localhost:3000/api/pets/${this.state.id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({newRating: this.state.newRating})
        })
          .then(res => res.json())
          .then((data) => {
            if (data) {
              this.updateData(data);
              this.setState({showRating: true});
            }
          })
      }
    }
  }


  render () {
    return (<div>
      <SimpleMenu renderDogs={this.handleDogs} renderCats={this.handleCats} renderOthers={this.handleOthers} postPet={this.handlePostPet} anchorEl={this.state} openMenu={this.handleOpenMenu} closeMenu={this.handleCloseMenu}/>
      <h1>Let's Rate Pets!</h1>
      {this.state.posting && <PostPet />}
      {!this.state.posting && <RenderPet image={this.state.image} description={this.state.description} ratings={this.state.ratings} newRating={this.state.newRating} showRating={this.state.showRating} handleNext={this.handleNext} handleRating={this.handleRating} handleEnter={this.handlerEnterKey} handleRate={this.handleRate}/>}
      {this.state.alert && <div className='alert'>{this.state.alertMsg}</div>}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));