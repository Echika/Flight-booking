// types/index.ts

// --- Airport Type ---
export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

// --- Flight Segment Type ---
export interface FlightSegment {
  departure: {
    airport: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    time: string;
    date: string;
  };
  duration: string;
  flightNumber: string;
  aircraft: string;
}

// --- Flight Result Type ---
export interface FlightResult {
  id: string;
  airline: string;
  airlineCode: string;
  segments: FlightSegment[];
  price: number;
  currency: string;
  stops: number;
  totalDuration: string;
  cabinClass: string;
  availableSeats: number;
}

// --- Search Criteria Type ---
export interface SearchCriteria {
  origin: Airport | null;
  destination: Airport | null;
  departureDate: string;
  returnDate: string;
  passengers: number;
  cabinClass: string;
}

 export interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}
// --- Mock Data ---

export const mockAirports: Airport[] = [
  { code: 'JFK', name: 'John F. Kennedy International', city: 'New York', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'USA' },
  { code: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK' },
  { code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', country: 'France' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai', country: 'UAE' },
  { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapore', country: 'Singapore' },
  { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australia' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Netherlands' }
];

export const generateMockFlights = (origin: string, destination: string): FlightResult[] => {
  const airlines = [
    { name: 'Delta Airlines', code: 'DL' },
    { name: 'United Airlines', code: 'UA' },
    { name: 'American Airlines', code: 'AA' },
    { name: 'Emirates', code: 'EK' },
    { name: 'British Airways', code: 'BA' },
    { name: 'Lufthansa', code: 'LH' }
  ];

  return airlines.map((airline, index) => ({
    id: `FL${index + 1}${Date.now()}`,
    airline: airline.name,
    airlineCode: airline.code,
    segments: [
      {
        departure: {
          airport: origin,
          time: `${8 + index}:00 AM`,
          date: new Date().toISOString().split('T')[0]
        },
        arrival: {
          airport: destination,
          time: `${2 + index}:30 PM`,
          date: new Date().toISOString().split('T')[0]
        },
        duration: '6h 30m',
        flightNumber: `${airline.code}${1234 + index}`,
        aircraft: 'Boeing 777-300ER'
      }
    ],
    price: 350 + (index * 50),
    currency: 'USD',
    stops: index % 3 === 0 ? 0 : 1,
    totalDuration: '6h 30m',
    cabinClass: 'Economy',
    availableSeats: 12 - index
  }));
};

/**
 * Utility function to format price consistently
 * @param price The numerical price
 * @param currency The currency code (e.g., 'USD')
 * @returns A formatted currency string
 */
export const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(price);
};