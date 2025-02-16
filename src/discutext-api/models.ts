export interface DiscussionSection {
  header: string;
  paragraphs: string[];
}

export interface Discussion {
  text: string;
  wfo_id: string;
  valid_at: string;
  sections: DiscussionSection[];
}

export interface NWSOffice {
  CWA: string;
  City: string;
  CityState: string;
  FullStaId: string;
  LAT: number;
  LON: number;
  Region: string;
  ST: string;
  State: string;
  WFO: string;
}

export interface NWSOfficeDetail {
  geometry: object;
  properties: NWSOffice;
}
