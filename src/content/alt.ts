/**
 * Image descriptions (alt text) for search engines, AI assistants and screen
 * readers, keyed by file name without the extension. They are never shown on
 * the page. An image not listed here falls back to the text around it (a card
 * title, for example), so newly uploaded photos still get a description.
 */
const ALT: Record<string, string> = {
  // Build for Impact hackathons, Singapore and Seoul
  "bfi-cohort": "Build for Impact 2026 hackathon cohort, Singapore",
  "bfi-champions": "Build for Impact 2026 hackathon champions on stage with their certificates",
  "bfi-girls": "Students laughing while working on laptops at the Build for Impact hackathon",
  "bfi-huddle": "Students huddled around a laptop at the Build for Impact hackathon",
  "bfi-team-laugh": "Students laughing while building their project together",
  "seoul-group": "Build for Impact Seoul participants in a group photo",
  "seoul-panel": "Expert panel speaking to students at Build for Impact Seoul",
  "seoul-network": "Students networking with mentors at Build for Impact Seoul",

  // Talks, workshops and camps
  "openai-talk": "OpenAI speaker presenting “Creating Multimodal Experiences with OpenAI” to students",
  "google-talk": "A Google DeepMind speaker presenting at SGInnovate",
  "present-room": "Students presenting their project to a panel",
  "workshop-table": "Students mapping ideas with sticky notes at a design thinking workshop",
  "ntu-group": "Students and mentors in a group photo after a Build Learning workshop",
  "pca-robot": "Students testing a robot car at an AI Tinkery camp",
  "pca-laptop": "Students vibe-coding a game together on a laptop",
  "img-1337-9v95o": "Students presenting their work to a mentor in a city office",
  "6258225958749933859-oatql": "Two students reviewing their project with a mentor in a meeting room",
  "a1-04062-nh0k2": "A speaker explaining how product managers, designers and developers work together",

  // Global Series competitions
  "gic-visual": "Illustration of students collaborating over a map for the Global Innovation Challenge",
  "gc-carnival": "A giant carnival figure burning above a crowd at night, from a Global Cultures student project",
  "gc-consoles": "A pile of retro game consoles and controllers, from a Global Cultures student project",
  "gi-durian": "Black-and-white portrait of a young man at a fruit stall, from a Global Impact student project",
  "gi-truck": "Black-and-white photo of an overloaded truck on a city street, from a Global Impact student project",
  "gi-interview": "A student interviewing an elderly man at home, from a Global Impact student project",
  mongolia: "A Mongolian musician playing a horsehead fiddle, from the student project “The Voice of Mongolia”",

  // Singapore
  gardens: "Supertrees at Gardens by the Bay, Singapore",
  chinatown: "A busy evening on Chinatown Food Street, Singapore",
  "bugis-town": "Shophouses and towers in central Singapore",
  "florian-wehde-ly87ghwdgno-unsplash-n2fy0": "Evening traffic streaming past shophouses on a busy Asian city street",
};

/** The description for an image: from the list above, else `fallback`. */
export function altFor(src: string | undefined, fallback = ""): string {
  const name = src?.split("/").pop()?.replace(/\.[a-z0-9]+$/i, "") ?? "";
  return ALT[name] ?? fallback;
}
