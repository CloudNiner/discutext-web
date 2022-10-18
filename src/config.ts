export interface AppConfig {
  discutextApiUrl: string;
}

const appConfig: AppConfig = {
  discutextApiUrl:
    process.env.REACT_APP_DISCUTEXT_API_URL || "https://api.discutext.com",
};

export default appConfig;
