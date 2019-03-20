import React from 'react';

class RenderPet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var rate = (
      <div>
        Rate this pet:
        <input type='number' value={this.props.newRating} onKeyPress={this.props.handleEnter} onChange={this.props.handleRating}/>
        <button onClick={this.props.handleRate}>Submit rating</button>
      </div>
    );
    var rating = (<div className='ratings'>Overall rating: {this.props.ratings}/10</div>);

    return (
      <div className='container'>
        <img className='image' src={this.props.image}></img>
        <div className='description'>{this.props.description}</div>
        {this.props.showRating ? rating : rate}
        <button onClick={this.props.handleNext}>Next</button>
      </div>
    )
  }
}

export default RenderPet;