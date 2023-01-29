import { Discussion, NWSOffice } from "./models";

class DiscutextApi {
  readonly apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  getLatestDiscussion = async (wfoId: string): Promise<Discussion> => {
    const response = await fetch(`${this.apiUrl}/discussion/${wfoId}/latest`);
    return response.json() as Promise<Discussion>;
  };

  getOffices = async (): Promise<NWSOffice[]> => {
    const response = await fetch(`${this.apiUrl}/nws-office`);
    return response.json() as Promise<NWSOffice[]>;
  };
}

export default DiscutextApi;
