import { useState } from "react";
import { Gem } from "lucide-react";

// Product image with a gem icon fallback (no image, or the link is broken)
export default function Thumb({ src, size = 40 }) {
  const [bad, setBad] = useState(false);
  return (
    <span className="thumb" style={{ width: size, height: size }}>
      {src && !bad ? <img src={src} alt="" onError={() => setBad(true)} /> : <Gem size={size * 0.5} />}
    </span>
  );
}
