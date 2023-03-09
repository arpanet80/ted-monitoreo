// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // las direcciones se definen en assets/env.js
  apiUrl: window["env"]["apiUrl"] || "default",
  apiUsuarios: window["env"]["apiUsuarios"] || "default",
  debug: window["env"]["debug"] || false

};
