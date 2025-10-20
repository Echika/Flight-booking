// components/SearchForm.tsx

import React from 'react';
import {
  Card, CardContent, Typography, Grid, Autocomplete, TextField, Button, InputAdornment,
} from '@mui/material';
import {
  Search, FlightTakeoff, FlightLand, CalendarToday, Person,
} from '@mui/icons-material';
import type { Airport, SearchCriteria } from '../types/index'

interface SearchFormProps {
  searchCriteria: SearchCriteria;
  setSearchCriteria: React.Dispatch<React.SetStateAction<SearchCriteria>>;
  handleSearch: () => void;
  mockAirports: Airport[];
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchCriteria,
  setSearchCriteria,
  handleSearch,
  mockAirports,
}) => {
  const isSearchDisabled = !searchCriteria.origin || !searchCriteria.destination;

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Search Flights
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{xs: 12, md: 6}}>
            <Autocomplete
              options={mockAirports}
              getOptionLabel={(option) => `${option.code} - ${option.name}`}
              value={searchCriteria.origin}
              onChange={(_, newValue) =>
                setSearchCriteria({ ...searchCriteria, origin: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  placeholder="Select origin airport"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightTakeoff />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{xs: 12, md: 6}}>
            <Autocomplete
              options={mockAirports}
              getOptionLabel={(option) => `${option.code} - ${option.name}`}
              value={searchCriteria.destination}
              onChange={(_, newValue) =>
                setSearchCriteria({ ...searchCriteria, destination: newValue })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To"
                  placeholder="Select destination airport"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightLand />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{xs: 12, md: 4}}>
            <TextField
              fullWidth
              type="date"
              label="Departure Date"
              value={searchCriteria.departureDate}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, departureDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{xs: 12, md: 4}}>
            <TextField
              fullWidth
              type="date"
              label="Return Date (Optional)"
              value={searchCriteria.returnDate}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, returnDate: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

        <Grid size={{xs: 12, md: 4}}>
            <TextField
              fullWidth
              select
              label="Passengers"
              value={searchCriteria.passengers}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, passengers: Number(e.target.value) })
              }
              SelectProps={{ native: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </TextField>
          </Grid>

          <Grid size={{xs: 12}}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Search />}
              onClick={handleSearch}
              disabled={isSearchDisabled}
            >
              Search Flights
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SearchForm;