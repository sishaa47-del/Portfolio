# Artwork

Drop image files here. The site picks them up automatically on save — no code change.
See `/images` on the running site for the same list with live "in place / awaiting" status.

| File                      | Size        | Fold                |
|---------------------------|-------------|---------------------|
| portrait.jpg              | 1200 × 1500 | Hero (portrait, 4:5)|
| restroworks-hero.jpg      | 1600 × 1000 | Restroworks         |
| highradius-hero.jpg       | 1600 × 1000 | HighRadius          |
| dot-hero.jpg              | 1600 × 1000 | Dot                 |
| dot-secondary.jpg         | 1200 × 900  | Dot                 |
| hamsa-hero.jpg            | 1600 × 1000 | Hamsa               |
| hamsa-secondary.jpg       | 1200 × 900  | Hamsa               |
| vivi-hero.jpg             | 1600 × 1000 | vIVI                |
| vivi-secondary.jpg        | 1200 × 900  | vIVI                |
| zimyo-hero.jpg            | 1600 × 1000 | Zimyo               |
| a24-hero.jpg              | 1600 × 1000 | A24                 |

`.png`, `.webp` and `.avif` work too — only the name matters.

## Two things that affect how you crop

**The plate is not a rectangle.** Every image is clipped to a shape whose top and
bottom edges bow slightly (the portrait bows on its left and right instead), so a
few pixels are shaved off the middle of each long edge. Keep type and faces away
from the extreme edges.

**Images are cropped from the centre-top** when the aspect ratio doesn't match
exactly, so anything critical should sit in the upper two-thirds.

Keep each file under roughly 400KB.

Each fold has its own background colour, listed in `src/data/showcase.js`. Artwork
that sits on a dark ground will blend into the fold; artwork on white will read as
a bright panel. Both work — just make it a decision.

Rendered slides from the original decks are in `design-reference/rendered-slides/`
if you want them as source material.
