import { useEffect, useState } from "react";
import { getAccountsData } from "../services/getPublicData.ts";
import { getProfile } from "../services/apiCalls.ts";
import { IAccount } from "../models/IAccount.ts";
import { IProfileResponse } from "../models/user/IProfileResponse.ts";
import Account from "../components/Account.tsx";

interface IUser {
  firstName: string;
  lastName: string;
}

const User = () => {
  const [accounts, setAccounts] = useState<IAccount[]>();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    (async () => {
      setUser(profileRequestToDto(await getProfile()));
      setAccounts(await getAccountsData());
    })();
  }, []);

  if (!accounts || !user) return null;

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{user.firstName} {user.lastName}!</h1>
          <button className="edit-button">Edit Name</button>
        </div>

        <h2 className="sr-only">Accounts</h2>

        {accounts.map(x =>
          <Account key={x.id} title={x.title} amount={x.amount} description={x.description} />)}
      </main>
    </>
  );
};

const profileRequestToDto = (request: IProfileResponse): IUser => {
  const data = request.body;

  return {
    firstName: data.firstName,
    lastName: data.lastName,
  };
};

export default User;