import React from 'react';

class PostPet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: 'dogs',
      image: '',
      description: '',
      posted: false
    }
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    var value = event.target.value;
    var name = event.target.name;
    this.setState({[name]: value});
  }

  handleSubmit() {
    fetch('http://localhost:3000/api/postPet', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.setState({posted: true});
        } else {
          alert('Oh no! That didn\'t work. Please try again later.');
        }
      })
  }

  render() {
    return (
      <div className='container'>
        Type of pet:
        <select name='category' value={this.state.category} onChange={this.handleInputChange}>
          <option value='dogs'>Dog</option>
          <option value='cats'>Cat</option>
          <option value='others'>Other</option>
        </select>
        Picture link:
        <input name='image' value={this.state.image} onChange={this.handleInputChange}/>
        Description of your pet:
        <input name='description' value={this.state.description} onChange={this.handleInputChange} placeholder='Meet...'/>
        <button onClick={this.handleSubmit}>Submit</button>
        {this.state.posted && <div className='alert'>Thank you for posting your pet!</div>}
      </div>
    )
  }
}

export default PostPet;