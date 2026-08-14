import { Link } from "react-router-dom";

export default function Logo({ to = "/" }) {
  return (
    <Link to={to} className="logo" aria-label="SpotFlex home">
      Spot<em>Flex</em>
    </Link>
  );
}
