// Aliased over "@/lib/constants" for the design-sync bundle so the process
// guard runs before the real module's top-level process.env read.
// Re-exports the real file verbatim — no values are duplicated here.
import "./process-guard";
export * from "../src/lib/constants";
