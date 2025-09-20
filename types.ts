export type Page = 
  | 'dashboard'
  | 'alerts'
  | 'shelters'
  | 'volunteer'
  | 'contacts'
  | 'map'
  | 'report'
  | 'profile';

export interface Alert {
  id: number;
  type: string;
  area: string;
  severity: 'High' | 'Medium' | 'Low';
  message: string;
  time: string;
  image?: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface PersonalContact {
  id?: number;
  name: string;
  number: string;
  isSosContact?: boolean;
}

export interface UserProfile {
  id: number;
  name: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
}

// FIX: Add DisasterType enum for use in the SurvivalGuide component.
export enum DisasterType {
  Flood = 'Flood',
  Earthquake = 'Earthquake',
  Cyclone = 'Cyclone',
  Wildfire = 'Wildfire',
  Landslide = 'Landslide',
  Tsunami = 'Tsunami',
}