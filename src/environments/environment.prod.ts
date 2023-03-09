export const environment = {
  production: true,

  apiUrl: window["env"]["apiUrl"] || "default",
  apiUsuarios: window["env"]["apiUsuarios"] || "default",
  debug: window["env"]["debug"] || false
};
