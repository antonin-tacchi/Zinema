import { useEffect } from "react";

export default function AdBanner({
  className = "",
  style = { display: "block" },
  format = "auto",
  responsive = "true",
}) {
  useEffect(() => {
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
    }
  }, []);

  return (
    <div className={`my-10 flex justify-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-XXXXXXXXXXXX"
        data-ad-slot="YYYYYYYYYY"
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
