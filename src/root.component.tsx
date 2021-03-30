import React, { useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
// @ts-ignore
import { IUser, IRootProps } from "@cd/models";

const links = [
  {
    name: "Home",
    href: "/dashboard",
  },
  {
    name: "Contacts",
    href: "/contacts",
  },
];

const Root = (props: IRootProps) => {
  const [user, setUser] = useState(props.user);

  props.eventer.subscribe("USER_DATA_EVENT", (msg, data) => {
    setUser(data);
  });

  const tabs = links.map((link) => (
    <Link key={link.href} className="p-6" to={link.href}>
      {link.name}
    </Link>
  ));

  const navigation = (
    <div className="h-16 flex items-center justify-between px-6 bg-primary text-white">
      <div className="flex items-center justify-between">{tabs}</div>
      <div className="flex items-center justify-between">
        <span>Welcome, {user.fullName}</span>
        <span className="px-2">|</span>
        <Link key="/logout" to="/logout">
          Logout
        </Link>
      </div>
    </div>
  );

  return navigation;
};

export default React.memo(Root);
