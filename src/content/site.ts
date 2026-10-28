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
    showGrid: true,
    motion: true,
  },
  logo: LOGO("bl_logo"),
  email: "hello@buildlearning.co",
  phones: ["+65 8223 2551 (SG)", "+1 650 248 7785 (US)"],
  instagram: "https://www.instagram.com/buildlearning.co",
  linkedin: "https://www.linkedin.com/company/buildlearning/",
  headerCta: { label: "Apply now", href: "/programs" },
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
  { value: 4, suffix: "", label: "Competitions in 2026" },
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
export const logo = (name: string) => partners.find((p) => p.name === name)!;

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

export type Work = { category: string; title: string; by: string; cover: string; award?: string };
export const studentWork: Work[] = [
  {
    category: "Global Impact",
    title: "What the City Throws Away",
    by: "Jonathan Liu · China · 2026",
    cover: WORK("city"),
    award: "Winner · Global Impact",
  },
  {
    category: "Global Cultures",
    title: "Namma Bangalore",
    by: "Zidaan Pasha · India · 2026",
    cover: WORK("namma"),
    award: "Winner · Global Cultures",
  },
  {
    category: "Global Impact",
    title: "Will the Looms Fall Silent?",
    by: "Mauli Sinha · India · 2026",
    cover: WORK("looms"),
    award: "1st runner-up",
  },
  {
    category: "Global Cultures",
    title: "Hanji: Tradition Reimagined Through Fashion",
    by: "Henry Shim · South Korea · 2026",
    cover: WORK("hanji"),
    award: "1st runner-up",
  },
  {
    category: "Global Impact",
    title: "Filtered Realities",
    by: "Jessie Park · South Korea · 2026",
    cover: WORK("filtered"),
    award: "2nd runner-up",
  },
  {
    category: "Global Cultures",
    title: "The Voice of Mongolia",
    by: "Nomun Chinzorig · Mongolia / USA · 2026",
    cover: WORK("mongolia"),
    award: "2nd runner-up",
  },
  {
    category: "Global Impact",
    title: "Where the River Swallows Our Homes",
    by: "Addison Tran · Vietnam · 2026",
    cover: WORK("river"),
  },
  {
    category: "Global Cultures",
    title: "Martinican Carnival Tour",
    by: "Jaydon Stanley-Owusu · Martinique · 2026",
    cover: WORK("carnival"),
  },
  {
    category: "Global Impact",
    title: "After the Rain",
    by: "Yui Yoshida · Japan / Singapore · 2026",
    cover: WORK("rain"),
  },
  {
    category: "Global Cultures",
    title: "Big Two, but in Hong Kong",
    by: "Linus Chan · Hong Kong · 2026",
    cover: WORK("bigtwo"),
  },
  {
    category: "Global Impact",
    title: "Dreaming in Bangkok",
    by: "Sameer Daga · Thailand · 2026",
    cover: WORK("bangkok"),
  },
  {
    category: "Global Cultures",
    title: "We Prompted This",
    by: "Kaiden Woo · USA · 2026",
    cover: WORK("prompted"),
    award: "Special mention",
  },
];

