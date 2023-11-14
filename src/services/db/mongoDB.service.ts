import { CityModel } from "../../model/city";
import { City } from "../../utils/types/City";
import { DBService } from "./db.service";
import mongoose from "mongoose";
export class MongoDBService implements DBService {
  constructor() {
    this.connect();
  }

  async save(input: City): Promise<City> {
    console.log("Saving city in DB");
    const city = await new CityModel(input);
    let result;
    result = await city.save();

    if (!result) {
      throw Error("Unable to get response from DB. Payload: " + city);
    }
    console.log("City saved successfully:");
    return result;
  }

  async connect() {
    if (!process.env.DB_URL) {
      throw new Error("DB Connection String undefined!");
    }
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to MongoDB");
  }
}
