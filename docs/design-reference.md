# Portfolio redesign

Reference: the user's `Screen Recording 2026-11-07 at 9.48.17 PM.mov`.

The Angular portfolio follows the recording's dark background, red accents, large condensed headings, oversized PORTFOLIO lettering, portrait composition, three-column work grid, process section, journey, and contact layout. The live-building animation simulates Designer, Developer, and Writer cursors as sections enter the viewport. Text reveals character by character inside coloured selection boxes; project artwork assembles from a blueprint grid. Original text and layout remain in place, and all effects finish without changing content. Pause immediately restores the full page; Replay restarts the current view and later sections. Motion runs outside Angular change detection, stops when idle or the tab is hidden, and respects reduced-motion preferences.

Existing contact details, CV, article artwork, and social links are retained. The work cards distinguish this portfolio, visual explorations, and article artwork. Original section URLs still resolve to their matching section in the new page. Contact actions open email, phone, WhatsApp, or the linked social profile.

## Portrait asset

- Tool: built-in imagegen, edit mode.
- Source: `public/my-photo.png` (the original is unchanged).
- Saved output: `public/portrait-neon.png`.
- Transparent background; cyan and red portrait lighting.

Final generation prompt:

> Use case: background-extraction, identity-preserve. Asset type: transparent portrait cutout for this person's developer portfolio website. Edit target: provided photograph of Thushara. Remove ALL background, plants, sky and wall. Preserve this exact man's identity, face, curly hairstyle, purple polo shirt, pose and anatomy. Frame from top of head to waist, clean silhouette with no halo and genuine alpha transparency. Apply cinematic cyan studio lighting from the left and vivid red rim lighting on the right to the person, dark rich shadows on shirt. Photorealistic. No text, no objects, no invented accessories. Keep subject recognizably identical to source. Save generated output as a local image so it can be copied into the project.

Anton and Manrope are served locally from `public/fonts/`; their OFL license files are included beside the fonts.
