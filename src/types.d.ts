type Customer = {
  id: number;
  name: string;
  surname: string;
}

type Account = {
  id: number;
  balance: number;
  customer: {
    name: string;
    surname: string;
  };
  transactions: Transactions<Transaction>[];

}

type Transaction = {
  id: number;
  amount: number;
  type: string;
}