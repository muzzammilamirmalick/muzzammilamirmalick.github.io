// The Click & Collect Training Simulator, running inside a MuzzOS window.
import { trainingTool } from "../data/content.js";
import ToolApp from "./ToolApp.jsx";

export default function TrainingSimulatorApp() {
  return <ToolApp tool={trainingTool} />;
}
