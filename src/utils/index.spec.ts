import { ObjectID } from "mongodb";
import { toObjectID } from "./index";

describe("test utilities function", () => {
  it("should convert string to mongo ID", async () => {
    expect(toObjectID("628385ece7e8a6fb34ce5f45")).toBeInstanceOf(ObjectID);
  });
});
