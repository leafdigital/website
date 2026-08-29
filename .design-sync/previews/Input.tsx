import { Button, Input } from "leaf-website";

/** The site's one real use: an email capture with a label kept for screen readers. */
export const EmailCapture = () => (
  <div className="flex max-w-md gap-2">
    <label htmlFor="preview-email" className="sr-only">
      Email for early access
    </label>
    <Input
      id="preview-email"
      type="email"
      placeholder="you@yourstore.com"
      defaultValue=""
    />
    <Button type="submit">Get early access</Button>
  </div>
);

export const States = () => (
  <div className="flex max-w-xs flex-col gap-3">
    <Input placeholder="Empty" />
    <Input defaultValue="hello@leafdigital.co" />
    <Input defaultValue="not-an-email" aria-invalid="true" />
    <Input placeholder="Disabled" disabled />
  </div>
);
