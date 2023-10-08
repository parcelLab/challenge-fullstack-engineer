import express from 'express';
import routes from './routes';
var cors = require('cors')

const app = express();
const PORT = 3000;
app.use(cors())
routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});