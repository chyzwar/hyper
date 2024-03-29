

import Layer from "./Layer.js";
import type {LayerOptions} from "./Layer.js";
import type Request from "./types/Request.js";
import {randomUUID} from "crypto";

export interface RequestIdOptions extends LayerOptions {
  generateId: Function;
}

export class RequestId extends Layer {
  public constructor(options: RequestIdOptions) {
    super(options);
  }

  public handler(req: Request): void {
    req.requestId = req.headers["x-request-id"] ?? req.headers["request-id"] ?? randomUUID();
  }
}