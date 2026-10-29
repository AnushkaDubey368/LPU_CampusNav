export type ScreenId = 'login' | 'home' | 'map' | 'route' | 'directory' | 'profile';

export type RoutePreference = 'fastest' | 'rain' | 'accessible';

export type RoutingMode = 'standard' | 'brisk' | 'accessible';

export type CampusBase = 'BH-1' | 'GH-2' | 'GATE-1' | 'GATE-4';

export interface UserProfile {
  name: string;
  regId: string;
  section: string;
  program: string;
  school: string;
  avatarUrl: string;
  isRfidSynced: boolean;
  campusBase: CampusBase;
  routingMode: RoutingMode;
  timetableSync: boolean;
  preClassAlertMinutes: number;
  weatherCorridorRouting: boolean;
  offlinePackUpdated: boolean;
}

export interface ClassSlot {
  id: string;
  courseCode: string;
  courseName: string;
  faculty: string;
  timeSlot: string;
  location: string;
  room: string;
  block: string;
  floor: string;
  distanceMeters: number;
  estWalkTimeMins: number;
  startsInMins: number;
  type: 'lecture' | 'lab' | 'tutorial';
  status: 'next' | 'upcoming' | 'completed';
}

export interface CampusBlock {
  id: string;
  code: string;
  name: string;
  category: 'academic' | 'hostel' | 'food' | 'library' | 'emergency';
  distanceMeters: number;
  walkTimeMins: number;
  openStatus: string;
  isOpen: boolean;
  facilities: string[];
  keyHighlights: string;
  liftsActive: boolean;
  hasCafe: boolean;
  hasRamps: boolean;
  svgCoords: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
