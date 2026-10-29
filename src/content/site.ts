/**
 * Site content.
 *
 * Every editable piece of the website lives here, grouped the same way the
 * CMS tables will be (settings, programs, competitions, people, partners,
 * student work …). When the database is connected these objects become the
 * seed data and pages read the same shapes from the database instead.
 */

const P = (n: string) => `/img/photos/${n}.webp`;
const PPL = (n: string) => `/img/people/${n}.webp`;
const LOGO = (n: string) => `/img/logos/${n}.png`;
const WORK = (n: string) => `/img/work/${n}.webp`;
const FLAG = (n: string) => `/img/flags/${n}.svg`;

export const LUMA_URL = "https://luma.com/globalinnovationchallenge";
export const ARCHIVES_URL = "https://globalarchives.org";

/* ───────────── Brand & global settings ───────────── */
export const settings = {
  countdown: { days: "Days", hours: "Hours", mins: "Mins", secs: "Secs", short: ["d", "h", "m", "s"] },
  skipLink: "Skip to content",
  brand: {
    accent: "#F05127",
    green: "#93CE98",
    yellow: "#F9C131",
    blue: "#1F69AD",
    cream: "#F8EEC4",
    background: "#07080B",
    ink: "#F2F2F0",
    fontDisplay: "Montserrat",
    fontBody: "Inter",
    textScale: 1,
    headingScale: 1,
    showGrid: false,
    motion: true,
  },
  logo: LOGO("bl_logo"),
  email: "hello@buildlearning.co",
  phones: ["+65 8223 2551 (SG)", "+1 650 248 7785 (US)"],
  footer: {
    tagline: "Singapore · Seoul · San Francisco",
    exploreLabel: "Explore",
    contactLabel: "Contact",
    followLabel: "Follow",
    links: [
      { label: "Programs", href: "/programs" },
      { label: "Competitions", href: "/competitions" },
      { label: "Immersions", href: "/immersion" },
      { label: "Schools & Partners", href: "/partners" },
      { label: "The Global Archives ↗", href: ARCHIVES_URL },
    ],
    social: [
      { label: "Instagram", href: "https://www.instagram.com/buildlearning.co" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/buildlearning/" },
    ],
    copyright: "© {year} Build Learning",
  },
  /** Phone layout only. */
  mobile: {
    menuButton: { label: "Explore Programs", href: "/programs" },
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Programs", href: "/programs" },
  { label: "Competitions", href: "/competitions" },
  { label: "Immersions", href: "/immersion" },
  { label: "Schools & Partners", href: "/partners" },
  { label: "Student Work ↗", href: ARCHIVES_URL, external: true },
  { label: "About", href: "/about" },
];

/* ───────────── Shared ───────────── */
export const stats = [
  { value: 300, suffix: "+", label: "Students" },
  { value: 14, suffix: "+", label: "Countries" },
  { value: 30, suffix: "+", label: "Projects built" },
  { value: 200, suffix: "+", label: "Hours coached" },
];

export type Partner = { name: string; role: string; logo: string; height: number };
export const partners: Partner[] = [
  { name: "Google", role: "Speaker & judge", logo: LOGO("google"), height: 26 },
  { name: "OpenAI", role: "AI sponsor", logo: LOGO("openai"), height: 28 },
  { name: "Stanford HAI", role: "Keynote", logo: LOGO("hai"), height: 26 },
  { name: "Stanford University", role: "Mentor network", logo: LOGO("stanford"), height: 32 },
  { name: "IMDA", role: "Event sponsor", logo: LOGO("imda"), height: 30 },
  { name: "SGInnovate", role: "Event sponsor", logo: LOGO("sginnovate"), height: 20 },
  { name: "AI Singapore", role: "Supporting partner", logo: LOGO("aisg"), height: 20 },
  { name: "Lovable", role: "AI sponsor", logo: LOGO("lovable"), height: 22 },
  { name: "Cloudflare", role: "AI sponsor", logo: LOGO("cloudflare"), height: 30 },
  { name: "NTU Singapore", role: "Partner", logo: LOGO("ntu"), height: 34 },
  { name: "Samsung", role: "Industry judge", logo: LOGO("samsung"), height: 18 },
  { name: "Oliver Wyman", role: "Industry judge", logo: LOGO("oliverwyman"), height: 20 },
  { name: "Kakao", role: "Speaker · Seoul", logo: LOGO("kakao"), height: 24 },
  { name: "Coupang", role: "Speaker · Seoul", logo: LOGO("coupang"), height: 24 },
  { name: "Kinaya Ventures", role: "Partner", logo: LOGO("kinaya"), height: 28 },
  { name: "eduK8", role: "Immersion partner", logo: LOGO("eduk8"), height: 26 },
];
/** Logos used on event cards but not in the scrolling strip. */
const extraLogos: Partner[] = [
  { name: "Liminal", role: "Speaker · Seoul", logo: LOGO("liminal"), height: 36 },
];
export const logo = (name: string) =>
  partners.find((p) => p.name === name) ?? extraLogos.find((p) => p.name === name);

export type Person = { name: string; role: string; bio: string; photo: string };
export const people: Record<string, Person> = {
  jinyi: {
    name: "Jin Yi Chua",
    role: "Co-founder · Innovation",
    bio: "Senior Venture Architect, Wright Partners. Ex-consultant to Google, ByteDance and Samsung.",
    photo: PPL("jinyi"),
  },
  ash: {
    name: "Ash Ang",
    role: "Co-founder · Learning & Tech",
    bio: "Stanford MS Learning Design & Technology. Founding mentor, Stanford Accelerator for Learning.",
    photo: PPL("ash"),
  },
  karin: {
    name: "Dr Karin Forssell",
    role: "Stanford University",
    bio: "Director, Stanford AI Tinkery; Senior Lecturer, Stanford GSE.",
    photo: PPL("karin"),
  },
  pratyusha: {
    name: "Pratyusha Mukherjee",
    role: "Google",
    bio: "GenAI Partnerships Lead.",
    photo: PPL("pratyusha"),
  },
  gabriel: {
    name: "Gabriel Chua",
    role: "OpenAI",
    bio: "Developer Experience Engineer.",
    photo: PPL("gabriel"),
  },
  lily: { name: "Lily Li", role: "AWS", bio: "Solutions Architect.", photo: PPL("lily") },
  fayaz: {
    name: "Fayaz Ahmed",
    role: "Cloudflare",
    bio: "Senior Developer Educator.",
    photo: PPL("fayaz"),
  },
  mark: {
    name: "Mark Pereira",
    role: "AI Singapore",
    bio: "Head of Partnerships, Strategy & Growth.",
    photo: PPL("mark"),
  },
  hari: {
    name: "Prof. Hari Subramonyam",
    role: "Stanford University",
    bio: "Speaker, Build for Impact.",
    photo: PPL("hari"),
  },
  imama: {
    name: "Imama Owaisi",
    role: "Stanford University",
    bio: "Mentor, Winter Case Competition.",
    photo: PPL("imama"),
  },
  jennifer: {
    name: "Jennifer Lin",
    role: "Nitra · Stanford",
    bio: "Chief of Staff.",
    photo: PPL("jennifer"),
  },
  gift: {
    name: "Dr Gift Iyioku",
    role: "Stanford Hoover Institution",
    bio: "Research Analyst.",
    photo: PPL("gift"),
  },
  emma: {
    name: "Emma Parish",
    role: "Princeton University",
    bio: "Ex-Admissions Director.",
    photo: PPL("emma"),
  },
  hilary: {
    name: "Hilary Geneva Tackie",
    role: "UPenn",
    bio: "Ex-White House Policy Researcher.",
    photo: PPL("hilary"),
  },
  ryan: { name: "Ryan Chua", role: "Samsung", bio: "Government Affairs.", photo: PPL("ryan") },
  deborah: {
    name: "Deborah Oludimu",
    role: "A Pad for Her",
    bio: "Lawyer & founder, Nigeria.",
    photo: PPL("deborah"),
  },
  queenstar: {
    name: "Queenstar Akrong",
    role: "Harlem Children’s Zone",
    bio: "Director; founder, No Debt Degree.",
    photo: PPL("queenstar"),
  },
  siobhan: {
    name: "Siobhan Curtis",
    role: "Quantum Consumer Solutions",
    bio: "Senior Strategist.",
    photo: PPL("siobhan"),
  },
  bruno: {
    name: "Bruno Ikeuti",
    role: "Consulate General of Brazil, SF",
    bio: "Government Affairs.",
    photo: PPL("bruno"),
  },
  angus: {
    name: "Dr Angus Whitehead",
    role: "NIE / NTU Singapore",
    bio: "Lecturer, English Language & Literature.",
    photo: PPL("angus"),
  },
  sangah: {
    name: "Sangah Lee",
    role: "Coupang",
    bio: "Executive Programs Lead, Developer Relations.",
    photo: PPL("sangah"),
  },
  sreejith: {
    name: "Sreejith Mohan",
    role: "StartX",
    bio: "Program Manager.",
    photo: PPL("sreejith"),
  },
  joshua: { name: "Joshua Choy", role: "Liminal", bio: "Investment Lead.", photo: PPL("joshua") },
  stephanie: {
    name: "Stephanie How",
    role: "Liminal",
    bio: "Talent & Early Careers Lead.",
    photo: PPL("stephanie"),
  },
  khongorzul: {
    name: "Khongorzul Bat-Ireedui",
    role: "Admissions",
    bio: "Stanford Makery mentor. MS Learning Design & Technology, Stanford.",
    photo: PPL("khongorzul"),
  },
};

/** `href` is where the card links to; leave it empty to link to The Global Archives. */
export type Work = { category: string; title: string; by: string; cover: string; href: string };
export const studentWork: Work[] = [
  {
    category: "Global Impact",
    title: "What the City Throws Away",
    by: "Jonathan Liu · China · 2026",
    cover: WORK("city"),
    href: "",
  },
  {
    category: "Global Cultures",
    title: "Namma Bangalore",
    by: "Zidaan Pasha · India · 2026",
    cover: WORK("namma"),
    href: "",
  },
  {
    category: "Global Impact",
    title: "Will the Looms Fall Silent?",
    by: "Mauli Sinha · India · 2026",
    cover: WORK("looms"),
    href: "",
  },
  {
    category: "Global Cultures",
    title: "Hanji: Tradition Reimagined Through Fashion",
    by: "Henry Shim · South Korea · 2026",
    cover: WORK("hanji"),
    href: "",
  },
  {
    category: "Global Impact",
    title: "Filtered Realities",
    by: "Jessie Park · South Korea · 2026",
    cover: WORK("filtered"),
    href: "",
  },
  {
    category: "Global Cultures",
    title: "The Voice of Mongolia",
    by: "Nomun Chinzorig · Mongolia / USA · 2026",
    cover: WORK("mongolia"),
    href: "",
  },
  {
    category: "Global Impact",
    title: "Where the River Swallows Our Homes",
    by: "Addison Tran · Vietnam · 2026",
    cover: WORK("river"),
    href: "",
  },
  {
    category: "Global Cultures",
    title: "Martinican Carnival Tour",
    by: "Jaydon Stanley-Owusu · Martinique · 2026",
    cover: WORK("carnival"),
    href: "",
  },
  {
    category: "Global Impact",
    title: "After the Rain",
    by: "Yui Yoshida · Japan / Singapore · 2026",
    cover: WORK("rain"),
    href: "",
  },
  {
    category: "Global Cultures",
    title: "Big Two, but in Hong Kong",
    by: "Linus Chan · Hong Kong · 2026",
    cover: WORK("bigtwo"),
    href: "",
  },
  {
    category: "Global Impact",
    title: "Dreaming in Bangkok",
    by: "Sameer Daga · Thailand · 2026",
    cover: WORK("bangkok"),
    href: "",
  },
  {
    category: "Global Cultures",
    title: "We Prompted This",
    by: "Kaiden Woo · USA · 2026",
    cover: WORK("prompted"),
    href: "",
  },
];

/* ───────────── Home ───────────── */
const SM = "https://fudsqpvwhusdstjushuz.supabase.co/storage/v1/object/public/site-media/";

export const home = {
  eyebrow: "",
  headline: ["Portfolio", "Building", "with", "Industry Mentors"],
  intro:
    "At Build Learning, students work on projects designed to help them gain international exposure, build character, and sharpen their technological literacy and uniquely human skills for today's disruptive world.",
  heroImage: P("bfi-cohort"),
  heroAlt: "More than a hundred students at the Build for Impact 2026 hackathon",
  heroButtons: {
    primary: { label: "Explore programs →", href: "/programs" },
    secondary: { label: "See student work ↗", href: ARCHIVES_URL },
  },
  nextUp: {
    tag: "Next up · Competition",
    title: "Global Innovation Challenge 2026",
    meta: "Virtual · 11 Dec – 16 Jan · Grade 9+",
    award: "$1.5K",
    awardLabel: "seed award",
    daysLabel: "days to register",
    deadline: "2026-12-01T04:59:00Z",
    href: "/competitions",
  },
  filmstrip: [
    [
      { src: P("bfi-cohort"), alt: "Build for Impact 2026 hackathon cohort, Singapore", w: 460 },
      { src: P("bfi-girls"), alt: "Student team on stage", w: 360 },
      { src: P("seoul-group"), alt: "Build for Impact Seoul participants", w: 360 },
      { src: P("present-room"), alt: "Mentor session", w: 340 },
      { src: P("pca-robot"), alt: "Students testing a robot at AI Tinkery camp", w: 360 },
      { src: P("gardens"), alt: "Gardens by the Bay", w: 340 },
      { src: P("bfi-champions"), alt: "Build for Impact 2026 champions", w: 380 },
      { src: P("bfi-huddle"), alt: "Students working in teams", w: 360 },
    ],
    [
      { src: P("seoul-network"), alt: "Students networking in Seoul", w: 380 },
      { src: P("pca-laptop"), alt: "Students vibe-coding a game", w: 340 },
      { src: P("bfi-team-laugh"), alt: "Students building a project", w: 380 },
      { src: P("seoul-panel"), alt: "Expert panel in Seoul", w: 380 },
      { src: P("bfi-pair"), alt: "Two students building together", w: 340 },
      { src: P("openai-talk"), alt: "Workshop presentation", w: 380 },
      { src: P("seoul-audience"), alt: "Audience at Build for Impact Seoul", w: 360 },
      { src: P("pca25-group"), alt: "PCA Seoul students with mentors", w: 340 },
    ],
  ],
  logoStrip: {
    label: "Built with partners, sponsors & judges from",
    link: { label: "How we partner →", href: "/partners" },
  },
  pathwaysHead: {
    eyebrow: "Program Types",
    title: "Individual & Group Learning, Designed for All Student Needs",
    text: "All our programs adopt the Stanford Design Thinking and Innovation Methods. All students learn from and have the opportunities to co-create with industry mentors and experts, with the goal of developing portfolio-worthy passion projects.",
  },
  pathwaysLinkLabel: "Explore →",
  pathways: [
    {
      tag: "Individual · Pair work",
      title: "Passion Project Studio",
      body: "A bespoke 8-session program: user-centric research, expert interviews, creative ideation, concept and prototype development, anchored by industry mentors.",
      meta: "8 sessions · Online / Singapore",
      img: SM + "2026-10-28/img-1337-9v95o.webp",
      img2: SM + "2026-10-28/6258225958749933859-oatql.webp",
      href: "/programs",
    },
    {
      tag: "Global · Virtual & In Person",
      title: "Competitions",
      body: "Global competitions organised for high school students with no prior technical background; students gain new skills from industry experts and learn to take their ideas to reality.",
      meta: "Next: Global Innovation Challenge · Dec 2026",
      img: P("bfi-girls"),
      img2: P("bfi-champions"),
      href: "/competitions",
    },
    {
      tag: "Edutourism",
      title: "Learning Immersions",
      body: "A different way to travel - where you build meaningful passion projects spanning technology, innovation, entrepreneurship, and storytelling with industry mentors, all while immersing in a new culture.",
      meta: "Next: 9–16 Jan 2027 · with eduK8",
      img: P("gardens"),
      img2: P("ntu-group"),
      href: "/immersion",
    },
    {
      tag: "Schools & organisations",
      title: "Schools & Partners",
      body: "Custom-designed workshops, sprints, camps, and hackathons with your students and staff. From robotics to AI, from business fundamentals to human-centric thinking - and everything in between.",
      meta: "Workshops · Camps · Hackathons",
      img: P("workshop-table"),
      img2: P("pca-robot"),
      href: "/partners",
    },
  ],
  humanStackPhoto: {
    src: P("process-wall"),
    alt: "A student project wall mapping the brief, understand, ideate, lead and demo stages with sticky notes",
  },
  humanStackHead: {
    eyebrow: "Our Philosophy",
    title: "Technological Literacy Is Important, But So Are Uniquely Human Skills",
    text: "In today's disruptive and ever-changing world, we believe the uniquely human skills will become ever more valuable. At Build Learning, we believe in creating programs that lie at the intersection of building AI literacy, while honing the uniquely human skills.",
  },
  humanStack: [
    {
      title: "Communication",
      body: "Learning how to harness the power of storytelling through various media formats - from websites to videos",
    },
    {
      title: "Empathy",
      body: "Human and user centred research, exploring psychology and behavioral science",
    },
    {
      title: "Teamwork",
      body: "Learning how to collaborate with each other, working together to solve problems and navigate differences",
    },
    {
      title: "Critical thinking",
      body: "Structured problem solving approach, triangulating analytical, systems, and design thinking",
    },
    { title: "Creativity", body: "Not stopping at the simple idea, but learning creative ideation" },
  ],
  method: {
    eyebrow: "The Method",
    title: "Shaped by our time at Stanford.",
    paragraphs: [
      "From our time at Stanford’s Graduate School of Education and Graduate School of Business, we bring the teaching and innovation pedagogies that capture the spirit of Silicon Valley — curious, hands-on and unafraid to build.",
      "Every program is designed so students learn by doing: understanding real people, testing bold ideas, and creating work they’re proud to share.",
    ],
    /** First photo is the large one; the rest fill the collage around it. */
    photos: [
      { src: P("founders-stanford"), alt: "Build Learning’s co-founders at the Stanford Graduate School of Education" },
      { src: P("stanford-ai-tinkery"), alt: "Young learners at a Stanford AI Tinkery pop-up" },
      { src: P("stanford-ignite-brainstorm"), alt: "A brainstorming session with sticky notes at Stanford" },
      { src: P("stanford-ignite-team"), alt: "A team showing their prototype at Stanford" },
      { src: P("stanford-talk"), alt: "Sharing Build Learning’s approach in a talk at Stanford" },
      { src: P("stanford-expo"), alt: "Walking visitors through student project portfolios" },
    ],
  },
  studentWorkHead: {
    eyebrow: "Student Works",
    title: "Real Projects from Past Students",
    button: { label: "Browse The Global Archives", href: ARCHIVES_URL },
  },
  pinsHead: {
    eyebrow: "Our Reach",
    title: "From Singapore to San Francisco — and everywhere in between.",
    text: "Programs run from our hubs; students join from {count} countries and territories across five continents.",
    hubLabel: "Program hubs",
    countryLabel: "Where students are from",
  },
  /** Map positions are nudged slightly where flags would overlap. */
  pins: [
    { name: "Singapore", flag: FLAG("sg"), lat: 1.35, lon: 103.82, hub: true },
    { name: "San Francisco", flag: FLAG("us"), lat: 37.77, lon: -122.42, hub: true },
    { name: "South Korea", flag: FLAG("kr"), lat: 37.57, lon: 126.98 },
    { name: "India", flag: FLAG("in"), lat: 20, lon: 78 },
    { name: "China", flag: FLAG("cn"), lat: 34, lon: 108 },
    { name: "Vietnam", flag: FLAG("vn"), lat: 11, lon: 112 },
    { name: "Pakistan", flag: FLAG("pk"), lat: 31.5, lon: 74.3 },
    { name: "Thailand", flag: FLAG("th"), lat: 15.5, lon: 99 },
    { name: "Japan", flag: FLAG("jp"), lat: 36.5, lon: 138.5 },
    { name: "Mongolia", flag: FLAG("mn"), lat: 47, lon: 103 },
    { name: "Hong Kong", flag: FLAG("hk"), lat: 22.3, lon: 114.2 },
    { name: "Martinique", flag: FLAG("mq"), lat: 14.6, lon: -61.0 },
    { name: "Kenya", flag: FLAG("ke"), lat: -1, lon: 37.9 },
    { name: "Philippines", flag: FLAG("ph"), lat: 13, lon: 123 },
  ],
  teamHead: {
    eyebrow: "People",
    title: "Previous Speakers & Mentors",
  },
  teamMore: { label: "+ More industry mentors, judges and speakers", href: "/about" },
  team: ["karin", "pratyusha", "gabriel", "lily", "hari", "mark", "jennifer", "ryan"],
  /** Phone layout only: shorter text and the pieces that replace desktop-only sections. */
  mobile: {
    intro: "Students build real projects with industry mentors.",
    primary: { label: "Explore Programs", href: "/programs" },
    secondary: { label: "See Student Work", href: ARCHIVES_URL },
    programs: {
      eyebrow: "Programs",
      title: "Four ways to build",
      items: [
        /** Leave "img" empty to use the matching desktop program card photo. */
        { img: "", title: "Passion Project Studio", text: "1:1 or pair projects with a mentor", href: "/programs" },
        { img: "", title: "Competitions", text: "Global challenges and hackathons", href: "/competitions" },
        { img: "", title: "Learning Immersions", text: "Eight days of building in Singapore", href: "/immersion" },
        { img: "", title: "Schools & Partners", text: "Workshops, camps and hackathons", href: "/partners" },
      ],
    },
    studentWorkLimit: 6,
    studentWorkLink: { label: "See all on Global Archives", href: ARCHIVES_URL },
    skills: {
      eyebrow: "Our Philosophy",
      title: "What students hone",
    },
    mentorsLimit: 4,
    mentorsMore: "And many more mentors, judges and speakers",
  },
};

/* ───────────── Programs ───────────── */
export type ProgramType = "Competitions" | "Immersions" | "Schools";
export type Program = {
  status: string;
  upcoming: boolean;
  type: ProgramType;
  title: string;
  body: string;
  when: string;
  where: string;
  img: string;
  href: string;
};
export const programs: Program[] = [
  {
    status: "Registration open",
    upcoming: true,
    type: "Competitions",
    title: "Global Innovation Challenge 2026",
    body: "Validate, prototype and pitch a business or social-enterprise idea. Top 6 pitch for a US$1,500 seed award.",
    when: "11 Dec 2026 – 16 Jan 2027",
    where: "Virtual · Grade 9+",
    img: P("gic-visual"),
    href: "/competitions",
  },
  {
    status: "Early bird to 4 Dec",
    upcoming: true,
    type: "Immersions",
    title: "Build a Portfolio in 8 Days — Singapore",
    body: "Edutourism with eduK8: tech firms, universities, culture challenges and an expert pitch.",
    when: "9 – 16 Jan 2027",
    where: "Singapore · Ages 14–18",
    img: P("ntu-group"),
    href: "/immersion",
  },
  {
    status: "Past",
    upcoming: false,
    type: "Competitions",
    title: "Build for Impact Hackathon — Seoul",
    body: "With PCA Seoul. Speakers from Kakao, Coupang, Liminal and Stanford.",
    when: "July 2026",
    where: "Seoul, South Korea",
    img: P("seoul-group"),
    href: "/competitions",
  },
  {
    status: "Past",
    upcoming: false,
    type: "Schools",
    title: "AI Tinkery Summer Camp",
    body: "Three days of robots, engineering challenges and vibe-coding with Lovable.",
    when: "Summer 2026",
    where: "PCA Seoul",
    img: P("pca-robot"),
    href: "/partners",
  },
  {
    status: "Past",
    upcoming: false,
    type: "Competitions",
    title: "Global Impact Challenge 2026",
    body: "50 students worldwide researched real social issues in their communities. Top 4 earned internships.",
    when: "Summer 2026",
    where: "Virtual · Global",
    img: P("gi-durian"),
    href: "/competitions",
  },
  {
    status: "Past",
    upcoming: false,
    type: "Competitions",
    title: "Global Cultures Challenge 2026",
    body: "Students built interactive experiences about the cultures they come from.",
    when: "Spring 2026",
    where: "Virtual · Grades 9–12",
    img: P("gc-carnival"),
    href: "/competitions",
  },
  {
    status: "Past",
    upcoming: false,
    type: "Competitions",
    title: "Build for Impact Hackathon 2026",
    body: "Co-organised with IMDA and SGInnovate; 130+ participants.",
    when: "24–25 Jan 2026",
    where: "SGInnovate, Singapore",
    img: P("bfi-champions"),
    href: "/competitions",
  },
  {
    status: "Past",
    upcoming: false,
    type: "Schools",
    title: "Stanford Design Thinking Workshop",
    body: "Introduction to Stanford design thinking for international-school students.",
    when: "2025",
    where: "Seoul International School",
    img: P("workshop-table"),
    href: "/partners",
  },
];
export const programsPage = {
  title: "Our Programs",
  text: "Start with our flagship Passion Project Studio, or join one of our competitions, immersions and school programs throughout the year.",
  heroImage: P("sticker-stanford"),
  heroAlt: "A Build Learning sticker held up on the Stanford campus",
  studio: {
    eyebrow: "Individual Program",
    title: "Passion Project Studio",
    text: "Over 8 sessions, individually or in pairs, students take an idea they care about from first question to finished prototype — guided by industry mentors at every step. It’s work that shows who they are, not just what they scored.",
    facts: ["8 sessions", "Individual or pair", "Online / Singapore", "Rolling intake"],
    button: { label: "Enquire about the Studio →", href: "/partners#contact" },
    /** Phone layout: headings of the folded rows. */
    factsLabel: "Program details",
    outcomesLabel: "What students do",
    outcomes: [
      "User research and interviews with real people and experts",
      "Creative ideation to find an idea worth building",
      "A working concept and prototype, developed with industry mentors",
      "A process portfolio that shows how they think, not just what they made",
    ],
    /** Shown uncropped in a strip that slides left as you scroll. */
    gallery: [
      { src: P("pps-wall"), alt: "Wireframe sketches and sticky notes from a Studio project" },
      { src: P("pps-working"), alt: "A mentor and two students working through a project on laptops" },
      { src: P("pps-demo"), alt: "Students and a mentor celebrating their finished project" },
      { src: P("pps-mentor-review"), alt: "A student walking a mentor through his project on screen" },
      { src: P("pps-game-sketches"), alt: "Hand-drawn game wireframes and sticky notes on a glass wall" },
    ],
  },
  events: {
    eyebrow: "Events & Group Programs",
    title: "Competitions, Immersions & School Programs",
    upcomingLabel: "Upcoming",
    pastLabel: "Past Programs",
  },
};

/* ───────────── Competitions ───────────── */
export type EventLogo = { name: string; offset?: number };
export const competitions = {
  hero: {
    title: "Compete, learn and build what matters.",
    text: "We host in-person hackathons and virtual competitions for students around the world. Along the way, teams learn from industry mentors as they research, build and refine their ideas — then pitch them to a panel of expert judges.",
    images: [P("bfi-champions"), P("seoul-group"), P("bfi-huddle")],
  },
  series: {
    eyebrow: "The Global Series",
    title: "Three global challenges, one every season.",
    text: "Our Global Series competitions run online, so students can join from anywhere in the world: Global Cultures in spring, Global Impact in summer and Global Innovation in winter. Each has its own theme and an international panel of judges.",
  },
  open: {
    label: "Winter · ● Now open",
    title: "Global Innovation Challenge 2026",
    body: "Develop, validate and pitch a business or social-enterprise idea. One winning team receives a US$1,500 seed award from the Global Builders’ Seed Fund.",
    facts: ["11 Dec – 16 Jan", "Virtual", "Grade 9+", "Teams of 2–3", "US$250"],
    img: P("gic-visual"),
    deadline: "2026-12-01T04:59:00Z",
    countdownLabel: "Closes in",
    button: { label: "Register on Luma →", href: LUMA_URL },
    /** Phone layout: labels for the facts above, in the same order. */
    factLabels: ["Dates", "Format", "Who", "Team size", "Fee"],
  },
  seriesPastLabel: "Past Editions",
  seriesPast: [
    {
      when: "Spring",
      where: "Virtual · Grades 9–12",
      title: "Global Cultures Challenge 2026",
      body: "Non-technical students built interactive experiences about the cultures they come from — from Bangalore to Mongolia to Martinique — and published them on The Global Archives.",
      imgs: [P("gc-carnival"), WORK("mongolia"), P("gc-consoles")],
      button: {
        label: "See student projects on The Global Archives ↗",
        href: "https://www.globalarchives.org/category/cultures",
      },
    },
    {
      when: "Summer",
      where: "Virtual · Global",
      title: "Global Impact Challenge 2026",
      body: "Fifty students from Asia, the Americas, Africa, the Middle East and Europe researched real social issues in their communities. Seven finalists presented to an international judging panel.",
      imgs: [P("gi-durian"), P("gi-truck"), P("gi-interview")],
      button: {
        label: "See student projects on The Global Archives ↗",
        href: "https://www.globalarchives.org/category/impact",
      },
    },
  ],
  moreHead: { eyebrow: "More Competitions", title: "Hackathons & Partner Events" },
  logosLabel: "With speakers, partners and sponsors from",
  hackathons: [
    {
      when: "24–25 Jan 2026",
      where: "Singapore · SGInnovate",
      title: "Build for Impact Hackathon 2026",
      body: "Co-organised with IMDA and SGInnovate as part of Singapore AI Research Week. Students built with AI across four challenge tracks: Education, Sustainability, Wellness and Charity.",
      imgs: [P("bfi-cohort"), P("bfi-champions"), P("bfi-girls")],
      logos: ["IMDA", "SGInnovate", "OpenAI", "Lovable", "Cloudflare", "AI Singapore"],
      extraNames: ["Singapore Global Network"],
    },
    {
      when: "July 2026",
      where: "Seoul · with PCA Seoul",
      title: "Build for Impact Hackathon — Seoul",
      body: "Our hackathon’s first edition outside Singapore, run with Providence Christian Academy Seoul. Students learned from AI experts at Kakao and Coupang, venture builders from Liminal, and Stanford speakers.",
      imgs: [P("seoul-group"), P("seoul-panel"), P("seoul-network")],
      logos: ["Kakao", "Coupang", "Stanford University", "Lovable", "Liminal"],
      extraNames: [] as string[],
    },
  ],
  afterHead: {
    eyebrow: "It doesn’t end at the pitch",
    title: "Pathways after the finals.",
    text: "Winners don’t just get a certificate. We connect them with real organisations so their ideas keep growing.",
  },
  after: [
    {
      title: "Internships with real organisations",
      body: "Top 4 of the Global Impact Challenge joined a virtual internship with Quantum Consumer Solutions.",
    },
    {
      title: "Published on The Global Archives",
      body: "Every finalist project lives on globalarchives.org for schools and universities to see.",
    },
    {
      title: "Seed funding",
      body: "GIC 2026’s winning team receives US$1,500 from the Global Builders’ Seed Fund.",
    },
  ],
  judgesHead: {
    eyebrow: "Mentors & judges",
    title: "Learn from people who build for a living",
  },
  judges: [
    { key: "karin", role: "Speaker · Build for Impact Seoul" },
    { key: "queenstar", role: "Judge · Global Impact" },
    { key: "siobhan", role: "Judge · Global Impact" },
    { key: "bruno", role: "Judge · Global Impact" },
    { key: "pratyusha", role: "Speaker · Build for Impact" },
    { key: "lily", role: "Speaker · Build for Impact" },
    { key: "jennifer", role: "Judge · Global Cultures" },
    { key: "hilary", role: "Mentor · Global Impact" },
    { key: "emma", role: "Mentor · Global Cultures" },
    { key: "gabriel", role: "Speaker · Build for Impact" },
  ],
  judgesMore: { label: "+ More industry mentors, judges and speakers", href: "/about" },
  /** Phone layout: line under the first four judges. */
  mobileJudgesLink: "And many more mentors, judges and speakers",
};

/* ───────────── Immersion ───────────── */
export const immersion = {
  title: "Build a portfolio in 8 days. In Singapore.",
  intro:
    "Stanford innovation methods, Singapore’s tech ecosystem and a pitch to industry judges — with a working AI prototype to show for it. No experience needed.",
  /** Background collage: four columns that drift up and down. */
  heroCollage: [
    [P("chinatown"), P("gardens"), P("present-room")],
    [P("bfi-team-laugh"), P("google-talk"), P("bugis-town")],
    [P("sticky-wall"), P("bfi-girls"), P("girls-table")],
    [P("gardens"), P("chinatown"), P("bfi-team-laugh")],
  ],
  meta: [
    ["Dates", "9 – 16 Jan 2027"],
    ["Who", "Ages 14–18 · No experience"],
    ["Group", "Capped at 20 students"],
    ["Where", "Singapore"],
  ],
  reserveLabel: "Reserve a place →",
  outcomesHead: {
    eyebrow: "You leave with",
    title: "A portfolio, not a certificate.",
    text: "Everything students make is evidence of the human skills universities and employers look for — communication, empathy, teamwork and critical thinking.",
  },
  outcomes: [
    "A working AI prototype, co-created with local Singaporean students",
    "A pitch deck and video demo presented to judges from leading firms",
    "A photojournalism site documenting intercultural exposure",
    "Interviews and co-creation work with local students and mentors",
    "A certificate and a personalised statement of impact",
  ],
  experienceHead: {
    eyebrow: "The experience",
    title: "Multicultural. Innovative. Fun.",
    text: "Eight days built around five experiences — learning from Singapore’s innovators, working alongside local students, and turning it all into a project worth pitching.",
  },
  /** The first two are shown large. */
  themes: [
    {
      title: "Inside Singapore’s tech scene",
      body: "Learning journeys to leading tech and AI firms, plus Stanford innovation methods with our mentors.",
      img: P("google-talk"),
      alt: "A Google DeepMind speaker presenting at SGInnovate",
    },
    {
      title: "Pitch to industry judges",
      body: "Finish your prototype and demo video, then pitch it to judges from industry.",
      img: P("present-room"),
      alt: "Students presenting their project to a panel",
    },
    {
      title: "Co-create with local students",
      body: "Visit Singapore’s universities and build your project side by side with local students.",
      img: P("bfi-team-laugh"),
      alt: "Students laughing while building together",
    },
    {
      title: "Culture challenge",
      body: "Head into neighbourhoods like Haji Lane to interview strangers and understand life in a new city.",
      img: P("chinatown"),
      alt: "A busy evening on Chinatown Food Street, Singapore",
    },
    {
      title: "Explore & bond",
      body: "Gardens by the Bay, kayaking on the Singapore River and a day at Universal Studios with your team.",
      img: P("gardens"),
      alt: "Gardens by the Bay, Singapore",
    },
  ],
  stay: {
    label: "Your stay",
    title: "Right in the heart of town",
    text: "3-star+ accommodation in central Singapore, a short walk from universities, food and the MRT. Students share twin rooms with teammates, and a resident mentor stays on site throughout.",
    img: P("bugis-town"),
    alt: "Shophouses and towers in central Singapore",
  },
  mentorsHead: { eyebrow: "Your mentors", title: "Stanford mentors & industry experts" },
  mentors: [
    { key: "ash", role: "Technology & innovation" },
    { key: "jinyi", role: "Innovation & new ventures" },
    { key: "khongorzul", role: "Admissions" },
  ],
  industryCard: {
    title: "Industry experts",
    tag: "To be revealed",
    text: "Judges and speakers from brand, consulting, technology and venture capital.",
  },
  industryLogos: ["Google", "Oliver Wyman", "Samsung"],
  datesLabel: "Key dates",
  dates: [
    ["1 Nov 2026", "Registration opens"],
    ["13 Nov 2026", "Info session 1 (online, recorded)"],
    ["4 Dec 2026", "Info session 2 · early bird ends"],
    ["13 Dec 2026", "Registration closes (23:59 SGT)"],
    ["15 Dec 2026", "Deposit due · participation confirmed · resource pack sent"],
    ["9 – 16 Jan 2027", "Program in Singapore"],
  ],
  fees: {
    label: "Program fee",
    title: "What’s included",
    includesLabel: "Includes",
    includes:
      "Activities, health insurance, local transport, accommodation, selected meals, attraction fees, software and program administration.",
    excludesLabel: "Excludes",
    excludes: "Airfare, visa fees, personal spending and some self-paid meals.",
    button: { label: "Find out more about fees →", href: "/partners#contact" },
    infoSession: { label: "Join a free info session (13 Nov or 4 Dec) →", href: "/partners#contact" },
  },
};

/* ───────────── Partners ───────────── */
export const partnersPage = {
  hero: {
    eyebrow: "For schools, partners & organisations",
    title: "Build the future of learning with us.",
    text: "Workshops, challenges and immersions for your students — and real ways for organisations to mentor, judge and co-create with the next generation.",
    img: P("openai-talk"),
  },
  logoStripLabel: "Trusted by Previous Partners, Sponsors, and Mentors from",
  logosLabel: "With speakers, partners and sponsors from",
  pca: {
    eyebrow: "Featured school partner · Seoul, South Korea",
    title: "Providence Christian Academy Seoul",
    intro:
      "Two programs, one summer: a hands-on AI Tinkery camp for younger students, and the first Build for Impact hackathon outside Singapore.",
    imgs: [P("pca-robot"), P("pca-laptop"), P("pca25-group"), P("seoul-group"), P("seoul-panel")],
    programs: [
      {
        tag: "Camp · 3 days",
        title: "AI Tinkery Summer Camp",
        body: "The school became a space for building: students designed and built their own robots, explored engineering through hands-on challenges, and vibe-coded their own games and apps with Lovable — ending in student demos.",
        logos: ["Lovable"],
      },
      {
        tag: "Hackathon · July 2026",
        title: "Build for Impact — Seoul",
        body: "Our Singapore hackathon, adapted for a new community. Students learned from AI experts at Kakao and Coupang, venture builders from Liminal, and joined virtual sessions with Stanford speakers.",
        logos: ["Kakao", "Coupang", "Stanford University", "Lovable", "Liminal"],
      },
    ],
  },
  schoolsHead: {
    eyebrow: "For schools",
    title: "Future-ready learning, delivered in your school.",
    text: "Formats that slot into CCA, enrichment weeks, holiday programmes or the timetable — online or on campus.",
  },
  schools: [
    {
      title: "Design Thinking Workshops",
      body: "Stanford-style design thinking: user research, ideation and prototyping — all in one day.",
      format: "Half / full day",
      who: "Gr 6–12",
      img: P("workshop-table"),
    },
    {
      title: "AI Tinkery Camps",
      body: "Build robots, vibe-code games and apps with AI, and demo them — as run at PCA Seoul.",
      format: "3 days",
      who: "Gr 3–8",
      img: P("pca-laptop"),
    },
    {
      title: "Build for Impact Hackathons",
      body: "Our hackathon format, brought to your school — with industry speakers and judges.",
      format: "1–2 days",
      who: "Gr 9–12",
      img: P("seoul-network"),
    },
    {
      title: "School Teams for the GIC",
      body: "Enter a cohort into the Global Innovation Challenge with dedicated mentor support.",
      format: "5 weeks · virtual",
      who: "Gr 9+",
      img: P("gic-visual"),
    },
    {
      title: "Learning Immersions",
      body: "Co-hosted edutourism trips to Singapore’s tech, university and culture ecosystem.",
      format: "5–8 days",
      who: "Ages 14–18",
      img: P("gardens"),
    },
  ],
  contact: {
    eyebrow: "Let’s talk",
    title: "Start a partnership.",
    text: "Tell us what you have in mind — we reply within 2 working days.",
    nameLabel: "Name",
    orgLabel: "Organisation",
    orgPlaceholder: "School or company name",
    emailLabel: "Work email",
    emailPlaceholder: "you@organisation.org",
    interestsLabel: "Interested in",
    messageLabel: "Message",
    submitLabel: "Send enquiry",
    emailSubject: "Partnership enquiry",
  },
  interests: [
    "Workshops",
    "AI sprints",
    "GIC school team",
    "Immersions",
    "Sponsorship",
    "Mentoring / judging",
  ],
};

/* ───────────── About ───────────── */
const UNI = (n: string) => `/img/unis/${n}.png`;
export const about = {
  eyebrow: "About Build Learning",
  headline: "In a world shaped by AI, we help students stay deeply human.",
  intro:
    "Build Learning was born at Stanford and built in Singapore. We teach innovation, storytelling and empathy through real projects, industry collaboration and a focus on social impact.",
  photos: [
    { src: P("bfi-cohort-zoom"), alt: "Build for Impact 2026 student cohort" },
    { src: P("seoul-group"), alt: "Build for Impact Seoul participants" },
    { src: P("bfi-team-laugh"), alt: "Students building a project" },
  ],
  universities: {
    title: "Where our students go next.",
    text: "Students from our programs have gone on to top universities around the world.",
    logos: [
      { name: "Stanford University", logo: UNI("stanford"), height: 52 },
      { name: "UC Berkeley", logo: UNI("berkeley"), height: 64 },
      { name: "Cornell University", logo: UNI("cornell"), height: 64 },
      { name: "New York University", logo: UNI("nyu"), height: 76 },
      { name: "Boston University", logo: UNI("boston"), height: 56 },
      { name: "Bentley University", logo: UNI("bentley"), height: 72 },
      { name: "National University of Singapore", logo: UNI("nus"), height: 54 },
      { name: "Nanyang Technological University", logo: UNI("ntu"), height: 52 },
      { name: "Singapore Management University", logo: UNI("smu"), height: 52 },
    ],
  },
  foundersHead: { eyebrow: "Our Founders", title: "Born at Stanford. Built in Singapore." },
  founderLinkLabel: "LinkedIn ↗",
  founders: [
    {
      key: "jinyi",
      role: "Co-founder · Innovation & ventures",
      bio: "Valedictorian and Gold Medalist at NTU. Senior Venture Architect at Wright Partners; previously led research and innovation at Samsung’s regional incubator and consulted for Google, ByteDance and Unilever. Has taught at LASALLE and Macau University.",
      link: "https://www.linkedin.com/company/buildlearning/",
    },
    {
      key: "ash",
      role: "Co-founder · Learning & technology",
      bio: "MS in Learning Design & Technology, Stanford GSE, and Stanford GSB Ignite. Founding mentor at the Stanford Accelerator for Learning & AI Tinkery. Former Singapore educator and government scholar; Innovation Associate at Kinaya Ventures.",
      link: "https://www.linkedin.com/company/buildlearning/",
    },
  ],
  mentorsHead: {
    eyebrow: "Mentors & Experts",
    title: "From Past Events",
    note: "22+ and growing",
  },
  mentors: [
    "karin",
    "pratyusha",
    "gabriel",
    "fayaz",
    "lily",
    "mark",
    "hari",
    "imama",
    "jennifer",
    "gift",
    "emma",
    "hilary",
    "ryan",
    "deborah",
    "queenstar",
    "siobhan",
    "bruno",
    "angus",
    "sangah",
    "sreejith",
    "joshua",
    "stephanie",
  ],
  joinCard: {
    title: "+ Join us",
    text: "Mentor or judge a program",
    link: { label: "Get in touch →", href: "/partners#contact" },
  },
  /** Phone layout: link that unfolds the rest of the mentor list. */
  mobileShowAll: "Show all mentors",

};
