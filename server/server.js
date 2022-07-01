const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const routes = require("./routes");
const db = require("./models");
db.sequelize.sync();

const corsOptions = {
    origin:"http://localhost:3000"
};

const app = express();
//middlewares
app.use(cors(corsOptions));
// parse requests of content-type - application/JSON
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));
app.use(logger('common'));

//routes
app.use('/api/v1', routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});