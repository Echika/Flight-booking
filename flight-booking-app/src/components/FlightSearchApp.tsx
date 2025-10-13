// FlightSearchApp.tsx

import React, { useState } from 'react';
import {Container, Box, CircularProgress, Alert, Typography, Button,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

// Components and Types
import Header from '../components/Header'
import SearchForm from '../components/SearchForm';
import FlightCard from '../components/FlightCard';
import FlightDetailsDialog from '../components/FlightDetailsModal';
import {
  mockAirports,
  generateMockFlights,
  formatPrice,
} from '../types'
import type { SearchCriteria, FlightResult } from '../types';

const FlightSearchApp: React.FC = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    origin: null,
    destination: null,
    departureDate: new Date().toISOString().split('T')[0],
    returnDate: '',
    passengers: 1,
    cabinClass: 'economy',
  });

  const [flights, setFlights] = useState<FlightResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<FlightResult | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchPerformed, setSearchPerformed] = useState(false);
   const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleSearch = () => {
    if (!searchCriteria.origin || !searchCriteria.destination) {
      return;
    }

    setLoading(true);
    setSearchPerformed(true);

    // Simulate API call delay
    setTimeout(() => {
      const mockFlights = generateMockFlights(
        searchCriteria.origin!.code,
        searchCriteria.destination!.code
      );
      setFlights(mockFlights);
      setLoading(false);
    }, 1500);
  };

  const toggleFavorite = (flightId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(flightId)) {
        newFavorites.delete(flightId);
      } else {
        newFavorites.add(flightId);
      }
      return newFavorites;
    });
  };
    const handleBookNow = (flight: FlightResult) => {
    // 1. Close the dialog
    setSelectedFlight(null);
    
    // 2. Show confirmation alert
    setBookingConfirmed(true);

    // 3. Hide the alert after a few seconds
    setTimeout(() => {
      setBookingConfirmed(false);
    }, 5000); 

    console.log(`Mock Booking successful for Flight ${flight.segments[0].flightNumber} on ${flight.airline}!`);
  };

  return (
  
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Header />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Search Form */}
          <SearchForm
            searchCriteria={searchCriteria}
            setSearchCriteria={setSearchCriteria}
            handleSearch={handleSearch}
            mockAirports={mockAirports}
          />

          {/* Loading State */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {/* No Results Alert */}
          {!loading && searchPerformed && flights.length === 0 && (
            <Alert severity="info">
              No flights found. Try adjusting your search criteria.
            </Alert>
          )}

                    {bookingConfirmed && (
             <Alert severity="success" sx={{ mb: 2 }}>
               Booking for flight **{selectedFlight?.segments[0].flightNumber}** confirmed! Check your email for details.
             </Alert>
          )}


          {/* Flight Results */}
          {!loading && flights.length > 0 && (
            <>
              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  {flights.length} Flights Found
                </Typography>
                <Button startIcon={<FilterList />} variant="outlined">
                  Filters
                </Button>
              </Box>

              {flights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  isFavorite={favorites.has(flight.id)}
                  toggleFavorite={toggleFavorite}
                  setSelectedFlight={setSelectedFlight}
                  formatPrice={formatPrice}
                  
                />
              ))}
            </>
          )}
        </Container>

        {/* Flight Details Modal */}
        <FlightDetailsDialog
          selectedFlight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
          formatPrice={formatPrice}
          onBookNow={handleBookNow}
          
        />
      </Box>
    
  );
};

export default FlightSearchApp;