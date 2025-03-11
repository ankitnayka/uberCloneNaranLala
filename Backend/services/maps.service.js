import axios from 'axios';
import captainModel from '../models/captain.model.js';



export const getAddressCoordinate = async (address) => {
    const url = `https://api.openrouteservice.org/geocode/search?api_key=5b3ce3597851110001cf62488da69ddcafe244619e4b4032cda7dcb9&text=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);
        if (response.data.features.length > 0) {
            const location = response.data.features[0].geometry.coordinates;
           
            return {
                lng: location[0], // Longitude
                ltd: location[1]  // Latitude
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=5b3ce3597851110001cf62488da69ddcafe244619e4b4032cda7dcb9&text=${encodeURIComponent(input)}`;

    try {
        const response = await axios.get(url);
       
        if (response.data.features.length > 0) {
            return response.data.features.map(feature => feature.properties.label);
            // return response.data;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const getCaptainsInTheRadius = async (ltd, lng, radius) => {
    
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, ltd], radius / 6371] // Convert radius to radians
            }
        }
    });

    return captains;
};









const API_KEY = "5b3ce3597851110001cf62488da69ddcafe244619e4b4032cda7dcb9";



// Main function to get distance and duration
export const getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    try {
        // Get coordinates for both locations
        const result1 = await getAddressCoordinate(origin);
        const result2 = await getAddressCoordinate(destination);
     
        const startLng = result1.lng;
        const startLat = result1.ltd;
        const endLng = result2.lng;
        const endLat = result2.ltd;


        // OpenRouteService Directions API call
        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${startLng},${startLat}&end=${endLng},${endLat}`;

        const response = await axios.get(url);
    
                // Check if the response contains valid data
                if (response.data.features && response.data.features.length > 0) {
                    const segment = response.data.features[0].properties.segments[0]; // Corrected path
        
                    return {
                        distance: segment.distance / 1000, // Convert meters to km
                        duration: segment.duration / 60   // Convert seconds to minutes
                    };
                } else {
                    throw new Error("No route found for the given locations");
                }
            } catch (error) {
                console.error("Error fetching route data:", error);
                throw error;
            }
};

