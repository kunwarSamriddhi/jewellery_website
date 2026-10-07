// Shown while a page is loading or when its request failed
export default function Gate({ loading, error, onRetry }) {
  return (
    <div className="center">
      {loading ? "Loading..." : (
        <>
          <p className="err" style={{ marginBottom: 12 }}>{error}</p>
          <button className="btn dark" onClick={onRetry}>Try again</button>
        </>
      )}
    </div>
  );
}
