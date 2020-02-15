//let balance = 500.00;

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balanceAmt = 0;
    for (let transaction of this.transactions) {
      balanceAmt +=  transaction.value;
    }

    return balanceAmt;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}


class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }

}




class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return this.amount * (-1);
  }

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");
console.log('Balance:', myAccount.balance);

const t1 = new Deposit(120.0,myAccount);
t1.commit();
console.log(`Transaction 1:`,t1);
console.log('Balance:', myAccount.balance);

const t2 = new Withdrawal(150.25,myAccount);
t2.commit();
console.log('Transaction 2:', t2);
console.log('Balance:', myAccount.balance);

const t3 = new Withdrawal(9.99,myAccount);
t3.commit();
console.log('Transaction 3:', t3);
console.log('Balance:', myAccount.balance);

const t4 = new Deposit(500.0,myAccount);
t4.commit();
console.log(`Transaction 4:`,t4);
console.log('Balance:', myAccount.balance);
