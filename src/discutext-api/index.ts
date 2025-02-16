import config from "@/config";
import DiscutextApi from "./discutext-api-client";

export default new DiscutextApi(config.discutextApiUrl);
