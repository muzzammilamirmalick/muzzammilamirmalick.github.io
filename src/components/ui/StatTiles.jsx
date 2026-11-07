// A row of big counting numbers with a short label under each one.
import CountUp from "./CountUp.jsx";
import "./StatTiles.css";

export default function StatTiles({ stats }) {
  return (
    <ul className="stat-tiles">
      {stats.map((stat) => (
        <li className="stat-tile" key={stat.label}>
          <span className="stat-value">
            <CountUp {...stat} />
          </span>
          <span className="stat-label">{stat.label}</span>
        </li>
      ))}
    </ul>
  );
}
