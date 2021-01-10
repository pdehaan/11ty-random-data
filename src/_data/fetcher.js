const axios = require("axios");

const MAX_BREACHES = 10;

module.exports = async () => {
  const res = await axios.get("https://haveibeenpwned.com/api/v3/breaches");
  return res.data.slice(0, MAX_BREACHES);
};
