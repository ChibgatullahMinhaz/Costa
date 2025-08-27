const axios = require("axios");

// Flight search endpoint
const API_KEY = process.env.FLIGHT_API_KEY;

exports.getFlightInfo = async (req, res) => {
    try {
        const { flightNumber } = req.params;
        const response = await axios.get("http://api.aviationstack.com/v1/flights", {
            params: { access_key: API_KEY, flight_iata: flightNumber }
        });

        if (response.data?.data?.length > 0) {
            res.json(response.data.data[0]);
        } else {
            res.status(404).json({ message: "Flight not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
