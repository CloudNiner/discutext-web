import { Discussion } from "./models";

class DiscutextApi {
  readonly apiUrl: string;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  getLatestDiscussion = async (wfoId: string): Promise<Discussion> => {
    const response = await fetch(`${this.apiUrl}/discussion/${wfoId}/latest`);
    return response.json() as Promise<Discussion>;
  };
}

export default DiscutextApi;
