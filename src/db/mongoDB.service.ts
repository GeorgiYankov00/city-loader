import { CityModel } from "./../model/city";
import { City } from "../utils/types/City";
import { DBService } from "./db.service";
import mongoose from "mongoose";
export class MongoDBService implements DBService {
  constructor() {}

  //to do add type
  async save(input: City): Promise<any> {
    console.log("Saving city in DB");
    const city = await new CityModel(input);
    let result;
    try {
      result = await city.save();
      console.log("City saved successfully:");
    } catch (err) {
      console.error("Unable to save city. Error:", err);
    }

    return result;
  }

  async connect() {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("Successfully connected to MongoDB");
  }
}
