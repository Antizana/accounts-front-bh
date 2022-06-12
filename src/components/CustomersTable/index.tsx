import { useState, useEffect, memo } from "react";
import AccountsTable from "../AccountsTable";

const CustomersTable = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentCustomer, setCurrentCustomer] = useState({} as Customer);

  // const { REACT_APP_SERVER_URL } = process.env;
  const REACT_APP_SERVER_URL = "";
  const baseURL = REACT_APP_SERVER_URL || "http://localhost:8000/api/v1";

  const fetchCustomers = () => {
    fetch(`${baseURL}/customers`)
      .then((response) => {
        return response.json();
      })
      .then((data: Customer[]) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchCustomers();
    setCurrentCustomer({} as Customer);
  }, []);

  const setActiveCustomer = (customer: Customer, index: number) => {
    setCurrentCustomer(customer);
    setCurrentIndex(index);
  };

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-lg-4 w-25 p-3">
          <h3>Customers</h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                  </tr>
                </thead>
                <tbody>
                  {customers &&
                    customers.map((customer, index) => (
                      <tr
                        className={
                          index === currentIndex ? "table-primary " : ""
                        }
                        onClick={() => setActiveCustomer(customer, index)}
                        key={customer.id}
                      >
                        <td className="col-md-1">{customer.id}</td>
                        <td className="col-md-2">{customer.name}</td>
                        <td className="col-md-2">{customer.surname}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="col-lg-8 w-75 px-3">
          <AccountsTable customerId={currentCustomer.id} />
        </div>
      </div>
    </div>
  );
};

export default memo(CustomersTable);