/* ───────────── Home ───────────── */
export const home = {
  eyebrow: "// Human skills for an AI world — Singapore · San Francisco",
  headline: ["Build", "what", "AI", "can’t."],
  intro:
    "Programs, global competitions and learning immersions where K–12 students build real projects with industry mentors — and sharpen the communication, empathy, teamwork and critical thinking no model can replace.",
  heroImage: P("bfi-cohort"),
  nextUp: {
    tag: "Next up · Competition",
    title: "Global Innovation Challenge 2026",
    meta: "Virtual · 11 Dec – 16 Jan · Grade 9+",
    award: "$1.5K",
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
  pathwaysHead: {
    eyebrow: "01 — What we do",
    title: "More than passion projects. One ecosystem, four ways to build.",
    text: "Every pathway draws on methods from Stanford and the same mentor network — and every finished project can be published to The Global Archives.",
  },
  pathways: [
    {
      tag: "1:1 · Rolling intake",
      title: "Passion Project Studio",
      body: "A bespoke 8-session program: research, wireframes, AI prototype and a process portfolio — validated with experts.",
      meta: "8 sessions · Online / Singapore",
      img: P("bfi-team-laugh"),
      img2: P("bfi-huddle"),
      href: "/programs",
    },
    {
      tag: "Global · Virtual & in person",
      title: "Competitions",
      body: "Hackathons and global competitions where teams validate demand, build a prototype and pitch to industry judges.",
      meta: "Next: Global Innovation Challenge · Dec 2026",
      img: P("bfi-girls"),
      img2: P("bfi-champions"),
      href: "/competitions",
    },
    {
      tag: "Edutourism",
      title: "Learning Immersions",
      body: "Eight days in Singapore: tech firms, universities, culture challenges and a pitch to industry judges. Portfolio included.",
      meta: "Next: 9–16 Jan 2027 · with eduK8",
      img: P("gardens"),
      img2: P("ntu-group"),
      href: "/immersion",
    },
    {
      tag: "Schools & organisations",
      title: "Schools & Partners",
      body: "Design-thinking workshops, AI prototyping sprints, camps and hackathons run with your students or staff.",
      meta: "Workshops · Camps · Hackathons",
      img: P("workshop-table"),
      img2: P("pca-robot"),
      href: "/partners",
    },
  ],
  humanStackHead: {
    eyebrow: "02 — The Human Stack",
    title: "AI is the toolkit. People are the edge.",
    text: "Tools change every quarter. The skills on top of them don’t. Students learn to build with AI — then we train the human layer that decides what’s worth building, and for whom.",
    link: { label: "Our principles →", href: "/about" },
  },
  humanStack: [
    {
      level: "L5",
      title: "Communication",
      body: "Pitch to judges from Google and industry; record demo videos.",
    },
    {
      level: "L4",
      title: "Empathy",
      body: "Human-centred research — e.g. “Interview a stranger” on Haji Lane.",
    },
    {
      level: "L3",
      title: "Teamwork",
      body: "Teams of 2–3 across countries and timezones; co-create with local students.",
    },
    {
      level: "L2",
      title: "Critical thinking",
      body: "Market sizing, pilot experiments and validation surveys — evidence over opinion.",
    },
    {
      level: "L1",
      title: "Creativity",
      body: "Divergent ideation on problems students actually care about.",
    },
    {
      level: "L0",
      title: "AI fluency",
      body: "The base layer: Google, OpenAI & Lovable tools to prototype fast.",
    },
  ],
  upcomingHead: {
    eyebrow: "03 — Upcoming",
    title: "What’s next on the calendar",
    button: { label: "All programs, upcoming & past →", href: "/programs" },
  },
  upcoming: [
    {
      status: "Registration open",
      type: "Competition",
      title: "Global Innovation Challenge 2026",
      when: "11 Dec – 16 Jan",
      where: "Fully virtual",
      who: "Grade 9 onwards",
      fee: "US$250",
      note: "Register by 30 Nov",
      cta: "Register on Luma",
      img: P("gic-visual"),
      href: LUMA_URL,
    },
    {
      status: "Early bird to 4 Dec",
      type: "Immersion · with eduK8",
      title: "Build a Portfolio in 8 Days — Singapore",
      when: "9 – 16 Jan 2027",
      where: "Singapore",
      who: "Ages 14–18",
      fee: "S$2,700 / S$2,999",
      note: "20 places, first come",
      cta: "View program",
      img: P("ntu-group"),
      href: "/immersion",
    },
    {
      status: "Free · Online",
      type: "Info session",
      title: "Singapore Immersion info sessions",
      when: "13 Nov · 4 Dec 2026",
      where: "Online",
      who: "Parents & students",
      fee: "Free",
      note: "Recorded for registrants",
      cta: "Save a seat",
      img: P("girls-table"),
      href: "/immersion",
    },
  ],
  method: {
    eyebrow: "04 — The method",
    title: "Learn to innovate the Stanford way.",
    text: "Every student learns how to innovate using methods from Stanford.",
    img: P("founders-stanford"),
    alt: "Build Learning’s co-founders at Stanford",
  },
  studentWorkHead: {
    eyebrow: "05 — Student work",
    title: "Real projects. Real places. Real people.",
    button: { label: "Browse The Global Archives ↗", href: ARCHIVES_URL },
  },
  pinsHead: {
    eyebrow: "06 — Our builders",
    title: "From Singapore to Seoul to San Francisco — and everywhere in between.",
    text: "Programs run from our hubs; students join from {count} countries and territories across five continents.",
  },
  pins: [
    { name: "Singapore", flag: FLAG("sg"), lat: 1.35, lon: 103.82, hub: true },
    { name: "Seoul", flag: FLAG("kr"), lat: 37.57, lon: 126.98, hub: true },
    { name: "San Francisco", flag: FLAG("us"), lat: 37.77, lon: -122.42, hub: true },
    { name: "India", flag: FLAG("in"), lat: 12.97, lon: 77.59 },
    { name: "China", flag: FLAG("cn"), lat: 39.9, lon: 116.4 },
    { name: "USA", flag: FLAG("us"), lat: 40.7, lon: -74.0 },
    { name: "Vietnam", flag: FLAG("vn"), lat: 10.8, lon: 106.7 },
    { name: "Pakistan", flag: FLAG("pk"), lat: 31.5, lon: 74.3 },
    { name: "Thailand", flag: FLAG("th"), lat: 13.75, lon: 100.5 },
    { name: "Japan", flag: FLAG("jp"), lat: 35.7, lon: 139.7 },
    { name: "Mongolia", flag: FLAG("mn"), lat: 47.9, lon: 106.9 },
    { name: "Hong Kong", flag: FLAG("hk"), lat: 22.3, lon: 114.2 },
    { name: "Martinique", flag: FLAG("mq"), lat: 14.6, lon: -61.0 },
    { name: "Kenya", flag: FLAG("ke"), lat: -1.29, lon: 36.8 },
    { name: "Philippines", flag: FLAG("ph"), lat: 14.6, lon: 121.0 },
  ],
  teamHead: {
    eyebrow: "07 — People",
    title: "Founders, mentors & speakers",
    link: { label: "Meet all our mentors →", href: "/about" },
  },
  team: [
    "jinyi",
    "ash",
    "karin",
    "pratyusha",
    "gabriel",
    "lily",
    "hari",
    "mark",
    "jennifer",
    "ryan",
  ],
  reel: [
    {
      src: P("bfi-cohort"),
      tag: "Build for Impact Hackathon · Singapore",
      caption: "130+ builders at SGInnovate",
    },
    {
      src: P("bfi-champions"),
      tag: "Build for Impact Hackathon · Singapore",
      caption: "Champions on stage",
    },
    {
      src: P("seoul-group"),
      tag: "Build for Impact · Seoul",
      caption: "Our first hackathon in Korea",
    },
    {
      src: P("pca-robot"),
      tag: "AI Tinkery Camp · PCA Seoul",
      caption: "Robots built from scratch",
    },
    {
      src: P("aws-talk"),
      tag: "Build for Impact · Singapore",
      caption: "Learning from AWS, Google & OpenAI",
    },
    { src: P("stanford-group"), tag: "Stanford", caption: "Building with the Stanford community" },
    { src: P("pca-laptop"), tag: "AI Tinkery Camp", caption: "Vibe-coding their own games" },
    { src: P("ntu-group"), tag: "NTU Singapore", caption: "AI & design thinking workshop" },
  ],
  closing: {
    title: "What will\nyou build?",
    primary: { label: "Explore programs →", href: "/programs" },
    secondary: { label: "Partner with us", href: "/partners" },
  },
};

/* ───────────── Programs ───────────── */
export type ProgramType = "Competitions" | "Immersions" | "Studio" | "Schools";
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
    status: "Rolling intake",
    upcoming: true,
    type: "Studio",
    title: "Passion Project Studio",
    body: "Bespoke 1:1 program — 8 sessions from research to AI prototype and process portfolio.",
    when: "Start anytime",
    where: "Online / Singapore",
    img: P("bfi-team-laugh"),
    href: "/partners#contact",
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
    title: "Global Impact Competition 2026",
    body: "50 students worldwide; winner Jonathan Liu. Top 4 earned internships.",
    when: "2026",
    where: "Virtual · Global",
    img: WORK("city"),
    href: "/competitions",
  },
  {
    status: "Past",
    upcoming: false,
    type: "Competitions",
    title: "Global Cultures Hackathon 2026",
    body: "Interactive culture projects; winner Zidaan Pasha with Namma Bangalore.",
    when: "Spring 2026",
    where: "Virtual · Grades 9–12",
    img: WORK("namma"),
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
  eyebrow: "// Programs · {count} listed",
  title: "Every program,\npast and upcoming.",
  text: "Competitions, immersions, studios and school partnerships — filter by what you’re looking for.",
  calendarKey: "◆ = deadline / session",
  emptyText: "No programs match these filters",
  closing: {
    title: "Want a program for your school?",
    button: { label: "Talk to us →", href: "/partners" },
  },
};

