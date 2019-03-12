import axios from "axios";

export class APIService {
  constructor() {}

  getTrocs() {
    return axios.get("/api/trocs");
  }
}
