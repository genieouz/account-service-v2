import { sendMessageHttp } from "../utils/send-message";
import axios from "axios";

jest.mock("axios");
describe("Send Message Function", () => {
  it("Should send a message ", async () => {
    const input = {
      to: "+221777902880",
      sender: "Paps",
      text: "Bonjour MGG ce ci est un test"
    };
    axios.post = jest.fn().mockResolvedValueOnce({
      status: 200,
      statusText: "OK",
      data: 192929
    });
    const data = await sendMessageHttp(input);
    expect(data).toBeDefined();
    expect(data.status).toBe(200);
  });
});
