import { useEffect, useState } from "react";
import { getAccountsData } from "../services/getPublicData.ts";
import { changeProfileName, getProfile } from "../services/apiCalls.ts";
import { selectUser, setUser } from "../features/user/userSlice.ts";
import { useAppDispatch, useAppSelector } from "../app/store.ts";
import { IAccount } from "../models/IAccount.ts";
import Account from "../components/Account.tsx";

const User = () => {
  const [accounts, setAccounts] = useState<IAccount[]>();
  const { firstName, lastName } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const data = await changeProfileName();
    const { firstName, lastName } = data.body;
    dispatch(setUser({ firstName, lastName }));
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await getProfile();
        const { firstName, lastName } = data.body;
        dispatch(setUser({ firstName, lastName }));

        setAccounts(await getAccountsData());
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

  if (!accounts) return null;

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{firstName} {lastName}!</h1>
          <button className="edit-button" onClick={handleClick}>Edit Name</button>
        </div>

        <h2 className="sr-only">Accounts</h2>

        {accounts.map(x =>
          <Account key={x.id} title={x.title} amount={x.amount} description={x.description} />)}
      </main>
    </>
  );
};

export default User;