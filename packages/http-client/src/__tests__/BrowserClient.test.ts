import {describe, it, expect, jest} from "@jest/globals";
import {HeaderName, ContentType, UserAgent} from "@hyper/http";
import BrowserClient from "../BrowserClient.js";

describe("BrowserClient", () => {
  const mockFetchPromise = Promise.resolve({
    ok: true,
    headers: {
      get: jest.fn(),
    },
    blob: async() => Promise.resolve({google: "ok"}),
    json: async() => Promise.resolve({google: "ok"}),
  } as unknown as Response);

  window.fetch = async(): Promise<Response> => mockFetchPromise;
  jest.spyOn(window, "fetch");

  it("should create fetch request with default options", async() => {
    const client = new BrowserClient();

    const response1 = await client.get();
    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost/",
      {
        headers: {
          [HeaderName.UserAgent]: UserAgent.Hyper,
          [HeaderName.ContentType]: ContentType.ApplicationJSON,
          [HeaderName.Accept]: ContentType.ApplicationJSON,
        },
        method: "GET",
      }
    );
    expect(response1).toEqual({google: "ok"});

    const response2 = await client.get("/test");
    expect(window.fetch).toHaveBeenCalledWith(
      "http://localhost/test",
      {
        headers: {
          [HeaderName.UserAgent]: UserAgent.Hyper,
          [HeaderName.ContentType]: ContentType.ApplicationJSON,
          [HeaderName.Accept]: ContentType.ApplicationJSON,
        },
        method: "GET",
      }
    );
    expect(response2).toEqual({google: "ok"});
  });
});
