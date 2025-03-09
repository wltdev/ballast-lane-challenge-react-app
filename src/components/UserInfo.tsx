import { useEffect, useState } from "react";
import { getUser } from "../utils/storage";

export type User = {
  name: string;
  email: string;
  milestone: string;
};

export const UserInfo = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = getUser();
    setUser(user as User);
  }, []);
  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <img
          src={`https://eu.ui-avatars.com/api/?background=015641&color=ffffff&bold=true&rounded=true&font-size=0.6&size=128&length=1&name=${user?.name}`}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-2 flex flex-col text-left">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
          <p className="text-sm text-gray-500">{user?.milestone}</p>
        </div>
      </div>
    </div>
  );
};
