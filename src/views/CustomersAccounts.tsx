import CustomersTable from "../components/CustomersTable";
import styles from "./ClientsAccounts.module.css";

const CustomersAccounts = () => {
  return (
    <div>
      <h1 className="text-center p-3">Customers Accounts</h1>
      <CustomersTable />
    </div>
  );
};

export default CustomersAccounts;
