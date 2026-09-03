import { Header } from "leaf-website";

/**
 * The whole bar, exactly as it ships — logo, the Apps link, and the per-page
 * CTA. It takes no props and reads the path itself; a preview has no route, so
 * this is the default "Free scan" CTA. Full-bleed by design.
 */
export const Default = () => <Header />;
