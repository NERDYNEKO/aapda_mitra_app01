export type Page = 
  | 'dashboard'
  | 'guide'
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

export enum DisasterType {
  Earthquake = 'Earthquake',
  Flood = 'Flood',
  Cyclone = 'Cyclone',
  Landslide = 'Landslide',
  Heatwave = 'Heatwave',
  Tsunami = 'Tsunami',
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface PersonalContact {
  id?: number;
  name: string;
  number: string;
}

export interface UserProfile {
  id: number;
  name: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
}
