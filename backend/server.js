import express from "express";
import data from './config/init.js';
import Laptop from "./models/Laptop.js";
import './pdi/Laptop.js';
import cors from 'cors';

const app = express();
const router = express.Router();
const port = 5000;

app.use(express.json());
app.use(cors())

app.get('/', async (req, res) =>  {
  res.send('Hello from the Express.js server by erza!');
});

router.get('/laptops', async (req, res) =>  {
  try {
    const laptops = await Laptop.findAll();
    res.status(200).json({success: true, data: laptops});
  } catch (error) {
    console.error("Error finding laptops: ",error);
    
  }
});


app.use('/api',router);

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
