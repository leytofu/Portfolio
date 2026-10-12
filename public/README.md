# Resume PDF — Setup Instructions

This folder is where the portfolio reads your resume from.

## Where to put your resume

Place your resume PDF in this exact location:

    public/resume.pdf

That single file is the only thing the app needs. Nothing else has to change.

## How to replace it later

1. Export your updated resume as a PDF.
2. Overwrite `public/resume.pdf` with the new file (keep the exact same filename).
3. Redeploy / rebuild if you are using a production build.

Because the filename is fixed, replacing the PDF automatically updates:
- the Home page "Download Resume" button,
- the `/resume` page preview,
- the "Download PDF" and "Open in New Tab" actions on `/resume`.

No code changes are required to swap in a new resume.

## If the file is missing

As long as `public/resume.pdf` does not exist, the portfolio automatically
hides every Resume / Download CV action and shows a friendly setup hint on
the `/resume` page instead of a broken link. Visitors never see a 404.

## Notes

- The file must be a real PDF (not renamed from another format).
- Keep it reasonably sized (a typical resume is well under 5 MB).
- Vite serves everything in `public/` from the site root, so the app
  references it simply as `/resume.pdf`.
