---
category: Primitives
---

# Card

Surface container built from slots: white ground, one ink hairline **border**
(not a ring — the border participates in layout so inner tiles line up), 18px
radius, and the two-layer `shadow-card`. `Card` owns the `--card-spacing`
rhythm; the parts inherit it, so never add your own padding to the parts.

The v3 pages don't use it: their cards are plain divs
(`border-hairline bg-card rounded-xl p-[30px]`, or the green featured variant),
and the suite grid uses [AppCard](./AppCard.md). Card is the right answer when a
screen needs the header/action/footer structure those hand-rolled boxes don't
have.

## Parts

`CardHeader` · `CardTitle` · `CardDescription` · `CardAction` · `CardContent` ·
`CardFooter`

`size="sm"` tightens `--card-spacing` from `5` to `4` for denser lists.

## Notes

- `CardAction` only positions correctly inside `CardHeader` — it takes the
  header grid's second column.
- `CardTitle` renders a `div` at `text-h3`. When the card title belongs in the
  page outline, render your own heading element instead (this is what `AppCard`
  does).
- A first-child `<img>` bleeds to the card's top edge automatically.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Image Voice</CardTitle>
    <CardDescription>Live on the Shopify App Store.</CardDescription>
    <CardAction>
      <Badge>LIVE</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>
    <Button variant="secondary" size="sm">
      See the app
    </Button>
  </CardFooter>
</Card>
```
