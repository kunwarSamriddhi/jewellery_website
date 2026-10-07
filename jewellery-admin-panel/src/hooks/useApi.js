import { useCallback, useEffect, useState } from "react";

// Runs an async loader once on mount. Define the loader outside the component so it stays stable.
export default function useApi(loader) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try { setData(await loader()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [loader]);

  useEffect(() => { load(); }, [load]);
  return { data, setData, loading, error, reload: load };
}
