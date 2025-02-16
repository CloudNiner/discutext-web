import { Discussion, NWSOffice, NWSOfficeDetail } from "./models";

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

  getOffice = async (wfoId: string): Promise<NWSOfficeDetail> => {
    const response = await fetch(`${this.apiUrl}/nws-office/${wfoId}`);
    return response.json() as Promise<NWSOfficeDetail>;
  };
}

export default DiscutextApi;
