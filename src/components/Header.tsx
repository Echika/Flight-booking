// components/Header.tsx

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Flight } from '@mui/icons-material';
import AuthDialog from './AuthDialog'; // Import the new component

const Header: React.FC = () => {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Flight sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FlightFinder Pro
          </Typography>
          {/* ⭐️ Make the button open the dialog */}
          <Button color="inherit" onClick={() => setAuthOpen(true)}>
            Login / Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      {/* ⭐️ Render the dialog */}
      <AuthDialog 
        open={authOpen} 
        onClose={() => setAuthOpen(false)} 
      />
    </>
  );
};

export default Header;