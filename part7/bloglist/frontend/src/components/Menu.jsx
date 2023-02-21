import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const Menu = ({ user, handleLogout }) => (
  <AppBar position="static">
    <Toolbar>
      <Button color="inherit" component={Link} to="/">
        home
      </Button>
      <Button color="inherit" component={Link} to="/users">
        users
      </Button>
      <Button color="inherit" onClick={handleLogout}>
        log out
      </Button>
      <Box component="em" color="inherit" sx={{ marginLeft: 'auto' }}>
        {`Current User: ${user.name}`}
      </Box>
    </Toolbar>
  </AppBar>
);

export default Menu;
