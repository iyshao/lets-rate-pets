import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { anchorEl } = this.props.anchorEl;

    return (
      <div className='menu'>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.props.openMenu}
        >
         <i className="fas fa-bars fa-3x"></i>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.props.closeMenu}
        >
          <MenuItem onClick={this.props.renderDogs}>Dogs</MenuItem>
          <MenuItem onClick={this.props.renderCats}>Cats</MenuItem>
          <MenuItem onClick={this.props.renderOthers}>Others</MenuItem>
          <MenuItem onClick={this.props.postPet}>Post your pet!</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default SimpleMenu;