import { memo, useEffect, useState } from "react";

interface TransactionsTableProps {
  customerId: number;
  accountId: number;
}

const TransactionsTable = ({
  customerId,
  accountId,
}: TransactionsTableProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // const { REACT_APP_SERVER_URL } = process.env;
  const REACT_APP_SERVER_URL = "";
  const baseURL = REACT_APP_SERVER_URL || "http://localhost:8000/api/v1";

  const fetchTransactions = (accountId: number) => {
    if (!accountId) {
      setLoading(false);
      return;
    }
    fetch(`${baseURL}/transactions/account_transactions/${accountId}`)
      .then((response) => {
        return response.json();
      })
      .then((data: Transaction[] | Transaction) => {
        setLoading(false);
        if (!Array.isArray(data)) {
          setTransactions([data]);
          return;
        }
        setTransactions(data as Transaction[]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchTransactions(accountId);
  }, [accountId]);

  useEffect(() => {
    setCurrentIndex(-1);
    setTransactions([]);
  }, [customerId]);

  return (
    <div>
      <h3>Transactions</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th className="text-center" scope="col">
                Amount
              </th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((transaction, index) => (
                <tr
                  className={index === currentIndex ? "table-primary " : ""}
                  onClick={() => setCurrentIndex(index)}
                  key={transaction.id}
                >
                  <td>{transaction.id}</td>
                  <td className="text-center">{transaction.amount}</td>
                  <td>{transaction.type}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default memo(TransactionsTable);
