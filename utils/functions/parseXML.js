import { parseStringPromise } from "xml2js";
import axios from "axios";

const parseCML = async (url) => {
  const xml = await axios.get(url)
    .then((response) => response.data);
  const parsed = await parseStringPromise(xml)
    .then((result) => result);

  return parsed;
};

export default parseCML;
