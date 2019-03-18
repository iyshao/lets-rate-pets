import React from 'react';

class PostPet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
      {/* <form> */}
        Type of pet:
        <select>
          <option value='dogs'>Dog</option>
          <option value='cats'>Cat</option>
          <option value='others'>Other</option>
        </select>
        Picture link:
        <input />
        Description of your pet:
        <input />
        <button>Submit</button>
      {/* </form> */}
    </div>
    )
  }
}

export default PostPet;