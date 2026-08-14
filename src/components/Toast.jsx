import { useEffect, useState } from "react";

export default function Toast() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let t;
    const onToast = (e) => {
      setMsg(e.detail);
      clearTimeout(t);
      t = setTimeout(() => setMsg(""), 2600);
    };
    window.addEventListener("spotflex:toast", onToast);
    return () => {
      window.removeEventListener("spotflex:toast", onToast);
      clearTimeout(t);
    };
  }, []);

  if (!msg) return null;
  return <div className="toast" role="status">{msg}</div>;
}
