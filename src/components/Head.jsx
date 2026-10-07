import { getUser } from "../api/client";

// Page title bar. Pass children to replace the admin avatar (e.g. an action button).
export default function Head({ title, sub, children }) {
  const name = getUser()?.name || "Admin";
  return (
    <div className="top">
      <div><h1>{title}</h1><p>{sub}</p></div>
      {children || <div className="who"><div className="avatar">{name[0].toUpperCase()}</div><b>{name}</b></div>}
    </div>
  );
}
