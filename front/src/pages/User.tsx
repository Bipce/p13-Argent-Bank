import React, { useEffect, useState } from "react";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getAccountsData } from "../services/getPublicData.ts";
import { selectUser, setUser } from "../features/userSlice.ts";
import { useAppDispatch, useAppSelector } from "../app/store.ts";
import { useUpdateUserMutation } from "../features/apiSlice.ts";
import { IAccount } from "../models/IAccount.ts";
import Account from "../components/Account.tsx";

const User = () => {
  const [accounts, setAccounts] = useState<IAccount[]>();
  const [isEditing, setIsEditing] = useState(false);
  const { firstName, lastName } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [updateUser] = useUpdateUserMutation();

  type FormData = {
    firstName: string,
    lastName: string
  }

  const handleIsEditing = () => {
    setIsEditing(prev => !prev);
  };

  const schema: ZodType<FormData> = z.object({
    firstName: z.string().min(2, { message: "First name has to be 2 characters minimum." }),
    lastName: z.string().min(2, { message: "Last name has to be 2 characters minimum." }),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    try {
      const updateData = await updateUser({ firstName: data.firstName, lastName: data.lastName }).unwrap();
      const { firstName, lastName } = updateData.body;

      dispatch(setUser({ firstName, lastName }));
      setIsEditing(false);
    } catch (err) {
      console.error("Failed", err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
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
          {isEditing &&
            <form className="editing-form" onSubmit={handleSubmit(submitData)}>
              <div className="editing-wrapper">
                <div>
                  <label htmlFor="firstName"></label>
                  <input type="text" placeholder="First Name..." {...register("firstName")} />
                  {errors.firstName && <span className="editing-error error">{errors.firstName.message}</span>}
                </div>

                <div>
                  <label htmlFor="lastName"></label>
                  <input type="text" id="lastName" placeholder="Last Name..." {...register("lastName")} />
                  {errors.lastName && <span className="editing-error error">{errors.lastName.message}</span>}
                </div>
              </div>


              <div className="editing-wrapper">
                <button type="submit">Save</button>
                <button type="submit" onClick={handleIsEditing}>Cancel</button>
              </div>
            </form>}

          {!isEditing &&
            <button className="edit-button" onClick={handleIsEditing}>Edit Name</button>
          }
        </div>

        <h2 className="sr-only">Accounts</h2>
        {accounts.map(x =>
          <Account key={x.id} title={x.title} amount={x.amount} description={x.description} />)}
      </main>
    </>
  );
};

export default User;