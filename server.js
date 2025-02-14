const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors()); // Allows Webflow to send requests

const BEEHIIV_API_KEY = process.env.API_KEY;
const PUBLICATION_ID = process.env.PUBLIC_KEY;

// Proxy route to handle subscription
app.post("/", async (req, res) => {
    try {
        const response = await axios.post(
            `https://api.beehiiv.com/v2/publications/${PUBLICATION_ID}/subscriptions`,
            req.body,
            {
                headers: {
                    "Authorization": `Bearer ${BEEHIIV_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ message: "Subscription successful!", data: response.data });
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: "Subscription failed", error: error.response?.data || error.message });
    }
});

// Start the server
app.listen(3000, () => console.log("Server running on port 3000"));
