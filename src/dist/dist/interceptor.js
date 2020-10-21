"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosWithFollowLocation = void 0;
const axios_1 = require("axios");
const apiKeyHeaderName = "X-Killbill-ApiKey";
const apiSecretHeaderName = "X-Killbill-ApiSecret";
let axiosWithFollowLocation = axios_1.default.create();
exports.axiosWithFollowLocation = axiosWithFollowLocation;
axiosWithFollowLocation.interceptors.response.use((response) => __awaiter(void 0, void 0, void 0, function* () {
    var location = response.headers.location;
    if (response.status === 201 && location) {
        var config = {
            auth: response.config.auth,
            headers: {
                [apiKeyHeaderName]: response.config.headers[apiKeyHeaderName],
                [apiSecretHeaderName]: response.config.headers[apiSecretHeaderName]
            }
        };
        var followResponse = yield axios_1.default.get(location, config);
        response.data = followResponse.data;
    }
    return response;
}), function (error) {
    return Promise.reject(error);
});
