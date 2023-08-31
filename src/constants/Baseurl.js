import {Platform} from 'react-native';

// Local Connection
export const API_URL =
  Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:8000';
