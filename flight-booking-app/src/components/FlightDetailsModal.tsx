// components/FlightDetailsDialog.tsx

import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Chip, Divider, Grid
} from '@mui/material';
import type { FlightResult } from '../types';

interface FlightDetailsDialogProps {
  selectedFlight: FlightResult | null;
  onClose: () => void;
  formatPrice: (price: number, currency: string) => string;
  onBookNow: (flight: FlightResult) => void; 
}

const FlightDetailsDialog: React.FC<FlightDetailsDialogProps> = ({
  selectedFlight,
  onClose,
  formatPrice,
  onBookNow, // Destructure the new prop
}) => {
  if (!selectedFlight) {
    return null;
  }

    const handleBookClick = () => {
    if (selectedFlight) {
      onBookNow(selectedFlight);
    }
  };

  return (
    <Dialog
      open={selectedFlight !== null}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Flight Details</Typography>
          <Chip label={selectedFlight.airlineCode} color="primary" />
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          {selectedFlight.airline}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Flight {selectedFlight.segments[0].flightNumber} • {selectedFlight.segments[0].aircraft}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {selectedFlight.segments.map((segment, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid size={{xs: 6}}>
                <Typography variant="caption" color="text.secondary">
                  DEPARTURE
                </Typography>
                <Typography variant="h6">{segment.departure.time}</Typography>
                <Typography variant="body2">{segment.departure.airport}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {segment.departure.date}
                </Typography>
              </Grid>
              <Grid size={{xs: 6}}>
                <Typography variant="caption" color="text.secondary">
                  ARRIVAL
                </Typography>
                <Typography variant="h6">{segment.arrival.time}</Typography>
                <Typography variant="body2">{segment.arrival.airport}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {segment.arrival.date}
                </Typography>
              </Grid>
            </Grid>

            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Duration: {segment.duration} • Class: {selectedFlight.cabinClass}
              </Typography>
            </Box>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" color="primary" gutterBottom>
          Total: {formatPrice(selectedFlight.price, selectedFlight.currency)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price per person • Includes taxes and fees
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" color="primary"  onClick={handleBookClick}>
          Book Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FlightDetailsDialog;