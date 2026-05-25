// script.js

// =====================================
// 1. SINGLETON PATTE
// =================================

class Logger {

  constructor() {

    if (Logger.instance) {
      return Logger.instance;
    }

    this.logs = [];

    Logger.instance = this;
  }

  log(message) {

    const logMessage =
      `[LOG]: ${message}`;

    console.log(logMessage);

    this.logs.push(logMessage);

    return logMessage;
  }
}

const logger = new Logger();

function writeLog() {

  const message =
    document.getElementById("logMessage").value;

  const result =
    logger.log(message);

  document.getElementById("logOutput").innerHTML +=
    `<p>${result}</p>`;
}


// =====================================
// 2. FACTORY PATTERN
// =====================================

// Product Classes

class EmailNotification {
  send(message) {
    return `📧 Email Sent: ${message}`;
  }
}

class SMSNotification {
  send(message) {
    return `📱 SMS Sent: ${message}`;
  }
}

class PushNotification {
  send(message) {
    return `🔔 Push Notification Sent: ${message}`;
  }
}

// Factory Class

class NotificationFactory {

  static createNotification(type) {

    switch(type) {

      case "email":
        return new EmailNotification();

      case "sms":
        return new SMSNotification();

      case "push":
        return new PushNotification();

      default:
        throw new Error("Invalid Notification Type");
    }
  }
}

function sendNotification() {

  const type =
    document.getElementById("notificationType").value;

  const message =
    document.getElementById("notificationMessage").value;

  const notification =
    NotificationFactory.createNotification(type);

  const result =
    notification.send(message);

  document.getElementById("notificationOutput").innerHTML =
    `<p>${result}</p>`;
}


// =====================================
// 3. BUILDER PATTERN
// =====================================

class User {

  constructor(builder) {

    this.name = builder.name;
    this.age = builder.age;
    this.email = builder.email;
    this.phone = builder.phone;
    this.address = builder.address;
  }
}

class UserBuilder {

  constructor(name, age) {

    this.name = name;
    this.age = age;
  }

  setEmail(email) {
    this.email = email;
    return this;
  }

  setPhone(phone) {
    this.phone = phone;
    return this;
  }

  setAddress(address) {
    this.address = address;
    return this;
  }

  build() {
    return new User(this);
  }
}

function buildUser() {

  const name =
    document.getElementById("name").value;

  const age =
    document.getElementById("age").value;

  const email =
    document.getElementById("email").value;

  const phone =
    document.getElementById("phone").value;

  const address =
    document.getElementById("address").value;

  let builder =
    new UserBuilder(name, age);

  if(email) builder.setEmail(email);

  if(phone) builder.setPhone(phone);

  if(address) builder.setAddress(address);

  const user =
    builder.build();

  document.getElementById("userOutput").innerHTML = `
    <h3>User Created</h3>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Age:</strong> ${user.age}</p>
    <p><strong>Email:</strong> ${user.email || "-"}</p>
    <p><strong>Phone:</strong> ${user.phone || "-"}</p>
    <p><strong>Address:</strong> ${user.address || "-"}</p>
  `;
}