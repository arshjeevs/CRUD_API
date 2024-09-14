const express = require('express');
const cors = require('cors');
const RootRouter = require('./Routes/index')
const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/v1",RootRouter);

app.listen(3000);