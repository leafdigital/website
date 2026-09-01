import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Agent worktrees checked out under .claude are not part of this tree.
    ".claude/worktrees/**",
    // Design-sync tooling input, not app source. Without these, a directory
    // inside .design-sync makes `npm run lint` die with EISDIR at the root.
    ".design-sync/**",
    ".ds-sync/**",
    // Generated design-system bundle (vendor output, not hand-written source).
    "ds-bundle/**",
  ]),
  {
    /**
     * Navigation must stay in-locale. A raw `next/link` drops the visitor out
     * of their language mid-journey, and the failure is invisible unless you
     * happen to be testing in German — so it is a lint error, not a
     * convention. See docs/i18n.md §3.
     */
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/i18n/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/link",
              message:
                "Import { Link } from '@/i18n/navigation' so links stay in the active locale.",
            },
            {
              name: "next/navigation",
              importNames: [
                "redirect",
                "permanentRedirect",
                "usePathname",
                "useRouter",
              ],
              message:
                "Import locale-aware navigation from '@/i18n/navigation'. (notFound, useParams etc. are fine from next/navigation.)",
            },
          ],
        },
      ],
    },
  },
  {
    /**
     * No hardcoded copy in JSX. This is the rule that actually stops the
     * system decaying — without it, month three has English scattered through
     * new components again and nobody notices until a locale looks wrong.
     *
     * `files` is the governed set and `ignores` is the QUARANTINE LIST: pages
     * whose copy is still inline because the content rewrite will replace them
     * wholesale (docs/i18n.md §8.4). The list is also the migration tracker —
     * whatever is still on it has not been done. Delete entries, never add.
     */
    files: ["src/**/*.tsx"],
    ignores: [
      // NB: escaped — ESLint globs read a bare [locale] as a character class.
      "src/app/\\[locale\\]/page.tsx",
      "src/app/\\[locale\\]/apps/**",
      "src/app/\\[locale\\]/blog/**",
      "src/app/\\[locale\\]/services/**",
      "src/components/app-card.tsx",
      "src/components/coverage-ring.tsx",
      "src/components/waitlist-form.tsx",
      "src/lib/og.tsx",
      "src/components/ui/**",
    ],
    rules: {
      "react/jsx-no-literals": [
        "error",
        {
          // Punctuation and separators between translated fragments are not copy.
          allowedStrings: ["—", "·", "/", "|", "⌄", "©"],
          ignoreProps: true,
          noStrings: false,
        },
      ],
    },
  },
]);

export default eslintConfig;
