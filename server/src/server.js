const express = require('express');
const { PORT } = require('./const');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config({ path: '.env' });

const emailRouter = require('./routers/email')


const app = express();
app.use(cors());
app.use(express.json());

app.use(emailRouter)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});



