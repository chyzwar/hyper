import {Method, StatusCode} from "@hyper/http";

import RequestLogger from "../RequestLogger";
import Route from "../Route";
import Server from "../Server";
import MockRequest from "../MockRequest";
import MockResponse from "../MockResponse";


describe("Request Logger", () => {
  const logger = {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  };
  beforeEach(() => {
    Date.now = jest.fn()
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2);
  });

  const server = new Server({port: 0});
  server.add(new RequestLogger({logger}));

  server.add(new Route({
    path: "/", 
    method: Method.GET,
    handler: (req, res): void => {
      res.json({message: "Info"});
    },
  }));
  server.add(new Route({
    path: "/error", 
    method: Method.GET,
    handler: (): void => {
      throw new Error("Route Error");
    },
  }));

  it("should log success", async() => {
    const req = new MockRequest();
    const res = new MockResponse();
    
    await server.inject(req, res);

    expect(logger.info).toMatchSnapshot();
    expect(res.statusCode).toBe(StatusCode.Ok);
  });

  it("should log route error", async() => {
    const req = new MockRequest({url: "/error"});
    const res = new MockResponse();
    
    await server.inject(req, res);

    expect(logger.error).toMatchSnapshot();
    expect(res.statusCode).toBe(StatusCode.InternalServerError);
  });

  it("should response error", async() => {
    const req = new MockRequest();
    const res = new MockResponse({simulate: ["error"]});

    await server.inject(req, res);

    expect(logger.error).toMatchSnapshot();
  });

  it("should log aborted request", async() => {
    const req = new MockRequest({simulate: ["aborted"]});
    const res = new MockResponse();
    
    await server.inject(req, res);

    expect(logger.warn).toMatchSnapshot();
  });
});