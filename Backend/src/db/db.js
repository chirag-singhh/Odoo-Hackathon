// import mongoose from "mongoose";
// import { DB_NAME } from ".././constants.js";

// const connectDB = async () => {
//   try {
//     const connectInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {

//     });
//     console.log(`CONNECTION ESTABLISHED:- DB HOSTED ON ${connectInstance.connection.host}`);
//   } catch (error) {
//     console.log("ERROR: ", error);
//     process.exit(1);
//   }
// };

// export default connectDB;




// // // src/db/connectDB.js
// // import mongoose from "mongoose";
// // import { DB_NAME } from "../constants.js";

// // const connectDB = async () => {
// //   try {
// //     const MONGO_URI = `${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`;

// //     const connectInstance = await mongoose.connect(MONGO_URI, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //       ssl: true,
// //       // tlsAllowInvalidCertificates: true, // optionally enable for dev
// //     });

// //     console.log(`✅ MongoDB Connected: ${connectInstance.connection.host}`);
// //   } catch (error) {
// //     console.error("❌ MongoDB Connection Error:", error.message);
// //     process.exit(1);
// //   }
// // };

// // export default connectDB;


// src/db/connectDB.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${connectInstance.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
