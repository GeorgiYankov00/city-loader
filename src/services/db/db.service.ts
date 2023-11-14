import { City } from "../../utils/types/City";

export interface DBService {
  save(input: City): Promise<City>;
  connect(): void;
}
