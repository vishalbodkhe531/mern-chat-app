import mongoose from "mongoose";

export const databaseConnection = () => {
  mongoose
    .connect(process.env.DB_URI, { dbName: "chatManager" })
    .then(() => console.log(`Database Successfully Connected`))
    .catch((error) => console.log(`Error is ${error}`));
};
