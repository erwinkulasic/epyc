import { IncomingMessage, Server } from "http";

declare interface response {
    send(value: any): any;
    setHeader(name: string, value: string): any;
    status(code: number): any;
    json(value: object): any;
    html(value: string): any;
}

declare interface request extends IncomingMessage {
    params: object | undefined;
    query: object | undefined;
}

declare type RouteFunction = (req: request, res: response) => void;

/**
 * Launches the server.
 * @param port default port is 3000 or set your own.
 * @param options adds options to the server e.g. for https key and certificate.
 * @param error handels error when for incoming request route doesn't exists.
 */
export function bootstrap(port?: any, options?: object, error?: RouteFunction): void | Server;

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

