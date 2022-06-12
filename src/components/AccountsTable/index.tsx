import { memo, useEffect, useState } from "react";
import TransactionsTable from "../TransactionsTable";

interface AccountsTableProps {
  customerId: number;
}

const AccountsTable = ({ customerId }: AccountsTableProps) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentAccount, setCurrentAccount] = useState({} as Account);

  // const { REACT_APP_SERVER_URL } = process.env;
  const REACT_APP_SERVER_URL = "";
  const baseURL = REACT_APP_SERVER_URL || "http://localhost:8000/api/v1";

  const fetchAccounts = (customerId: number) => {
    if (!customerId) {
      setLoading(false);
      return;
    }
    fetch(`${baseURL}/accounts/customer_accounts/${customerId}`)
      .then((response) => {
        return response.json();
      })
      .then((data: Account[]) => {
        setAccounts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setCurrentAccount({} as Account);
    setCurrentIndex(-1);
    fetchAccounts(customerId);
  }, [customerId]);

  const setActiveAccount = (account: Account, index: number) => {
    setCurrentAccount(account);
    setCurrentIndex(index);
  };

  return (
    <div className="container-fluid px-3">
      <div className="row">
        <div className="col-lg-4 w-50 p-3">
          <h3>Accounts</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th className="text-center" scope="col">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {accounts &&
                  accounts.map((account, index) => (
                    <tr
                      className={index === currentIndex ? "table-primary " : ""}
                      onClick={() => setActiveAccount(account, index)}
                      key={account.id}
                    >
                      <td className="col-md-1">{account.id}</td>
                      <td className="text-center col-md-2">
                        {account.balance}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="col-lg-4 w-50 p-3">
          <TransactionsTable
            customerId={customerId}
            accountId={currentAccount.id}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(AccountsTable);
