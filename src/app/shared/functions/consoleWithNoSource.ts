export function consoleWithNoSource(...params) {
    setTimeout(console.log.bind(console, ...params));
}