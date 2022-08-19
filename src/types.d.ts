import http from "http";
import * as https from "https";

declare interface Options extends http.ServerOptions, https.ServerOptions  {
    /**
     * Switch to https.
     */
    https: boolean;

    /**
     * Sets the hostname.
     */
    hostname: string;

    /**
     * Listen to the server.
     */
    listen(): void;
}

declare interface response extends http.OutgoingMessage, https.OutgoingMessage {
    /**
     * Send any value to the incoming request.
     * @param value it accepts any value.
     */
    send(value: any): void;

    /**
     * Sets a single header value for implicit headers
     * @param name It accepts the name of the header and it is case-insensitive.
     * @param value It accepts the name of the header and it is case-insensitive.
     */
    setHeader(name: string, value: string): void;

    /**
     * Sets the status code
     * @param code The status code is a 3-digit HTTP status code
     */
    status(code: number): void;

    /**
     * Send a json object to the incoming request.
     * @param value it accepts only json object 
     */
    json(value: object): void;

    /**
     * Send a html string to the incoming request.
     * @param value 
     */
    html(value: string): void;
}

declare interface request extends http.IncomingMessage, https.IncomingMessage {
    params: object | undefined;
    query: object | undefined;
}

declare type Handler = (req: request, res: response, next?: void) => void;

/**
 * Use Middelware.
 * @param {void} middelware add a global middelware to your server.
 */
export function use(middelware: Handler) : void;

/**
 * Launches the server.
 * @param {number} port default port is 3000 or set your own.
 * @param {object} options adds options to the server e.g. for https key and certificate, ... (default undefined)
 */
export function bootstrap(port?: number, options?: Options): void | http.Server | https.Server;

//routes are from https://nodejs.dev/learn/the-nodejs-http-module#:~:text=%27ACL%27%2C,%27UNSUBSCRIBE%27
// issue: m-search contains a symbol. "trying to fix next time"
export function get(route: string, ...handlers: Handler): void;
export function post(route: string, ...handlers: Handler): void;
export function put(route: string, ...handlers: Handler): void;
export function patch(route: string, ...handlers: Handler): void;
export function acl(route: string, ...handlers: Handler): void;
export function bind(route: string, ...handlers: Handler): void;
export function checkout(route: string, ...handlers: Handler): void;
export function connect(route: string, ...handlers: Handler): void;
export function copy(route: string, ...handlers: Handler): void;
export function head(route: string, ...handlers: Handler): void;
export function link(route: string, ...handlers: Handler): void;
export function lock(route: string, ...handlers: Handler): void;
export function merge(route: string, ...handlers: Handler): void;
export function mkactivity(route: string, ...handlers: Handler): void;
export function mkcalendar(route: string, ...handlers: Handler): void;
export function mkcol(route: string, ...handlers: Handler): void;
export function move(route: string, ...handlers: Handler): void;
export function notify(route: string, ...handlers: Handler): void;
export function options(route: string, ...handlers: Handler): void;
export function propfind(route: string, ...handlers: Handler): void;
export function proppatch(route: string, ...handlers: Handler): void;
export function purge(route: string, ...handlers: Handler): void;
export function rebind(route: string, ...handlers: Handler): void;
export function report(route: string, ...handlers: Handler): void;
export function search(route: string, ...handlers: Handler): void;
export function subscribe(route: string, ...handlers: Handler): void;
export function trace(route: string, ...handlers: Handler): void;
export function unbind(route: string, ...handlers: Handler): void;
export function unlink(route: string, ...handlers: Handler): void;
export function unlock(route: string, ...handlers: Handler): void;
export function unsubscribe(route: string, ...handlers: Handler): void;

declare function _delete(route: string, ...handlers: Handler): void;
export { _delete as delete }