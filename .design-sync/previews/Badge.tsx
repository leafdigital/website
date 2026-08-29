import { Badge } from "leaf-website";

/** App status is what this badge carries on the site: green live, outline lab. */
export const AppStatus = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>Live</Badge>
    <Badge variant="outline">In the lab</Badge>
  </div>
);

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>Live</Badge>
    <Badge variant="secondary">Beta</Badge>
    <Badge variant="outline">In the lab</Badge>
    <Badge variant="destructive">Failing</Badge>
    <Badge variant="ghost">Draft</Badge>
    <Badge variant="link">Changelog</Badge>
  </div>
);
