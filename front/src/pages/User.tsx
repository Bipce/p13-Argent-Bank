import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAccountsData } from "../services/getPublicData.ts";
import { getProfile } from "../services/apiCalls.ts";
import { AppDispatch } from "../app/store.ts";
import { setUser } from "../features/user/userSlice.ts";
import { IAccount } from "../models/IAccount.ts";
import Account from "../components/Account.tsx";

interface IUser {
  firstName: string;
  lastName: string;
}


const User = () => {
  const [accounts, setAccounts] = useState<IAccount[]>();
  const [userData, setUserData] = useState<IUser>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getProfile();
        const { firstName, lastName } = data.body;

        dispatch(setUser({ firstName, lastName }));
        setUserData({ firstName, lastName });

        setAccounts(await getAccountsData());
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  if (!accounts || !userData) return null;

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{userData.firstName} {userData.lastName}!</h1>
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