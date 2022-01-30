const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const keys = require("./config/keys");
require("./models/User");

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
require("./routes/authRoutes")(app);
require("./routes/routineRoutes")(app);
require("./routes/statRoutes")(app);

require("./stats/scheduler");

const PORT = 5000 | process.env.PORT;
app.listen(PORT);
