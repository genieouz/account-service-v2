import { NODE_ENV, MONGO_URI } from "./environments";

const orm = {
  development: {
    url: MONGO_URI!
  },
  qa: {
    url: MONGO_URI!
  },
  preprod: {
    url: MONGO_URI!
  },
  production: {
    url: MONGO_URI!
  }
};

export default orm[NODE_ENV!];
