import { useEffect, useState } from "react";
import Account from "../components/Account.tsx";
import { IAccount } from "../models/IAccount.ts";
import { getAccountsData } from "../services/getPublicData.ts";

const User = () => {
  const [accounts, setAccounts] = useState<IAccount[]>();

  useEffect(() => {
    (async () => {
      setAccounts(await getAccountsData());
    })();
  }, []);

  if (!accounts) return null;

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />Tony Jarvis!</h1>
          <button className="edit-button">Edit Name</button>
        </div>

        <h2 className="sr-only">Accounts</h2>

        {accounts.map(x =>
          <Account key={x.id} title={x.title} amount={x.amount} description={x.description} />)}
      </main>
    </>
  );
};

export default User;