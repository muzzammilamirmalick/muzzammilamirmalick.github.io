// Lets any app talk to the operating system, for example to open another app.
import { createContext, useContext } from "react";

// Holds: openApp(id, opener), whoamiMode (see Whoami.jsx) and reboot().
export const OsContext = createContext(null);

export function useOs() {
  return useContext(OsContext);
}
