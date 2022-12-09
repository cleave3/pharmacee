const express = require("express");
const cors = require("cors");
const router = require("./router");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router)

app.listen(PORT, () => console.log(`PHARMACEE is running on ${PORT}`));
