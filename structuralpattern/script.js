// script.js


// ==========================================
// 1. ADAPTER PATTERN
// ==========================================


// EXTERNAL API (Cannot Modify)

class ExternalAPI {

  sendMessage(text) {

    return `External API Sent: ${text}`;
  }
}


// ADAPTER

class APIAdapter {

  constructor(externalAPI) {

    this.externalAPI = externalAPI;
  }

  // Convert interface
  send(message) {

    return this.externalAPI.sendMessage(message);
  }
}


// CLIENT FUNCTION

function sendUsingAdapter() {

  const message =
    document.getElementById("adapterMessage").value;

  const externalAPI =
    new ExternalAPI();

  const adapter =
    new APIAdapter(externalAPI);

  const result =
    adapter.send(message);

  document.getElementById("adapterOutput").innerHTML =
    `<p>${result}</p>`;
}



// ==========================================
// 2. DECORATOR PATTERN
// ==========================================


// ORIGINAL API HANDLER

function getProfile(req) {

  return `Welcome ${req.user}.
  Profile Loaded Successfully`;
}


// DECORATOR FUNCTION

function withAuthentication(handler) {

  return function(req) {

    // Authentication Check
    if (!req.isAuthenticated) {

      return "❌ Access Denied";
    }

    // Call Original Function
    return handler(req);
  };
}


// DECORATED HANDLER

const secureProfileHandler =
  withAuthentication(getProfile);


// CLIENT FUNCTION

function accessProfile() {

  const username =
    document.getElementById("username").value;

  const authStatus =
    document.getElementById("authStatus").value === "true";

  const request = {

    user: username,
    isAuthenticated: authStatus
  };

  const result =
    secureProfileHandler(request);

  document.getElementById("decoratorOutput").innerHTML =
    `<p>${result}</p>`;
}