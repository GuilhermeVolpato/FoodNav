type Location = {
  lat: number;
  lng: number;
};

type Viewport = {
  northeast: Location;
  southwest: Location;
};

type Geometry = {
  location: Location;
  viewport: Viewport;
};

type OpeningHours = {
  open_now: boolean;
};

type Photo = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

type PlusCode = {
  compound_code: string;
  global_code: string;
};

export type PlaceResult = {
  business_status: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  price_level?: number;
  rating: number;
  reference: string;
  scope: string;
  types: string[];
  user_ratings_total: number;
  vicinity: string;
  permanently_closed?: boolean;
};

export type PlacesApiResponse = {
  html_attributions: any[];
  results: PlaceResult[];
  status: string;
};
