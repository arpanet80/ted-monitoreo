(function(window) {
    window["env"] = window["env"] || {};

    /////////////////////////////////////////////////////////////////////////
    // https://pumpingco.de/blog/environment-variables-angular-docker/
    /////////////////////////////////////////////////////////////////////////
    // Environment variables

    //----------------------------------------------
    // QUE MAS HAY QUE HACER
    //----------------------------------------------
    // Hay que crear la carpeta environments con el cmando
    // ng g environmentss
    //
    // En el archivo tsconfig.json agregar en la seccion: "compilerOptions": {
    // debajo de "useDefineForClassFields": false,
    // "lib": [
    //   "ES2022",
    //   "dom"
    // ],
    // agregar las siguientes 3 lineas
    // "noImplicitAny": false,        // para qe no exija que pongas any en todo lado
    // "resolveJsonModule": true,
    // "esModuleInterop": true
    // sino da error al detectar el json

    window["env"]["apiUrl"] = "https://localhost:7108/api/";
    window["env"]["apiUsuarios"] = "http://10.51.15.110:8081/api/";
    window["env"]["debug"] = true;

  })(this);
