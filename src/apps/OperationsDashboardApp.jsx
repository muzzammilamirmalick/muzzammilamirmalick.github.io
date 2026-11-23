// The Team Operations Dashboard, running inside a MuzzOS window.
import { operationsTool } from "../data/content.js";
import ToolApp from "./ToolApp.jsx";

export default function OperationsDashboardApp() {
  return <ToolApp tool={operationsTool} />;
}