export const season = {
  label: "Season calendar · Nov 2026 – Jan 2027",
  days: 92,
  rows: [
    { name: "GIC 2026 · registration", bar: [0, 29], label: "Open → 30 Nov", solid: false },
    {
      name: "GIC 2026 · program",
      bar: [40, 76],
      label: "11 Dec launch → 16 Jan seed-fund pitch",
      solid: true,
    },
    { name: "SG Immersion · registration", bar: [0, 42], label: "1 Nov → 13 Dec", solid: false },
    {
      name: "SG Immersion · key dates",
      marks: [
        [12, "Info 1 · 13 Nov"],
        [33, "Info 2 + early bird · 4 Dec"],
        [44, "Deposit · 15 Dec"],
      ],
    },
    { name: "SG Immersion · in Singapore", bar: [69, 77], label: "9–16 Jan", solid: true },
  ] as Array<{
    name: string;
    bar?: [number, number];
    label?: string;
    solid?: boolean;
    marks?: Array<[number, string]>;
  }>,
};

/* ───────────── Competitions ───────────── */
export const competitions = {
  hero: {
    eyebrow: "// Competitions & hackathons",
    title: "Where students compete to build what matters.",
    text: "In-person hackathons in Singapore and Seoul, and virtual competitions with students from every continent — judged by founders, researchers and industry experts.",
  },
  heroImages: [P("bfi-champions"), P("seoul-group"), P("bfi-huddle")],
  stats: [
    { value: "4", label: "Competitions in 2026" },
    { value: "130+", label: "Hackathon participants, SG" },
    { value: "50", label: "Students, Global Impact" },
    { value: "2", label: "Countries hosted" },
  ],
  open: {
    label: "● Now open · Next competition",
    title: "Global Innovation Challenge 2026",
    body: "Develop, validate and pitch a business or social-enterprise idea. One winning team receives a US$1,500 seed award from the Global Builders’ Seed Fund.",
    facts: ["11 Dec – 16 Jan", "Virtual", "Grade 9+", "Teams of 2–3", "US$250"],
    img: P("gic-visual"),
    deadline: "2026-12-01T04:59:00Z",
    countdownLabel: "Closes in",
    primary: { label: "Register on Luma →", href: LUMA_URL },
    secondary: { label: "How it works", href: "#how" },
  },
  pastHead: {
    eyebrow: "01 — Past competitions",
    title: "2026 so far",
    button: { label: "See every entry on The Global Archives ↗", href: ARCHIVES_URL },
  },
  past: [
    {
      when: "24–25 Jan 2026",
      where: "Singapore · SGInnovate",
      title: "Build for Impact Hackathon 2026",
      body: "Co-organised with IMDA and SGInnovate as part of Singapore AI Research Week. Students built with AI across four challenge tracks: Education, Sustainability, Wellness and Charity.",
      facts: [
        ["130+", "Participants"],
        ["2 days", "In person"],
        ["4", "Impact tracks"],
      ],
      winners: "Champions: Abhishek Vulla & Abel Lee",
      imgs: [P("bfi-cohort"), P("bfi-champions"), P("bfi-girls")],
      logos: ["IMDA", "SGInnovate", "OpenAI", "Lovable"],
    },
    {
      when: "Spring 2026",
      where: "Virtual · Grades 9–12",
      title: "Global Cultures Hackathon 2026",
      body: "Non-technical students built interactive experiences about the cultures they come from — from Bangalore to Mongolia to Martinique — and published them on The Global Archives.",
      facts: [
        ["8", "Finalists"],
        ["6+", "Countries"],
        ["Virtual", "Format"],
      ],
      winners:
        "Winner: Zidaan Pasha (Namma Bangalore) · 1st runner-up: Henry Shim · 2nd runner-up: Nomun Chinzorig · Special mention: Kaiden Woo",
      imgs: [WORK("namma"), WORK("hanji"), WORK("mongolia")],
      logos: [],
    },
    {
      when: "2026",
      where: "Virtual · Global",
      title: "Global Impact Competition 2026",
      body: "Fifty students from Asia, the Americas, Africa, the Middle East and Europe researched real social issues in their communities. Seven finalists presented to an international judging panel.",
      facts: [
        ["50", "Students"],
        ["7", "Finalists"],
        ["Top 4", "Internships"],
      ],
      winners:
        "Winner: Jonathan Liu (What the City Throws Away) · 1st runner-up: Mauli Sinha · 2nd runner-up: Jessie Park · Special mention: Ambar",
      imgs: [WORK("city"), WORK("looms"), WORK("filtered")],
      logos: [],
    },
    {
      when: "July 2026",
      where: "Seoul · with PCA Seoul",
      title: "Build for Impact Hackathon — Seoul",
      body: "Our hackathon’s first edition outside Singapore, run with Providence Christian Academy Seoul. Students learned from AI experts at Kakao and Coupang, venture builders from Liminal, and Stanford speakers.",
      facts: [
        ["[N]", "Participants"],
        ["2", "Countries hosted"],
        ["Hybrid", "Speakers"],
      ],
      winners: "[Winning team names]",
      imgs: [P("seoul-group"), P("seoul-panel"), P("seoul-network")],
      logos: ["Kakao", "Coupang", "Stanford University"],
    },
  ],
  alsoLabel: "Also run by Build Learning",
  also: [
    { when: "9 Nov – 14 Dec 2025 · with CaseCatalyst", title: "Winter Case Competition 2025" },
  ],
  ideasHead: {
    eyebrow: "02 — The brief",
    title: "If you could solve one problem in society, what would it be?",
  },
  ideas: [
    { icon: "rocket", title: "A business or startup idea" },
    { icon: "heart", title: "A social enterprise or impact initiative" },
    { icon: "phone", title: "A digital product, app or software idea" },
    { icon: "people", title: "A community-based project" },
  ],
  flow: [
    { title: "Launch day", body: "Meet founders and experts; get the brief." },
    { title: "Research workshop", body: "Learn to interview users and size a market." },
    { title: "Build with mentors", body: "Prototype with AI tools; consult across timezones." },
    { title: "Submit", body: "Pitch deck, demo video and validation data." },
    { title: "Finals", body: "Top teams pitch live to the judging panel." },
  ],
  afterHead: {
    eyebrow: "03 — It doesn’t end at the pitch",
    title: "Pathways after the finals.",
    text: "Winners don’t just get a certificate. We connect them with real organisations so their ideas keep growing.",
  },
  after: [
    {
      title: "Internships with real organisations",
      body: "Top 4 of the Global Impact Competition joined a virtual internship with Quantum Consumer Solutions.",
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
    eyebrow: "04 — Mentors & judges",
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
  pastJudgesLabel: "Past judges include",
  pastJudges:
    "Dr Angus Whitehead (NIE / NTU) · Edwin Lai (ex-Microsoft, Google) · Deborah Oludimu (A Pad for Her) · Ryan Chua (Samsung) · Dr Gift Iyioku (Stanford Hoover Institution) · Chavvi Sharma (Uniphore) · Minho Ryu (Kakao) · Sangah Lee (Coupang) · Joshua Choy & Stephanie How (Liminal) · Sreejith Mohan (StartX)",
  closing: {
    title: "Ready to compete?",
    primary: { label: "Register for GIC 2026 →", href: LUMA_URL },
    secondary: { label: "Bring a competition to your school", href: "/partners" },
  },
};

/* ───────────── Immersion ───────────── */
export const immersion = {
  status: "Immersion · Presented with eduK8 · Early bird ends 4 Dec",
  title: "Build a portfolio in 8 days. In Singapore.",
  intro:
    "Stanford innovation methods, Singapore’s tech ecosystem and a pitch to industry judges — with a working AI prototype to show for it. No experience needed.",
  hero: P("bfi-team-laugh"),
  meta: [
    ["Dates", "9 – 16 Jan 2027"],
    ["Where", "Singapore · Bugis"],
    ["Who", "Ages 14–18 · No experience"],
    ["Group", "20 students max"],
    ["From", "S$2,700 early bird"],
  ],
  reserveLabel: "Reserve a place →",
  outcomesHead: {
    eyebrow: "01 — You leave with",
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
  daysHead: {
    eyebrow: "02 — The 8 days",
    title: "Learn · Apply · Collaborate · Build",
    note: "Plan subject to change",
  },
  days: [
    {
      n: 1,
      date: "9 Jan",
      theme: "Arrival",
      am: "Airport pick-up and check-in",
      pm: "Welcome evening and briefing",
      img: P("ntu-group"),
    },
    {
      n: 2,
      date: "10 Jan",
      theme: "Teamwork",
      am: "Team bonding, games and sightseeing",
      pm: "Learning journey: Singapore policy & urban planning",
      img: P("bfi-huddle"),
    },
    {
      n: 3,
      date: "11 Jan",
      theme: "Culture",
      am: "Seminar: culture and human-centred research",
      pm: "Intercultural challenge at Haji Lane — interview a stranger",
      img: P("sticky-wall"),
    },
    {
      n: 4,
      date: "12 Jan",
      theme: "Technology",
      am: "Learning journey to leading tech & AI firms",
      pm: "Stanford innovation methods & AI full-stack seminar",
      img: P("present-room"),
    },
    {
      n: 5,
      date: "13 Jan",
      theme: "Local uni",
      am: "Visit universities; co-create with local students",
      pm: "Iterate with Stanford design thinking",
      img: P("girls-table"),
    },
    {
      n: 6,
      date: "14 Jan",
      theme: "Pitch day",
      am: "Finish prototypes, pitch prep and demo videos",
      pm: "Pitch to 3 industry judges for feedback",
      img: P("bfi-girls"),
      key: true,
    },
    {
      n: 7,
      date: "15 Jan",
      theme: "Leisure",
      am: "Written reflections for personal portfolio site",
      pm: "Universal Studios Singapore",
      img: P("team-phone"),
    },
    {
      n: 8,
      date: "16 Jan",
      theme: "Departure",
      am: "Farewell and portfolio hand-off",
      pm: "Airport transfers",
      img: P("hackrift"),
    },
  ],
  bentoHead: { eyebrow: "03 — Where you’ll go & stay", title: "Multicultural. Innovative. Fun." },
  bento: [
    { src: P("present-room"), label: "Mentor sessions", big: true },
    { src: P("gardens"), label: "Gardens by the Bay" },
    { src: P("sticky-wall"), label: "Culture challenge" },
    { src: P("girls-table"), label: "Co-create with local students" },
    { src: P("team-phone"), label: "Team bonding" },
  ],
  info: [
    {
      title: "Key visits",
      items: [
        "NUS, NTU, SMU and SIT (TBC)",
        "Singapore’s tech ecosystem and companies",
        "Gardens by the Bay and Marina Bay Sands",
      ],
    },
    {
      title: "Team bonding",
      items: [
        "Kayaking on the Singapore River",
        "Games day at Universal Studios",
        "Prawning day at Punggol",
      ],
    },
    {
      title: "Your stay",
      items: [
        "3-star+ accommodation in Bugis, near SMU",
        "Twin rooms shared with teammates",
        "Resident mentor on site at all times",
        "Curfew and expectations briefing on day 1",
      ],
    },
  ],
  mentorsHead: { eyebrow: "04 — Your mentors", title: "Stanford mentors & industry experts" },
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
  datesLabel: "05 — Key dates",
  dates: [
    ["1 Nov 2026", "Registration opens"],
    ["13 Nov 2026", "Info session 1 (online, recorded)"],
    ["4 Dec 2026", "Info session 2 · early-bird pricing ends"],
    ["13 Dec 2026", "Registration closes (23:59 SGT)"],
    ["15 Dec 2026", "S$500 deposit due · participation confirmed · resource pack sent"],
    ["9 – 16 Jan 2027", "Program in Singapore"],
  ],
  fees: {
    label: "06 — Program fee",
    earlyLabel: "Early bird · before 4 Dec",
    regularLabel: "Regular",
    early: "S$2,700",
    regular: "S$2,999",
    includes:
      "Activities, health insurance, local transport, accommodation, selected meals, attraction fees, software and program administration.",
    excludes: "Airfare, visa fees, personal spending (we suggest ~S$150) and some self-paid meals.",
    registerLabel: "Register — 20 places, first come first served",
    infoSessionLabel: "Join a free info session (13 Nov or 4 Dec) →",
  },
  faqHead: { eyebrow: "07 — Questions", title: "For parents" },
  faq: [
    {
      q: "Is it safe? Who supervises students?",
      a: "A resident mentor lives in the same building and is the point of contact at all times. Students are briefed on curfews and expectations on the first evening.",
    },
    {
      q: "What does my child need to arrange?",
      a: "Flights and any visa. We arrange airport pick-ups on Day 1 and Day 8 based on the flight details you share.",
    },
    {
      q: "What is the cancellation policy?",
      a: "The S$500 deposit is non-refundable. Later cancellations carry additional charges — contact us for the full policy.",
    },
    {
      q: "Does my child need coding or business experience?",
      a: "No. All training and resources are provided.",
    },
  ],
  presentedByLabel: "Presented by",
};

/* ───────────── Partners ───────────── */
export const partnersPage = {
  intro: {
    eyebrow: "// Schools & partners",
    title: "Bring real-world innovation to your students.",
    text: "We design and deliver programs with schools, governments and companies — from one-day workshops to hackathons and learning immersions.",
    primary: { label: "Start a conversation →", href: "#contact" },
    secondary: { label: "See formats", href: "#schools" },
  },
  hero: P("openai-talk"),
  schoolsHead: { eyebrow: "01 — For schools", title: "Formats we bring to your campus" },
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
      title: "Learning Immersions",
      body: "Co-hosted edutourism trips to Singapore’s tech, university and culture ecosystem.",
      format: "5–8 days",
      who: "Ages 14–18",
      img: P("gardens"),
    },
  ],
  pca: {
    eyebrow: "Featured school partner · Korea",
    title: "Providence Christian Academy Seoul",
    intro:
      "Two programs, one summer: a hands-on AI Tinkery camp for younger students, and the first Build for Impact hackathon outside Singapore.",
    imgs: [P("pca-robot"), P("pca-laptop"), P("pca25-group"), P("seoul-group"), P("seoul-panel")],
  },
  orgsHead: {
    eyebrow: "02 — For organisations",
    title: "Put your brand behind young innovators.",
    text: "Companies, governments and nonprofits partner with us to reach motivated students and see fresh thinking on real problems.",
  },
  orgs: [
    { title: "Sponsor a challenge", body: "Co-brand a competition or fund a seed award." },
    {
      title: "Set a real brief",
      body: "Student teams research and prototype solutions to your problem.",
    },
    {
      title: "Judge, mentor or keynote",
      body: "Join our network alongside judges from Google and industry.",
    },
    {
      title: "Host a learning journey",
      body: "Open your office to immersion cohorts for an afternoon.",
    },
    {
      title: "Provide tools & credits",
      body: "Like our AI sponsors OpenAI, Lovable and Cloudflare.",
    },
  ],
  stepsHead: { eyebrow: "04 — How it works", title: "From first call to showcase" },
  steps: [
    { title: "Discovery call", body: "We learn your goals, students or team, and constraints." },
    { title: "Co-design", body: "We shape the format, brief and outcomes together." },
    { title: "Deliver", body: "Our mentors run the program using methods from Stanford." },
    {
      title: "Showcase",
      body: "Best work is published on The Global Archives, with an impact report for you.",
    },
  ],
  casesHead: { eyebrow: "03 — Case studies", title: "What we’ve built together" },
  cases: [
    {
      kicker: "Government & ecosystem partners",
      who: "IMDA",
      title: "Build for Impact Hackathon 2026",
      body: "Co-organised with IMDA and SGInnovate during Singapore AI Research Week — 130+ participants filled six floors of SGInnovate.",
      stats: [
        ["130+", "Participants"],
        ["2 days", "In person"],
      ],
      img: P("bfi-cohort"),
      href: "/competitions",
    },
    {
      kicker: "School partner",
      who: "PCA Seoul",
      title: "AI Tinkery Camp & Build for Impact Seoul",
      body: "A three-day robotics and AI camp plus our first hackathon in Korea, with speakers from Kakao, Coupang and Stanford.",
      stats: [
        ["2", "Programs"],
        ["3 days", "Camp"],
      ],
      img: P("pca25-group"),
      href: "#pca",
    },
    {
      kicker: "Immersion partner",
      who: "eduK8",
      title: "Build a Portfolio in 8 Days — Singapore",
      body: "A jointly presented edutourism program combining Stanford mentors, tech visits and cultural exploration.",
      stats: [
        ["8 days", "In Singapore"],
        ["20", "Places"],
      ],
      img: P("ntu-group"),
      href: "/immersion",
    },
    {
      kicker: "Internship partner",
      who: "Quantum Consumer Solutions",
      title: "Internships for Global Impact winners",
      body: "The top 4 students from the Global Impact Competition 2026 joined a virtual internship programme.",
      stats: [
        ["Top 4", "Interns"],
        ["50", "Competitors"],
      ],
      img: P("bfi-team-orange"),
      href: "/competitions",
    },
  ],
  contact: {
    eyebrow: "05 — Get in touch",
    title: "Let’s design something together.",
    text: "Tell us a little about your school or organisation and we’ll be in touch within two working days.",
    submitLabel: "Send enquiry →",
  },
  interests: [
    "Workshops",
    "Camps",
    "Hackathons",
    "Immersions",
    "Sponsorship",
    "Mentoring / judging",
  ],
};

/* ───────────── About ───────────── */
export const about = {
  eyebrow: "// About Build Learning",
  headline: "In a world shaped by AI, we help students stay deeply human.",
  intro:
    "Build Learning was born at Stanford and built in Singapore. We teach innovation, storytelling and empathy through real projects, industry collaboration and a focus on social impact.",
  photos: [
    { src: P("bfi-cohort-zoom"), alt: "Build for Impact 2026 student cohort" },
    { src: P("seoul-group"), alt: "Build for Impact Seoul participants" },
    { src: P("bfi-team-laugh"), alt: "Students building a project" },
  ],
  foundersHead: { eyebrow: "01 — Founders", title: "Born at Stanford. Built in Singapore." },
  founders: [
    {
      key: "jinyi",
      role: "Co-founder · Innovation & ventures",
      bio: "Valedictorian and Gold Medalist at NTU. Senior Venture Architect at Wright Partners; previously led research and innovation at Samsung’s regional incubator and consulted for Google, ByteDance and Unilever. Has taught at LASALLE and Macau University.",
    },
    {
      key: "ash",
      role: "Co-founder · Learning & technology",
      bio: "MS in Learning Design & Technology, Stanford GSE, and Stanford GSB Ignite. Founding mentor at the Stanford Accelerator for Learning & AI Tinkery. Former Singapore educator and government scholar; Innovation Associate at Kinaya Ventures.",
    },
  ],
  mentorsHead: { eyebrow: "02 — Mentors, speakers & judges", title: "Our network" },
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
  valuesHead: { eyebrow: "03 — What we believe", title: "Our values" },
  values: [
    {
      title: "Human first, AI-fluent",
      body: "Tools amplify students — they never replace their thinking.",
    },
    {
      title: "Real problems, real people",
      body: "Projects start with someone who actually has the problem.",
    },
    { title: "Evidence over opinion", body: "Ideas are tested with research, pilots and data." },
    {
      title: "Beyond the pitch",
      body: "Projects lead to internships, publication and real partners — not just certificates.",
    },
  ],
  closing: {
    title: "Join a program, bring us to your school, or explore student work.",
    buttons: [
      { label: "See programs →", href: "/programs" },
      { label: "Partner with us", href: "/partners#contact" },
      { label: "The Global Archives ↗", href: ARCHIVES_URL },
    ],
  },
};
