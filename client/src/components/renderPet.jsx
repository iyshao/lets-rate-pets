import React from 'react';

class RenderPet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <img className='image' src={this.props.image}></img>
        <div className='description'>{this.props.description}</div>
        {this.props.ratings &&
          <div className='ratings'>Rating: {this.props.ratings}/10</div>}
        <button onClick={this.props.handleNext}>Next</button>
      </div>
    )
  }
}

export default RenderPet;