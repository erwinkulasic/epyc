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

declare type RouteFunction = (req: request, res: response) => void;

declare type MiddelwareFunction = (req: request, res: OutgoingMessage, next: void) => void;

/**
 * Use Middelware.
 * @param {void} middelware add a global middelware to your server.
 */
export function use(middelware: MiddelwareFunction) : void;

/**
 * Launches the server.
 * @param {number} port default port is 3000 or set your own.
 * @param {object} options adds options to the server e.g. for https key and certificate.
 * @param {boolean} options use https instead of http. (default false)
 * @param {void} error handels error when for incoming request route doesn't exists.
 */
export function bootstrap(port?: number, options?: object, https?: boolean,  error?: RouteFunction): void | Server;

//routes are from https://nodejs.dev/learn/the-nodejs-http-module#:~:text=%27ACL%27%2C,%27UNSUBSCRIBE%27
// issue: m-search contains a symbol. "trying to fix next time"
export function get(route: string, action: RouteFunction): void;
export function post(route: string, action: RouteFunction): void;
export function put(route: string, action: RouteFunction): void;
export function patch(route: string, action: RouteFunction): void;
export function acl(route: string, action: RouteFunction): void;
export function bind(route: string, action: RouteFunction): void;
export function checkout(route: string, action: RouteFunction): void;
export function connect(route: string, action: RouteFunction): void;
export function copy(route: string, action: RouteFunction): void;
export function head(route: string, action: RouteFunction): void;
export function link(route: string, action: RouteFunction): void;
export function lock(route: string, action: RouteFunction): void;
export function merge(route: string, action: RouteFunction): void;
export function mkactivity(route: string, action: RouteFunction): void;
export function mkcalendar(route: string, action: RouteFunction): void;
export function mkcol(route: string, action: RouteFunction): void;
export function move(route: string, action: RouteFunction): void;
export function notify(route: string, action: RouteFunction): void;
export function options(route: string, action: RouteFunction): void;
export function propfind(route: string, action: RouteFunction): void;
export function proppatch(route: string, action: RouteFunction): void;
export function purge(route: string, action: RouteFunction): void;
export function rebind(route: string, action: RouteFunction): void;
export function report(route: string, action: RouteFunction): void;
export function search(route: string, action: RouteFunction): void;
export function subscribe(route: string, action: RouteFunction): void;
export function trace(route: string, action: RouteFunction): void;
export function unbind(route: string, action: RouteFunction): void;
export function unlink(route: string, action: RouteFunction): void;
export function unlock(route: string, action: RouteFunction): void;
export function unsubscribe(route: string, action: RouteFunction): void;

declare function _delete(route: string, action: RouteFunction): void;
export { _delete as delete }


