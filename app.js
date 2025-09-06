const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api", authRoutes);
app.use("/api", homeRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});