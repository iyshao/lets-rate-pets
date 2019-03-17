import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className='menu'>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
         <i className="fas fa-bars"></i>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Dogs</MenuItem>
          <MenuItem onClick={this.handleClose}>Cats</MenuItem>
          <MenuItem onClick={this.handleClose}>Others</MenuItem>
          <MenuItem onClick={this.handleClose}>Post your pet!</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default SimpleMenu;