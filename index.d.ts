declare interface response {
    send(value: any): any;
    setHeader(name: string, value: string): any;
    status(code: number): any;
    json(value: object): any;
    html(value: string): any;
}

//server
export function bootstrap(port?: any, options?: object, error?: (request: any, res: response) => any): any;

//routes are from https://nodejs.dev/learn/the-nodejs-http-module#:~:text=%27ACL%27%2C,%27UNSUBSCRIBE%27
// issue: m-search and delete can't defined cause delete is a keyword and m-search contains a symbol. "trying to fix next time"
export function get(route: string, action: (req: any, res: response) => any): any;
export function post(route: string, action: (req: any, res: response) => any): any;
export function put(route: string, action: (req: any, res: response) => any): any;
export function patch(route: string, action: (req: any, res: response) => any): any;
export function acl(route: string, action: (req: any, res: response) => any): any;
export function bind(route: string, action: (req: any, res: response) => any): any;
export function checkout(route: string, action: (req: any, res: response) => any): any;
export function connect(route: string, action: (req: any, res: response) => any): any;
export function copy(route: string, action: (req: any, res: response) => any): any;
export function head(route: string, action: (req: any, res: response) => any): any;
export function link(route: string, action: (req: any, res: response) => any): any;
export function lock(route: string, action: (req: any, res: response) => any): any;
export function merge(route: string, action: (req: any, res: response) => any): any;
export function mkactivity(route: string, action: (req: any, res: response) => any): any;
export function mkcalendar(route: string, action: (req: any, res: response) => any): any;
export function mkcol(route: string, action: (req: any, res: response) => any): any;
export function move(route: string, action: (req: any, res: response) => any): any;
export function notify(route: string, action: (req: any, res: response) => any): any;
export function options(route: string, action: (req: any, res: response) => any): any;
export function propfind(route: string, action: (req: any, res: response) => any): any;
export function proppatch(route: string, action: (req: any, res: response) => any): any;
export function purge(route: string, action: (req: any, res: response) => any): any;
export function rebind(route: string, action: (req: any, res: response) => any): any;
export function report(route: string, action: (req: any, res: response) => any): any;
export function search(route: string, action: (req: any, res: response) => any): any;
export function subscribe(route: string, action: (req: any, res: response) => any): any;
export function trace(route: string, action: (req: any, res: response) => any): any;
export function unbind(route: string, action: (req: any, res: response) => any): any;
export function unlink(route: string, action: (req: any, res: response) => any): any;
export function unlock(route: string, action: (req: any, res: response) => any): any;
export function unsubscribe(route: string, action: (req: any, res: response) => any): any;

//fixing delete
declare function _delete(route: string, action: (req: any, res: response) => any): any;
export { _delete as delete }


