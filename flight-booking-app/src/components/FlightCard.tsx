// components/FlightCard.tsx

import React from 'react';
import {
  Card, CardContent, Grid, Typography, Box, Chip, IconButton, Button, 
} from '@mui/material';
import { Flight, FavoriteBorder, Favorite } from '@mui/icons-material';
import type { FlightResult } from '../types';

interface FlightCardProps {
  flight: FlightResult;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
  setSelectedFlight: (flight: FlightResult) => void;
  formatPrice: (price: number, currency: string) => string;
}

const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  isFavorite,
  toggleFavorite,
  setSelectedFlight,
  formatPrice,
}) => {
  const { segments } = flight;
  const isDirect = flight.stops === 0;
  const stopsLabel = isDirect ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`;

  return (
    <Card sx={{ mb: 2 }} elevation={2}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Airline Info */}
           <Grid size={{xs:12, md:2}}>
            <Typography variant="h6" color="primary">
              {flight.airlineCode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {flight.airline}
            </Typography>
          </Grid>

          {/* Route Info */}
          <Grid size={{xs:12, md:6}}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Departure */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{segments[0].departure.time}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {segments[0].departure.airport}
                </Typography>
              </Box>

              {/* Duration and Stops */}
              <Box sx={{ flex: 1, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <Box sx={{ height: 2, flex: 1, bgcolor: 'divider' }} />
                  <Flight sx={{ mx: 1, color: 'primary.main' }} />
                  <Box sx={{ height: 2, flex: 1, bgcolor: 'divider' }} />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {flight.totalDuration}
                </Typography>
                <br />
                <Chip
                  label={stopsLabel}
                  size="small"
                  color={isDirect ? 'success' : 'default'}
                />
              </Box>

              {/* Arrival */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6">{segments[0].arrival.time}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {segments[0].arrival.airport}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Price and Actions */}
          <Grid size={{xs: 12, md: 4}}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h5" color="primary" gutterBottom>
                {formatPrice(flight.price, flight.currency)}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {flight.availableSeats} seats left
              </Typography>
              <Box sx={{ mt: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => toggleFavorite(flight.id)}
                  color={isFavorite ? 'secondary' : 'default'}
                >
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setSelectedFlight(flight)}
                  sx={{ ml: 1 }}
                >
                  Details
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightCard;