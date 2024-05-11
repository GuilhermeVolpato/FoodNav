interface Coordinates {
  latitude: number;
  longitude: number;
}

interface OpeningHoursPeriod {
  open: {
    day: number;
    hour: number;
    minute: number;
    date?: {
      year: number;
      month: number;
      day: number;
    };
  };
  close: {
    day: number;
    hour: number;
    minute: number;
    date?: {
      year: number;
      month: number;
      day: number;
    };
  };
}

interface Review {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text: {
    text: string;
    languageCode: string;
  };
  originalText: {
    text: string;
    languageCode: string;
  };
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  publishTime: string;
}

interface Photo {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: {
    displayName: string;
    uri: string;
    photoUri: string;
  }[];
}

interface PaymentOptions {
  acceptsCreditCards: boolean;
  acceptsDebitCards: boolean;
  acceptsCashOnly: boolean;
  acceptsNfc: boolean;
}

interface ParkingOptions {
  freeParkingLot: boolean;
  freeStreetParking: boolean;
}

interface AccessibilityOptions {
  wheelchairAccessibleParking: boolean;
  wheelchairAccessibleEntrance: boolean;
  wheelchairAccessibleRestroom: boolean;
  wheelchairAccessibleSeating: boolean;
}

export interface PlaceDetails {
  id: string;
  formattedAddress: string;
  plusCode: {
    globalCode: string;
    compoundCode: string;
  };
  rating: number;
  websiteUri: string;
  regularOpeningHours: {
    openNow: boolean;
    periods: OpeningHoursPeriod[];
    weekdayDescriptions: string[];
  };
  priceLevel: string;
  userRatingCount: number;
  displayName: {
    text: string;
    languageCode: string;
  };
  takeout: boolean;
  delivery: boolean;
  dineIn: boolean;
  curbsidePickup: boolean;
  reservable: boolean;
  servesBreakfast: boolean;
  servesDinner: boolean;
  servesBeer: boolean;
  currentOpeningHours: {
    openNow: boolean;
    periods: OpeningHoursPeriod[];
    weekdayDescriptions: string[];
  };
  shortFormattedAddress: string;
  reviews: Review[];
  photos: Photo[];
  outdoorSeating: boolean;
  liveMusic: boolean;
  menuForChildren: boolean;
  servesDessert: boolean;
  servesCoffee: boolean;
  goodForChildren: boolean;
  goodForGroups: boolean;
  paymentOptions: PaymentOptions;
  parkingOptions: ParkingOptions;
  accessibilityOptions: AccessibilityOptions;
  location: Coordinates;
}
