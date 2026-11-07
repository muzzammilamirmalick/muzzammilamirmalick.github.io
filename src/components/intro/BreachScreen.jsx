// What the monitor shows during the breach: the red alert, the three firewalls
// cracking, the glitch and then ACCESS GRANTED.
// mode: "alert", "glitch" or "granted". flash goes up by one each time the monitor flashes.
import { motion } from "motion/react";

const FIREWALLS = [1, 2, 3];

function FirewallBar({ number, cracked }) {
  return (
    <div className={cracked ? "firewall is-cracked" : "firewall"}>
      <span className="firewall-bar" aria-hidden="true">
        {/* Two halves with a jagged edge. They split apart when the firewall cracks. */}
        <span className="firewall-half firewall-left" />
        <span className="firewall-half firewall-right" />
      </span>
      <span className="firewall-label">
        FIREWALL {number}/3{cracked ? " BYPASSED" : ""}
      </span>
    </div>
  );
}

export default function BreachScreen({ mode, cracked, flash, style }) {
  const granted = mode === "granted";

  return (
    <motion.div
      className={`breach is-${mode}`}
      style={style}
      role="status"
      aria-label={granted ? "Access granted" : "Intrusion detected"}
    >
      {granted ? (
        <p className="breach-granted">ACCESS GRANTED</p>
      ) : (
        <>
          <p className="breach-alert">[ !! ] INTRUSION DETECTED</p>
          <div className="firewalls">
            {FIREWALLS.map((number) => (
              <FirewallBar key={number} number={number} cracked={cracked >= number} />
            ))}
          </div>
        </>
      )}
      {/* A new key restarts this one-time flash. It stays inside the monitor. */}
      <span className="breach-flash" key={flash} data-flash={flash} />
    </motion.div>
  );
}
