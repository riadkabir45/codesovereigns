import express from "express";
import laptopRoutes from './serverComponents/route/productRoute.js'
import cors from 'cors';
import testUserRouter from "./serverComponents/route/testUserRoute.js";

const app = express();
const port = 5000;


app.use(express.json());
app.use(cors())

app.use('/api/products',laptopRoutes);

app.use('/api/users',testUserRouter);

app.get('/', async (req, res) =>  {
  res.send('Hello from the Express.js server by erza!');
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
