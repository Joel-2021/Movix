import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOWE0ZGJkOWMzOWM2OTZjN2RjMmZkODgxNDI2NDY3NSIsInN1YiI6IjYyNWJhZTFlZDI2NmEyMDA5Y2ZmNWU0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E8Plios3oi0pRrTSYA-vee-kvd2GryZ4NkMqhPTsj04";
console.log(BASE_URL);
console.log(TMDB_TOKEN);
const headers = { Authorization: `Bearer ${TMDB_TOKEN}` };

export const fetchData = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, { headers, params });
    return data;
  } catch (error) {
    console.log(error);
  }
};
