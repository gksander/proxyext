/// <reference lib="webworker" />
export default null;
declare let self: ServiceWorkerGlobalScope;

// MODIFY REQUEST!!!
// self.addEventListener("fetch", (event) => {
//   if (event.request.url === "https://jsonplaceholder.typicode.com/todos/1") {
//     const newRequest = new Request(
//       `https://jsonplaceholder.typicode.com/posts/${Math.floor(
//         1 + 10 * Math.random()
//       )}`,
//       event.request
//     );
//     return event.respondWith(fetch(newRequest));
//   } else {
//     event.respondWith(fetch(event.request));
//   }
// });

// Throttle Response
// self.addEventListener("fetch", (event) => {
//   if (event.request.url === "https://jsonplaceholder.typicode.com/todos/1") {
//     event.respondWith(
//       new Promise((res) => {
//         setTimeout(() => res(true), 3000);
//       }).then(() => fetch(event.request))
//     );
//   } else {
//     event.respondWith(fetch(event.request));
//   }
// });
