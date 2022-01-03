import { IncomingMessage, OutgoingMessage, Server } from "http";

declare interface response {
    /**
     * Send any value to the incoming request.
     * @param value it accepts any value.
     */
    send(value: any): void;

    /**
     * sets a single header value for implicit headers
     * @param name It accepts the name of the header and it is case-insensitive.
     * @param value It accepts the name of the header and it is case-insensitive.
     */
    setHeader(name: string, value: string): void;

    /**
     * sets the status code
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

declare interface request extends IncomingMessage {
    params: object | undefined;
    query: object | undefined;
}

declare type RouteHandler = (req: request, res: response) => void;

declare type MiddelwareHandler = (req: request, res: OutgoingMessage, next: void) => void;

/**
 * Use Middelware.
 * @param {void} middelware add a global middelware to your server.
 */
export function use(middelware: MiddelwareHandler) : void;

/**
 * Launches the server.
 * @param {number} port default port is 3000 or set your own.
 * @param {object} options adds options to the server e.g. for https key and certificate.
 * @param {boolean} options use https instead of http. (default false)
 * @param {void} error handels error when for incoming request route doesn't exists.
 */
export function bootstrap(port?: number, options?: object, https?: boolean,  error?: RouteHandler): void | Server;

//routes are from https://nodejs.dev/learn/the-nodejs-http-module#:~:text=%27ACL%27%2C,%27UNSUBSCRIBE%27
// issue: m-search contains a symbol. "trying to fix next time"
export function get(route: string, handler: RouteHandler): void;
export function post(route: string, handler: RouteHandler): void;
export function put(route: string, handler: RouteHandler): void;
export function patch(route: string, handler: RouteHandler): void;
export function acl(route: string, handler: RouteHandler): void;
export function bind(route: string, handler: RouteHandler): void;
export function checkout(route: string, handler: RouteHandler): void;
export function connect(route: string, handler: RouteHandler): void;
export function copy(route: string, handler: RouteHandler): void;
export function head(route: string, handler: RouteHandler): void;
export function link(route: string, handler: RouteHandler): void;
export function lock(route: string, handler: RouteHandler): void;
export function merge(route: string, handler: RouteHandler): void;
export function mkactivity(route: string, handler: RouteHandler): void;
export function mkcalendar(route: string, handler: RouteHandler): void;
export function mkcol(route: string, handler: RouteHandler): void;
export function move(route: string, handler: RouteHandler): void;
export function notify(route: string, handler: RouteHandler): void;
export function options(route: string, handler: RouteHandler): void;
export function propfind(route: string, handler: RouteHandler): void;
export function proppatch(route: string, handler: RouteHandler): void;
export function purge(route: string, handler: RouteHandler): void;
export function rebind(route: string, handler: RouteHandler): void;
export function report(route: string, handler: RouteHandler): void;
export function search(route: string, handler: RouteHandler): void;
export function subscribe(route: string, handler: RouteHandler): void;
export function trace(route: string, handler: RouteHandler): void;
export function unbind(route: string, handler: RouteHandler): void;
export function unlink(route: string, handler: RouteHandler): void;
export function unlock(route: string, handler: RouteHandler): void;
export function unsubscribe(route: string, handler: RouteHandler): void;

//OVERLOAD WITH MIDDELWARE
export function get(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function post(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function put(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function patch(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function acl(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function bind(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function checkout(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function connect(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function copy(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function head(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function link(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function lock(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function merge(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function mkactivity(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function mkcalendar(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function mkcol(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function move(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function notify(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function options(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function propfind(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function proppatch(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function purge(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function rebind(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function report(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function search(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function subscribe(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function trace(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function unbind(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function unlink(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function unlock(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export function unsubscribe(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;

declare function _delete(route: string, handler: RouteHandler): void;
declare function _delete(route: string, middelware: MiddelwareHandler, handler: RouteHandler): void;
export { _delete as delete }