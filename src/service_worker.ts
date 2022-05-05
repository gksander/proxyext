/// <reference lib="webworker" />
import { isMessageDataRulesPayload } from "./utils/sendRulesToSW";
import { Rule } from "./types/rules";
import HeaderOperation = chrome.declarativeNetRequest.HeaderOperation;
import RuleActionType = chrome.declarativeNetRequest.RuleActionType;
import ResourceType = chrome.declarativeNetRequest.ResourceType;

export default null;
declare let self: ServiceWorkerGlobalScope;

chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled....");
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: 1,
        priority: 1,
        action: {
          type: RuleActionType.MODIFY_HEADERS,
          responseHeaders: [
            {
              operation: HeaderOperation.APPEND,
              header: "gks",
              value: "foobar",
            },
          ],
        },
        condition: {
          urlFilter: "localhost:3000",
          resourceTypes: [ResourceType.MAIN_FRAME],
        },
      },
    ],
  });
});
//
// // schedule a watchdog check every 5 minutes
// const scheduleWatchdog = () => {
//   console.log("schedule watchdog alarm to 5 minutes...");
//   chrome.alarms.create("watchdog", { periodInMinutes: 5 });
// };

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

let rules: Rule[] = [];

// Throttle Response
self.addEventListener("fetch", (event) => {
  console.log("ON FETCH!");
  if (event.request.url === "https://jsonplaceholder.typicode.com/todos/1") {
    event.respondWith(
      new Promise((res) => {
        setTimeout(() => res(true), 3000);
      }).then(() => fetch(event.request))
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});

// Listen for messages
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (isMessageDataRulesPayload(message)) {
    rules = message.rules;
    // chrome.storage.sync.set({ rules: message.rules });
    console.log("GOT RULES!", message.rules);
  }

  sendResponse();
});
