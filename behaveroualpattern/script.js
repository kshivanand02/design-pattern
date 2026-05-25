// script.js


// ======================================
// 1. OBSERVER PATTERN
// ======================================


// OBSERVER CLASS

class Subscriber {

  constructor(name) {
    this.name = name;
  }

  update(message) {

    return `${this.name} received:
    ${message}`;
  }
}


// SUBJECT CLASS

class NotificationService {

  constructor() {

    this.subscribers = [];
  }

  subscribe(user) {

    this.subscribers.push(user);
  }

  notify(message) {

    return this.subscribers.map(subscriber =>
      subscriber.update(message)
    );
  }
}


// CREATE SUBJECT

const service =
  new NotificationService();


// CREATE OBSERVERS

service.subscribe(
  new Subscriber("Shivanand")
);

service.subscribe(
  new Subscriber("Rahul")
);

service.subscribe(
  new Subscriber("Priya")
);


// CLIENT FUNCTION

function notifyUsers() {

  const message =
    document.getElementById("observerMessage").value;

  const results =
    service.notify(message);

  document.getElementById("observerOutput").innerHTML =
    results.map(result =>
      `<p>${result}</p>`
    ).join("");
}



// ======================================
// 2. STRATEGY PATTERN
// ======================================


// STRATEGY CLASSES

class CreditCardPayment {

  pay(amount) {

    return `💳 Paid ₹${amount}
    using Credit Card`;
  }
}

class PayPalPayment {

  pay(amount) {

    return `🅿 Paid ₹${amount}
    using PayPal`;
  }
}

class UPIPayment {

  pay(amount) {

    return `📱 Paid ₹${amount}
    using UPI`;
  }
}


// CONTEXT CLASS

class PaymentContext {

  setStrategy(strategy) {

    this.strategy = strategy;
  }

  pay(amount) {

    return this.strategy.pay(amount);
  }
}


// CLIENT FUNCTION

function processPayment() {

  const amount =
    document.getElementById("amount").value;

  const method =
    document.getElementById("paymentMethod").value;

  const payment =
    new PaymentContext();

  // Select Strategy
  switch(method) {

    case "credit":
      payment.setStrategy(
        new CreditCardPayment()
      );
      break;

    case "paypal":
      payment.setStrategy(
        new PayPalPayment()
      );
      break;

    case "upi":
      payment.setStrategy(
        new UPIPayment()
      );
      break;
  }

  const result =
    payment.pay(amount);

  document.getElementById("strategyOutput").innerHTML =
    `<p>${result}</p>`;
}