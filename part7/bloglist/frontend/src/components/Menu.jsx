import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Menu = () => (
  // const padding = {
  //   paddingRight: 5,
  // };
  <AppBar position="static">
    <Toolbar>
      <Button color="inherit" component={Link} to="/">
        home
      </Button>
      <Button color="inherit" component={Link} to="/users">
        users
      </Button>
    </Toolbar>
  </AppBar>
  // <div>
  //   <Link style={padding} to="/">
  //     blogs
  //   </Link>
  //   <Link style={padding} to="/users">
  //     users
  //   </Link>
  // </div>
);

export default Menu;
