# Profile Image — Setup Instructions

The homepage hero portrait is read from this folder.

## Where to put your photo

Place your portrait photo here:

    public/images/profile.jpg

Accepted formats: `.jpg`, `.jpeg`, `.png`, or `.webp`.

## Recommended specs

- Square or near-square crop (e.g. 800×800 or 1000×1000).
- Head-and-shoulders framing, face centered slightly above middle.
- Good lighting, neutral or simple background.
- Under ~1 MB for fast loading.

## How to use a different filename

The image path is defined in one place:

    src/components/ProfilePortrait.tsx

Look for `PROFILE_PATH` and change it to match your filename, e.g.
`/images/profile.webp`. Nothing else needs to change.

## If the image is missing

The hero shows a neutral, polished silhouette placeholder instead of a
broken image. Visitors never see a 404 or a blank frame.

## Focal point

`object-position` is tuned so faces stay in frame. If your photo needs a
different crop, adjust `object-position` in the `.profile-portrait__img`
rule inside `src/index.css`.
