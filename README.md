# Madlibs
Welcome to my interactive gothic story game! This is a choice-driven dark fantasy card game where you select storyline paths, watch cinematic cards shuffle, and type in your own custom words to change the outcome of tragic romance stories.

Designed in Figma First!
Before writing a single line of code, the entire user interface, visual identity, and cinematic transition flow were completely designed and mocked up in Figma. The creative journey began on Pinterest, where mood boards were curated to gather visual inspiration and adapt specific dark gothic aesthetic elements. Taking notes from these reference aesthetics and blending them with console video game menus (inspired by games like *NieR*), the layout grids, glassmorphic panels, and the precise placement of the silver corner frames were carefully drafted to capture that immersive dark-fantasy atmosphere.

How the Game Works (The Core Loop)
The game guides you through a beautiful visual sequence from start to finish:
1. **Title Screen** — You start on a beautiful gothic cover image (`Main Display.png`). The text `CLICK TO PLAY` pulses at the bottom until you click anywhere on the screen.
2. **Butterfly Transition** — The title screen fades out, and a transition screen showing a butterfly (`Choose Your Story.png`) appears for 3 seconds to set the mood.
3. **Intro Slideshow** — The game automatically cycles through 4 beautiful story-setting illustrations (`Intro 1.png` to `Intro 4.png`) every 3.5 seconds to introduce the world.
4. **Lane Picker Deck** — You are shown 3 main tarot-style cards. Hovering over them smoothly flips the artwork to show which lane you are picking. Clicking one locks in your chosen storyline path (Lane 1, 2, or 3).
5. **The 3x7 Card Grid** — You enter the master board, which programmatically generates 21 different cards in a beautiful grid. Clicking any card activates the shuffler.
6. **High-Speed Card Shuffling** — The board disappears, and the cards rapidly cycle from frame 1 to 7 right in front of your eyes to look like a real card flipping open.
7. **Character Art Showcase** — The moment the shuffling stops, the game pauses for 3 seconds on a stunning, full-screen image of your character art (`Scene X.png`) with no text boxes or menus blocking it.
8. **Word Prompt Game** — The background smoothly darkens (`Scene X-1.png`), and custom text fields (like NAME, NOUN, or VERB) fade into view. You type in your words, click `Generate Story`, and your final customized story appears inside the frame!

How My Assets Folder is Organized
The images on the computer inside the `assets/` folder match these exact names to load properly:
* Title & Transitions: `Main Display.png`, `Choose Your Story.png`
* Intro Carousels: `Intro 1.png` through `Intro 4.png`
* Matrix Selection Cards: `Card 1_1 Shuffle.png` through `Card 3_7 Shuffle.png`
* Cinematic Scene Reveals: `Scene 1.png` through `Scene 3.png`, `Scene 1-1.png` through `Scene 3-1.png`
