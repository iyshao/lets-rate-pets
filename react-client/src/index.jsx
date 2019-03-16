import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      image: 'https://s3-us-west-1.amazonaws.com/mvp-pets/Pippy.JPG',
      description: 'Meet Pippy. Chief Happiness Officer at Khan Academy. Likes to make everyone smile when they come by his desk.',
      ratings: 13
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/dogs')
      .then(response => response.json())
      .then(data => {
        var reducer = (accumulator, currentValue) => accumulator + currentValue;
        var ratingTotal = data.ratings.reduce(reducer);
        var rating = Math.round(ratingTotal / data.ratings.length);

        this.setState({
        image: data.image,
        description: data.description,
        ratings: rating
      })
      });
  }

  render () {
    return (<div>
      <h1>Let's Rate Pets!</h1>
      <div className='container'>
        <img className='image' src={this.state.image}></img>
        <div className='description'>{this.state.description}</div>
        <div className='ratings'>Rating: {this.state.ratings}/10</div>
      </div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));