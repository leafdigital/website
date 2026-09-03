import { Badge } from "leaf-website";

/** App status is the reading it carries: green live, outline lab. */
export const AppStatus = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>LIVE</Badge>
    <Badge variant="outline">IN THE LAB</Badge>
  </div>
);

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>LIVE</Badge>
    <Badge variant="secondary">Beta</Badge>
    <Badge variant="outline">IN THE LAB</Badge>
    <Badge variant="destructive">Failing</Badge>
    <Badge variant="ghost">Draft</Badge>
    <Badge variant="link">Changelog</Badge>
  </div>
);
