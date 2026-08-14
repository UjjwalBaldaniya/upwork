export default function PhoneMock({ src, alt, size = "lg", className = "" }) {
  return (
    <figure className={`device device-${size} ${className}`}>
      <img src={src} alt={alt} />
    </figure>
  );
}
