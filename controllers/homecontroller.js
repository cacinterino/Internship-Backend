const axios = require("axios");

exports.getGeoInfo = async (req, res) => {
  try {
    const ip = req.query.ip;
    const url = ip ? `https://ipinfo.io/${ip}/geo` : "https://ipinfo.io/geo";

    // call ipinfo API
    const response = await axios.get(url);

    return res.json(response.data);

  } catch (error) {
    console.error("GeoInfo error:", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message   // this will tell us why
    });
  }
};