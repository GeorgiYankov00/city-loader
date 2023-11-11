import { City } from "../../utils/types/City";

export interface DBService {
  //to do type for model
  save(input: City): Promise<any>;
  connect(): void;
}
