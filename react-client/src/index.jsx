import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import SimpleMenu from './components/menu.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 5,
      image: 'https://s3-us-west-1.amazonaws.com/mvp-pets/Pippy.JPG',
      description: 'Meet Pippy. Chief Happiness Officer at Khan Academy. Likes to make everyone smile when they come by his desk.',
      ratings: 13
    }

    this.handleNext = this.handleNext.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/dogs')
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
      fetch(`http://localhost:3000/api/dogs/${this.state.id}`)
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
  }

  render () {
    return (<div>
      <SimpleMenu />
      <h1>Let's Rate Pets!</h1>
      <div className='container'>
        {/* <div>Dogs | Cats | Others</div> */}
        <img className='image' src={this.state.image}></img>
        <div className='description'>{this.state.description}</div>
        <div className='ratings'>Rating: {this.state.ratings}/10</div>
        <button className='next' onClick={this.handleNext}>Next</button>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));