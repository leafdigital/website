---
category: Primitives
---

# Card

Surface container built from slots. `Card` owns the ring border, radius and the
`--card-spacing` rhythm; the parts inherit it, so never add your own padding to
the parts.

## Parts

`CardHeader` · `CardTitle` · `CardDescription` · `CardAction` · `CardContent` ·
`CardFooter`

`size="sm"` tightens `--card-spacing` from `4` to `3` for denser lists.

## Notes

- `CardAction` only positions correctly inside `CardHeader` — it takes the
  header grid's second column.
- `CardTitle` renders a `div`. When the card title belongs in the page outline,
  render your own heading element instead (this is what `AppCard` does).
- A first-child `<img>` bleeds to the card's top edge automatically.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Leaf Alt Text</CardTitle>
    <CardDescription>
      Writes the alt text your catalog is missing.
    </CardDescription>
    <CardAction>
      <Badge>Live</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter>
    <Button variant="outline" size="sm">
      See the app
    </Button>
  </CardFooter>
</Card>
```
