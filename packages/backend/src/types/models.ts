export interface IArticle {
  external_id: string;
  image_url: string;
  quantity: number;
  name: string;
}

export interface ITrackingDestination {
  street: string;
  zip_code: string;
  city: string;
  country_iso: string;
}

export interface ITracking {
  id: string;
  external_id: string;
  tracking_number: string;
  courier: string;
  destination: ITrackingDestination;
  receiver_email: string;
  articles: IArticle[];
}

export interface ITrackingCheckpoint {
  id: string;
  tracking_internal_id: string;
  tracking_number: string;
  location: string;
  timestamp: string;
  status: string;
  status_text: string;
  status_detail: string;
}

export interface IGroupedTracking {
  tracking: ITracking;
  checkpoints: ITrackingCheckpoint[];
}
