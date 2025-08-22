import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

app.get("/my-articles", async (req, res) => {
	try {
		const response = await fetch("https://dev.to/api/articles/me/published", {
			headers: {
				"api-key": process.env.DEVTO_API_KEY,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(
				`Dev.to API error: ${response.status} ${response.statusText}`,
			);
		}

		const data = await response.json();
		res.json(data);
	} catch (err) {
		console.error("Backend Error:", err.message);
		res.status(500).json({ error: err.message });
	}
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Backend running at http://localhost:${PORT}`);
});
