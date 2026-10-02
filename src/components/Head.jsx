// Page title bar. Pass children to replace the default admin avatar (e.g. an action button).
export default function Head({ title, sub, children }) {
  return (
    <div className="top">
      <div><h1>{title}</h1><p>{sub}</p></div>
      {children || <div className="who"><div className="avatar">A</div><b>Admin</b></div>}
    </div>
  );
}
