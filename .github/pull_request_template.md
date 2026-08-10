## What

<!-- 1-3 sentences: the change, stated plainly. -->

## Why

<!-- The reason this change exists. Name the milestone if one applies (M1/M2/M3). -->

## How

<!-- Approach + trade-offs only: key design choices, what you deliberately did NOT do,
     anything a reviewer should look at first. Don't narrate the diff. -->

## Tickets

<!-- One block per ticket. IDs only, no links. -->

### LF-XX — <title>

<brief description of the ticket in one line>

| Acceptance criterion          | Met by        |
| ----------------------------- | ------------- |
| <AC as written in the ticket> | <file/symbol> |

## Scope

<!-- Confirm the diff stays inside the declared surface. List every touched path
     group. Call out anything outside it and why. -->

## Checklist

- [ ] `npm run lint && npm run typecheck && npm run build` green locally
- [ ] Every new page exports metadata; sitemap updated if routes changed
- [ ] Keyboard walkthrough of changed pages done (focus visible, skip-link works)
- [ ] No new `any`, non-null assertion, or lint/type suppression
- [ ] No hardcoded colors — design tokens only
