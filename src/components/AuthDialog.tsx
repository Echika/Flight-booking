import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Tabs, Tab
} from '@mui/material';
import type { AuthDialogProps } from '../types'


const AuthDialog: React.FC<AuthDialogProps> = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState(0); // 0 for Login, 1 for Sign Up

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAuth = (type: 'login' | 'signup') => {
    // Mock authentication logic
    console.log(`${type} attempted.`);
    alert(`Mock ${type} successful!`);
    onClose();
  };

  const LoginContent = (
    <>
      <TextField label="Email" fullWidth margin="normal" required />
      <TextField label="Password" type="password" fullWidth margin="normal" required sx={{ mb: 2 }} />
      <Button variant="contained" color="primary" fullWidth onClick={() => handleAuth('login')}>
        Log In
      </Button>
    </>
  );

  const SignUpContent = (
    <>
      <TextField label="Full Name" fullWidth margin="normal" required />
      <TextField label="Email" fullWidth margin="normal" required />
      <TextField label="Password" type="password" fullWidth margin="normal" required />
      <Button variant="contained" color="secondary" fullWidth onClick={() => handleAuth('signup')} sx={{ mt: 2 }}>
        Sign Up
      </Button>
    </>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Log In" />
          <Tab label="Sign Up" />
        </Tabs>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ p: 1 }}>
          {tabValue === 0 && LoginContent}
          {tabValue === 1 && SignUpContent}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthDialog;