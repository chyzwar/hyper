import {IncomingMessage} from "http";
import type {Socket} from "net";

import Http2Response from "../Http1Response.js";

describe("Http2Response", () => {
  describe("stream", () => {
    it("should not send status message", () => {
      const socket = {} as Socket;
      const incomingMessage = new IncomingMessage(socket);
      const response = new Http2Response(incomingMessage);

      expect(response).toThrowError("http v1 req do not have stream");
    });
  });
});