import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import Product from "./models/Product.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import Transaction from "./models/Transaction.js";
import kpiRoutes from "./routes/kpi.js"; // Correct relative path
import KPI from "./models/KPI.js"; // Correct relative path
import { kpis ,products,transactions} from "./data/data.js"; // Ensure this path is correct

dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(cors());
console.log(" a lavdya");

//routes
app.use("/kpi",kpiRoutes);
app.use("/product",productRoutes);
app.use("/transaction",transactionRoutes);




//mongo setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  })
  .then(async ()=>{
    app.listen(PORT,()=> console.log(`Server Port:${PORT}`))


    await mongoose.connection.db.dropDatabase();
    KPI.insertMany(kpis);
    Product.insertMany(products);
    Transaction.insertMany(transactions);
  })
  .catch((error)=> console.log(`${error} did not connect`));
