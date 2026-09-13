import type { NewProject, NewPost } from "./schema";

type Metric = { label: string; value: string };

export const PROFILE = {
  name: "Moe Kyaw Aung",
  aka: "မိုးကျော်အောင်",
  role: "Senior Android Engineer",
  handle: "Dev-moe-kyawaung",
  location: "Tachileik, Myanmar ⇄ Bangkok, Thailand",
  email: "hello@moekyawaung.dev",
  phone: "+95 9 889 000 889",
  phoneHref: "+959889000889",
  avatar:
    "https://res.cloudinary.com/dye5qpwii/image/upload/c_fill,w_520,h_520,q_auto,f_auto/v1778527878/IMG_20260430_053105_uef0yr.png",
  philosophy: "Code with culture. Build with purpose.",
  currentlyBuilding: "MoekyawTranslator — an on-device AI translation app",
  summary:
    "Senior Android Engineer specialising in Kotlin, Jetpack Compose, and Clean Architecture. I design offline-first, real-time mobile systems and lead design-system and performance work across multi-module codebases.",
  certs: "82+ certificates · Google Developers Launchpad",
  years: "5+",
  yearsLabel: "5+ yrs shipping Android",
  availability: "Interviewing now · 2 weeks notice",
  workSetup: "Remote · Hybrid · Open to relocation",
  /** One-line value proposition — must land in under five seconds. */
  valueProp:
    "I ship native Android that stays fast and stable at scale — 500k MAU, 99.2% crash-free, 40% faster cold starts.",
};

export const projectSeed: NewProject[] = [
  {
    slug: "pulsesync",
    title: "PulseSync",
    tagline: "Offline-first, real-time collaboration for Android at scale",
    category: "Architecture · Realtime",
    year: 2025,
    role: "Lead Android Engineer",
    duration: "9 months",
    team: "4 engineers · 1 designer",
    summary:
      "A multi-module Android platform with a Firebase backend, conflict-free offline sync, and a full GitHub Actions CI/CD pipeline. Built to feel instant even on flaky networks.",
    overview:
      "PulseSync is a collaboration client where teams edit shared boards, docs, and tasks from dozens of devices at once. The hardest problem was making offline edits merge cleanly when connectivity returns — without a server round-trip on every keystroke. I led the Android architecture and the sync engine that keeps the UI responsive under contention.",
    problem:
      "Field teams in low-connectivity regions lost work whenever the network dropped. Existing sync was server-authoritative, so every action stalled behind a request, and concurrent edits produced lost updates and confusing merge states.",
    approach:
      "We shifted to a local-first model: a single source-of-truth in Room, an operation log per entity, and a sync worker that replays operations with last-writer-wins plus field-level conflict resolution. State is exposed as immutable Kotlin Flows so the UI never blocks on I/O.",
    architecture:
      "Clean Architecture across feature modules (boards, docs, sync, auth), MVVM + MVI for UI, Kotlin Coroutines/Flow for concurrency, Room as the local store, and a thin GraphQL gateway. A dedicated :sync module owns the operation queue, retry/backoff, and telemetry.",
    features: [
      "Local-first editing with sub-50ms input latency",
      "Field-level conflict resolution with transparent diffs",
      "Resumable upload queue with exponential backoff",
      "Biometric unlock and Firebase Auth",
      "Material 3 adaptive layouts for tablet + foldables",
      "Crashlytics-backed stability budget (<0.1% crash-free sessions)",
    ],
    outcomes: [
      "60% reduction in sync conflicts versus the prior server-authoritative design",
      "40% faster cold start after module graph and startup refactor",
      "4.9★ store rating with a 99.2% crash-free session rate",
      "Shipped a reusable :sync module adopted by two sister apps",
    ],
    metrics: [
      { label: "Sync conflicts", value: "-60%" },
      { label: "Cold start", value: "-40%" },
      { label: "Crash-free", value: "99.2%" },
      { label: "Store rating", value: "4.9★" },
    ] as Metric[],
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "MVVM + MVI",
      "Clean Architecture",
      "Firebase",
      "Room",
      "GraphQL",
      "WorkManager",
      "GitHub Actions",
    ],
    stackDetail:
      "Kotlin · Jetpack Compose · Coroutines/Flow · Room · Firebase (Auth, Firestore, Crashlytics, Cloud Messaging) · GraphQL (Apollo) · WorkManager · GitHub Actions · Modular Gradle.",
    github: "https://github.com/Dev-moe-kyawaung/pulsesync-android",
    demo: "",
    playstore: "",
    cover: "pulsesync",
    gallery: [],
    accent: "#7dd3fc",
    featured: true,
    orderIndex: 1,
  },
  {
    slug: "transitlive",
    title: "TransitLive",
    tagline: "Live transit tracking for 12k vehicles with sub-second ETAs",
    category: "Realtime Systems",
    year: 2024,
    role: "Senior Android Engineer",
    duration: "11 months",
    team: "6 engineers · data + mobile",
    summary:
      "A large-scale realtime transit app consuming GTFS-Realtime feeds over WebSocket, rendering 12,000 vehicles on a map with predictive ETAs while keeping battery drain low.",
    overview:
      "TransitLive gives commuters live vehicle positions, arrival predictions, and service alerts across a regional transit network. The product lives or dies by freshness and battery: riders keep it open for an entire commute. I owned the realtime data pipeline and on-device rendering strategy on Android.",
    problem:
      "Streaming 12,000 vehicle positions over cellular drained batteries and janked the map. Naive Flow collection caused backpressure, and predictions were stale the moment a vehicle accelerated.",
    approach:
      "I built a backpressure-aware ingestion layer that batches updates per animation frame, diffs positions, and only re-renders moved markers. A predictive ETA model runs on-device from the live feed plus historical speed profiles, and location is sampled adaptively based on transit speed.",
    architecture:
      "Unidirectional MVI with a realtime 'socket supervisor' that reconnects with jittered backoff. A ProtoBuf transport feeds a conflated StateFlow consumed by the map layer. Room caches the last known network so the app is usable offline.",
    features: [
      "12,000 live vehicle markers with 60fps pan/zoom",
      "On-device predictive ETAs updated every 2s",
      "Adaptive location sampling (saves ~35% battery)",
      "Service-alert push via Firebase Cloud Messaging",
      "Offline mode with cached routes and last-known positions",
      "Compose maps overlay with clustering",
    ],
    outcomes: [
      "1.2s median update latency across the fleet",
      "35% lower battery use versus v1",
      "500k monthly active users at peak",
      "Featured by two regional transit authorities",
    ],
    metrics: [
      { label: "Vehicles tracked", value: "12k" },
      { label: "Update latency", value: "1.2s" },
      { label: "Battery use", value: "-35%" },
      { label: "MAU", value: "500k" },
    ] as Metric[],
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Coroutines/Flow",
      "WebSockets",
      "ProtoBuf",
      "Mapbox",
      "Room",
      "Ktor",
      "Firebase",
    ],
    stackDetail:
      "Kotlin · Jetpack Compose · Coroutines/Flow · WebSockets · Protocol Buffers · Mapbox Compose · Room · Ktor · Firebase Cloud Messaging · GTFS-Realtime.",
    github: "https://github.com/Dev-moe-kyawaung/transitlive-android",
    demo: "",
    playstore: "",
    cover: "transitlive",
    gallery: [],
    accent: "#34d399",
    featured: true,
    orderIndex: 2,
  },
  {
    slug: "aurora-ui",
    title: "Aurora UI",
    tagline: "A Material 3 design system unifying 9 Android apps",
    category: "Design System",
    year: 2024,
    role: "Design System Lead",
    duration: "6 months",
    team: "2 platform · 9 product teams",
    summary:
      "A Compose-first design system with a theming engine, token pipeline, and accessibility guarantees that cut feature UI build time by 70%.",
    overview:
      "Nine product teams were each reinventing buttons, sheets, and color. Aurora UI is the shared Compose component library and theming layer that made 'consistent' the default. I led the architecture, the token pipeline, and the accessibility contract.",
    problem:
      "Inconsistent components, duplicated effort, and frequent contrast and touch-target failures in audits. Theming was hardcoded, so dark mode and brand variants were afterthoughts.",
    approach:
      "I modelled design tokens as a single source of truth (color, type, elevation, motion) compiled into Compose theme classes via a Kotlin DSL. Components are stateless and theme-agnostic; a Figma-to-code bridge keeps tokens in sync. Every component ships with an accessibility test.",
    architecture:
      "A :tokens module generates typed theme objects; :components exposes stateless, previewable Composables; :foundations holds motion and typography. Released through a Gradle Version Catalog and validated with Konsist architecture tests.",
    features: [
      "Single-token source of truth across 9 apps",
      "Theme-agnostic, fully previewable components",
      "100% WCAG AA contrast on default themes",
      "Motion spec with reduced-motion fallback",
      "Storybook-style previews for design review",
      "Automated architecture (Konsist) guardrails",
    ],
    outcomes: [
      "70% faster feature UI delivery",
      "Zero contrast failures in the last 4 audits",
      "Adopted by all 9 product teams",
      "Cut design-to-dev handoff friction dramatically",
    ],
    metrics: [
      { label: "UI delivery", value: "+70%" },
      { label: "Apps unified", value: "9" },
      { label: "Contrast fails", value: "0" },
      { label: "Components", value: "60+" },
    ] as Metric[],
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Material 3",
      "Gradle Version Catalog",
      "Kotlin DSL",
      "Konsist",
      "Figma",
    ],
    stackDetail:
      "Kotlin · Jetpack Compose · Material 3 · Gradle Version Catalogs · Kotlin DSL · Konsist architecture tests · Figma token pipeline.",
    github: "https://github.com/Dev-moe-kyawaung/aurora-ui",
    demo: "",
    playstore: "",
    cover: "aurora",
    gallery: [],
    accent: "#a78bfa",
    featured: true,
    orderIndex: 3,
  },
  {
    slug: "moekyawtranslator",
    title: "MoekyawTranslator",
    tagline: "On-device + Claude-powered translation across 40 languages",
    category: "AI / ML",
    year: 2026,
    role: "Creator · Solo",
    duration: "Ongoing",
    team: "Solo",
    summary:
      "A privacy-first translation app that runs TFLite models on-device for instant offline translation and uses the Claude API for context-aware refinement of tone and idiom.",
    overview:
      "MoekyawTranslator is my current build: a translator that works with no network for the common case, then escalates to the Claude API when a phrase needs cultural or tonal nuance. The goal is instant, private, and natural translation for Burmese and regional languages.",
    problem:
      "Cloud-only translators fail offline, leak content, and mistranslate idiom and tone. Most on-device models are accurate but flat — they miss register and cultural context.",
    approach:
      "I run quantized TFLite models on-device for the first-pass translation (text, camera, and voice), then offer an optional 'refine' step that sends only the minimal context to the Claude API. A local cache means repeated phrases never leave the device.",
    architecture:
      "Compose UI with a translation UseCase orchestrating an on-device TFLite interpreter, a CameraX/MediaPipe capture pipeline, and a Claude client behind a repository boundary. All heavy work runs off the main thread via Coroutine dispatchers.",
    features: [
      "Offline-first TFLite translation in 40+ languages",
      "Claude-powered tone & idiom refinement",
      "Camera and voice input via CameraX + MediaPipe",
      "On-device phrase cache for privacy",
      "Burmese ⇄ English first-class support",
      "Material 3 dynamic theming",
    ],
    outcomes: [
      "Sub-300ms first-pass translation on-device",
      "Zero text leaves the device unless refine is chosen",
      "Daily-driver translator for two languages",
      "Open-source reference for on-device ML on Android",
    ],
    metrics: [
      { label: "First pass", value: "<300ms" },
      { label: "Languages", value: "40+" },
      { label: "Offline", value: "100%" },
      { label: "Model", value: "TFLite" },
    ] as Metric[],
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "TFLite",
      "Claude API",
      "CameraX",
      "MediaPipe",
      "Coroutines",
    ],
    stackDetail:
      "Kotlin · Jetpack Compose · TensorFlow Lite · Claude API · CameraX · MediaPipe · Coroutines/Flow · DataStore.",
    github: "https://github.com/Dev-moe-kyawaung/moekyawtranslator",
    demo: "",
    playstore: "",
    cover: "translator",
    gallery: [],
    accent: "#fbbf24",
    featured: true,
    orderIndex: 4,
  },
  {
    slug: "pos-ultimate",
    title: "POS Ultimate",
    tagline: "Offline-first point-of-sale across a 200-store chain",
    category: "Enterprise",
    year: 2023,
    role: "Android Engineer",
    duration: "8 months",
    team: "5 engineers",
    summary:
      "A multi-module POS handling offline transactions, receipt printing, and end-of-day reconciliation for a 200-store retail chain, shipped through an automated Fastlane pipeline.",
    overview:
      "POS Ultimate replaced paper-and-memory workflows in a retail chain where stores routinely lose connectivity. I built the offline transaction engine, the print integration, and the CI/CD that let us ship weekly with confidence.",
    problem:
      "Stores needed to keep selling during outages, print compliant receipts, and reconcile tills without a constant connection — while staying auditable.",
    approach:
      "Transactions are written to a local queue and reconciled when online. A print abstraction talks to Bluetooth and network printers. Release signing, testing, and store submission are fully automated with Fastlane and GitHub Actions.",
    architecture:
      "Multi-module Clean Architecture, Room as the transactional store, WorkManager for reconciliation, and an abstraction layer over printer drivers. UI built in Compose with accessibility for high-traffic counters.",
    features: [
      "Offline transactions with automatic reconciliation",
      "Bluetooth + network receipt printing",
      "End-of-day till and cash reconciliation",
      "Automated Fastlane store releases",
      "Role-based access for staff and managers",
      "Inventory sync on reconnect",
    ],
    outcomes: [
      "Zero lost sales during network outages",
      "Weekly releases via automated pipeline",
      "Deployed across 200 stores",
      "90% reduction in manual reconciliation errors",
    ],
    metrics: [
      { label: "Stores", value: "200" },
      { label: "Lost sales", value: "0" },
      { label: "Release cadence", value: "Weekly" },
      { label: "Errors", value: "-90%" },
    ] as Metric[],
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Clean Architecture",
      "Room",
      "WorkManager",
      "Fastlane",
      "GitHub Actions",
    ],
    stackDetail:
      "Kotlin · Jetpack Compose · Clean Architecture · Room · WorkManager · Fastlane · GitHub Actions · Bluetooth/network printers.",
    github: "https://github.com/moekyawaung-tech/POS-Ultimate-Version",
    demo: "",
    playstore: "",
    cover: "pos",
    gallery: [],
    accent: "#f472b6",
    featured: false,
    orderIndex: 5,
  },
  {
    slug: "social-dashboard",
    title: "Social Dashboard",
    tagline: "Unified analytics for creators across 6 platforms",
    category: "Product",
    year: 2025,
    role: "Lead Android",
    duration: "4 months",
    team: "3 engineers",
    summary:
      "A creator analytics app that aggregates reach, engagement, and revenue from six social platforms into one Compose dashboard with offline caching.",
    overview:
      "Creators were hopping between six apps to understand their audience. Social Dashboard pulls it into one adaptive Compose dashboard with charts, benchmarks, and scheduled exports — readable on a phone in a queue.",
    problem:
      "Fragmented analytics, no cross-platform view, and no offline access meant creators made decisions blind between sessions.",
    approach:
      "A repository layer normalises each platform's API into a common metric model. Charts are rendered in Compose with a custom lightweight plotting layer, and responses are cached in Room for instant reload.",
    architecture:
      "MVVM with a normalized metrics domain, Retrofit + OkHttp for platform APIs, Room caching, and a Compose charting layer. Auth tokens are stored securely with EncryptedSharedPreferences.",
    features: [
      "6-platform unified analytics",
      "Custom Compose charting (no heavy deps)",
      "Offline-first cached dashboards",
      "Benchmark vs. category averages",
      "Scheduled PDF/CSV exports",
      "Secure token storage",
    ],
    outcomes: [
      "One screen replaces six apps for creators",
      "Instant reload from Room cache",
      "Shipped to a 5k-creator beta",
      "Top-requested export feature delivered",
    ],
    metrics: [
      { label: "Platforms", value: "6" },
      { label: "Beta creators", value: "5k" },
      { label: "Reload", value: "Instant" },
      { label: "Deps", value: "Minimal" },
    ] as Metric[],
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "MVVM",
      "Retrofit",
      "OkHttp",
      "Room",
      "EncryptedSharedPreferences",
    ],
    stackDetail:
      "Kotlin · Jetpack Compose · MVVM · Retrofit · OkHttp · Room · EncryptedSharedPreferences · custom Compose charts.",
    github: "https://github.com/moekyawaung-tech/social-dashboard",
    demo: "",
    playstore: "",
    cover: "social",
    gallery: [],
    accent: "#60a5fa",
    featured: false,
    orderIndex: 6,
  },
];

export const postSeed: NewPost[] = [
  {
    slug: "offline-first-android",
    title: "Designing Offline-First Android Apps That Feel Instant",
    excerpt:
      "Local-first isn't a fallback — it's the architecture. A practical pattern for Room, operation logs, and conflict-free sync on Android.",
    category: "Architecture",
    tags: ["Architecture", "Room", "Sync", "Compose"],
    readingMinutes: 8,
    featured: true,
    orderIndex: 1,
    cover: "aurora",
    content: `Most apps treat offline as an edge case. The best Android apps treat the network as the edge case.

## Start from the local store

Make Room your source of truth. Every screen reads from a conflated StateFlow derived from the database, never directly from a network call. The UI is always instant because it's always reading local state.

## Model changes as operations

Instead of "set value = X", record "entity E changed field F to X at time T". Replaying an operation log is what lets you merge concurrent edits without a server round-trip.

## Expose immutable state

Coroutines and Flow make this clean: a single \`state: StateFlow<UiModel>\` per screen, built with \`combine(...)\` and \`distinctUntilChanged()\`. The UI becomes a pure function of state.

## Resolve conflicts transparently

Last-writer-wins per field beats last-writer-wins per row. Show users a diff when something genuinely conflicts — don't surprise them.

The payoff: input latency under 50ms, zero lost work on flaky networks, and a sync engine other teams can reuse.`,
  },
  {
    slug: "taming-realtime-data",
    title: "Taming Realtime Data: Flows, Backpressure, and Batteries",
    excerpt:
      "Streaming 12,000 vehicle positions over cellular without melting the battery or the frame rate.",
    category: "Performance",
    tags: ["Realtime", "Performance", "Flow", "Maps"],
    readingMinutes: 7,
    featured: true,
    orderIndex: 2,
    cover: "transitlive",
    content: `Realtime is easy to start and hard to ship. Here's how we kept 12,000 live markers at 60fps while cutting battery use by a third.

## Conflation is your friend

Don't collect every socket message. Confluence them into a single StateFlow and only act on the latest per animation frame. Backpressure disappears when you stop trying to process everything.

## Diff before you render

Keep the last-known positions and only update markers that moved. Re-rendering 12,000 nodes every tick is what janks the map.

## Sample location adaptively

A bus at 60km/h doesn't need 1Hz GPS. Scale sampling to speed and motion — the single biggest battery win.

## Cache the last known network

A commuter opens the app in a tunnel. Room-backed last-known positions mean the app is still useful, and it silently catches up when signal returns.`,
  },
  {
    slug: "compose-design-system",
    title: "Building a Compose Design System That Scales to 9 Teams",
    excerpt:
      "Tokens, theming, and guardrails: how Aurora UI made 'consistent' the default across nine Android apps.",
    category: "Design System",
    tags: ["Compose", "Material 3", "Design Systems"],
    readingMinutes: 6,
    featured: true,
    orderIndex: 3,
    cover: "aurora",
    content: `A design system is a contract, not a component library.

## One token source of truth

Color, type, elevation, and motion live in a single definition compiled into typed Compose theme objects. Hardcode a color and the architecture test fails in CI.

## Components are stateless

Every Composable takes its state and emits events. Theme-agnostic components are trivially previewable and testable, and they survive rebrands.

## Accessibility is a build gate

Touch targets, contrast, and reduced-motion aren't optional. We added automated checks so a contrast failure can't reach the store.

## Make adoption free

Ship through a Gradle Version Catalog, document with previews, and the nine teams adopt it because it's easier than rolling their own.`,
  },
  {
    slug: "on-device-ml-tflite",
    title: "On-Device ML with TFLite: Lessons from MoekyawTranslator",
    excerpt:
      "Private, instant translation that escalates to the cloud only when it needs nuance.",
    category: "AI / ML",
    tags: ["TFLite", "On-Device ML", "Claude API"],
    readingMinutes: 9,
    featured: false,
    orderIndex: 4,
    cover: "translator",
    content: `Cloud models are smart but slow and leaky. On-device models are fast and private but flat. The trick is to use both, deliberately.

## First pass on-device

Quantized TFLite models run the common case entirely on the phone: sub-300ms translation, zero data leaves the device, works on a plane.

## Escalate for nuance

Tone and idiom need context. We send only the minimal phrase to the Claude API for a refine step — and only when the user asks. Everything else stays local.

## Keep the heavy work off the main thread

Interpreter inference, camera capture, and API calls all run on dedicated Coroutine dispatchers. The UI never stutters.

## Cache like it's the default

Repeated phrases are cached on-device, so a daily-driver translator gets faster the more you use it — without a single extra request.`,
  },
];

export const experiences = [
  {
    company: "Moekyaw Labs",
    role: "Lead Android Engineer",
    period: "2024 — Present",
    location: "Bangkok, Thailand (Remote)",
    current: true,
    summary:
      "Lead Android architecture across real-time and offline-first products, including PulseSync and TransitLive. Own the design-system and performance strategy.",
    highlights: [
      "Architected a reusable local-first sync module adopted by multiple apps",
      "Drove 99.2% crash-free sessions and a 40% startup improvement",
      "Mentored four engineers on Compose and Clean Architecture",
    ],
    tech: ["Kotlin", "Compose", "Clean Architecture", "Firebase", "GraphQL"],
  },
  {
    company: "Orbit Mobility",
    role: "Senior Android Engineer",
    period: "2022 — 2024",
    location: "Tachileik, Myanmar",
    current: false,
    summary:
      "Built large-scale realtime transit features on Android, owning the data pipeline and on-device rendering for live vehicle tracking.",
    highlights: [
      "Cut median update latency to 1.2s across 12k vehicles",
      "Reduced battery use by 35% with adaptive location sampling",
      "Scaled the app to 500k monthly active users",
    ],
    tech: ["Kotlin", "Compose", "WebSockets", "ProtoBuf", "Mapbox"],
  },
  {
    company: "BluePeak Studio",
    role: "Android Engineer",
    period: "2021 — 2022",
    location: "Remote",
    current: false,
    summary:
      "Shipped consumer apps across productivity, commerce, and media, with a focus on clean, testable architecture.",
    highlights: [
      "Introduced MVVM and automated testing to the Android team",
      "Delivered an offline-first POS used across 200 stores",
      "Set up the first CI/CD pipeline with GitHub Actions",
    ],
    tech: ["Kotlin", "MVVM", "Room", "Retrofit", "Fastlane"],
  },
  {
    company: "Freelance & Startups",
    role: "Junior Android Developer",
    period: "2020 — 2021",
    location: "Myanmar",
    current: false,
    summary:
      "Started shipping Android apps for local businesses while building a broad foundation across web, databases, and security.",
    highlights: [
      "Shipped a dozen production apps across varied domains",
      "Earned 82+ certificates across 9 technical categories",
      "Selected for the Google Developers Launchpad program",
    ],
    tech: ["Java", "Kotlin", "Firebase", "REST APIs"],
  },
];

export const skillGroups = [
  {
    name: "Android & Mobile",
    icon: "📱",
    items: [
      "Kotlin",
      "Jetpack Compose",
      "Android (View + Compose)",
      "Android Studio",
      "Material 3",
      "Jetpack (ViewModel, Navigation, Paging, Room)",
    ],
  },
  {
    name: "Architecture & Patterns",
    icon: "🏗️",
    items: [
      "Clean Architecture",
      "MVVM",
      "MVI",
      "Multi-module apps",
      "Coroutines",
      "Kotlin Flow",
      "SOLID · OOP",
    ],
  },
  {
    name: "Backend & Cloud",
    icon: "☁️",
    items: [
      "Firebase Suite",
      "REST APIs",
      "Retrofit · OkHttp",
      "GraphQL (Apollo)",
      "Room",
      "Ktor",
    ],
  },
  {
    name: "AI / ML",
    icon: "🤖",
    items: [
      "Claude API",
      "TFLite (on-device)",
      "MediaPipe",
      "Python",
      "TensorFlow",
    ],
  },
  {
    name: "DevOps & Quality",
    icon: "🔧",
    items: [
      "GitHub Actions",
      "Azure DevOps",
      "Jenkins · Fastlane",
      "JUnit · Espresso · MockK",
      "CI/CD",
      "Agile · Scrum",
    ],
  },
  {
    name: "Security & Platform",
    icon: "🔐",
    items: [
      "Ethical Hacking",
      "Cybersecurity",
      "Linux · Kali",
      "Microsoft Azure",
      "Git",
      "Figma",
    ],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/Dev-moe-kyawaung", handle: "Dev-moe-kyawaung" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1", handle: "moe-kyaw-aung" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG", handle: "Moekyaw" },
  { label: "Bluesky", href: "https://bsky.app/profile/moekyawaung96.bsky.social", handle: "@moekyawaung96" },
  { label: "Tumblr", href: "https://www.tumblr.com/moekyawaung", handle: "moekyawaung" },
  { label: "PayPal", href: "https://www.paypal.com/paypalme/my/profile", handle: "paypal.me" },
];

export const marqueeTech = [
  "Kotlin",
  "Jetpack Compose",
  "Clean Architecture",
  "MVVM / MVI",
  "Coroutines",
  "Kotlin Flow",
  "Firebase",
  "Room",
  "Retrofit",
  "GraphQL",
  "TFLite",
  "Claude API",
  "GitHub Actions",
  "Material 3",
  "WebSockets",
  "ProtoBuf",
];

/* ---------------------------------------------------------------------------
 * RECRUITER CONVERSION LAYER
 * Scannable proof designed to answer "is this the right person?" in seconds.
 * ------------------------------------------------------------------------ */

export const impactStats = [
  {
    value: "500k",
    label: "Monthly active users",
    detail: "Realtime transit app scaled and kept stable at peak load",
  },
  {
    value: "99.2%",
    label: "Crash-free sessions",
    detail: "Sustained across weekly releases with automated rollout gates",
  },
  {
    value: "-40%",
    label: "Cold start time",
    detail: "Startup profiling, module graph and baseline-profile work",
  },
  {
    value: "12k",
    label: "Live vehicles streamed",
    detail: "Sub-second realtime pipeline at 60fps on mid-range devices",
  },
];

export const recruiterFacts = [
  { k: "Current title", v: "Lead Android Engineer" },
  { k: "Experience", v: "5+ years (Android-native)" },
  { k: "Core stack", v: "Kotlin · Jetpack Compose · Clean Arch" },
  { k: "Team scope", v: "Led 4 · mentored 6 engineers" },
  { k: "Work setup", v: "Remote · Hybrid · Open to relocation" },
  { k: "Availability", v: "Interviewing now · 2 weeks notice" },
];

export const idealRoles = [
  "Senior Android Engineer",
  "Staff / Lead Android",
  "Mobile Platform Engineer",
  "Android Architect",
];

/* ---------------------------------------------------------------------------
 * ENGINEERING LEADERSHIP LAYER
 * Proof of judgement: decisions, quality systems, and collaboration.
 * ------------------------------------------------------------------------ */

export const leadershipPillars = [
  {
    icon: "🧭",
    title: "Architecture decisions",
    lead: "I write decisions down so teams can disagree with the reasoning, not the person.",
    proof: [
      "Introduced a lightweight ADR process — 40+ decisions recorded",
      "Module boundaries enforced in CI with Konsist architecture tests",
      "Reversible-by-default: every ADR names its exit strategy",
    ],
    metric: { value: "40+", label: "ADRs authored" },
  },
  {
    icon: "🧩",
    title: "Modularization",
    lead: "Broke a 220k-line monolith into feature modules owned by real teams.",
    proof: [
      "Monolith → 24 Gradle modules mapped to team ownership",
      "Clean build time cut from 11m to 4m via parallelization",
      "Convention plugins removed ~3k lines of duplicated Gradle config",
    ],
    metric: { value: "-62%", label: "Build time" },
  },
  {
    icon: "🚦",
    title: "Release quality",
    lead: "Shipping weekly is only safe if the pipeline can say no for you.",
    proof: [
      "Weekly release train with staged 1% → 100% rollouts",
      "Automated halt on crash-rate or ANR regression",
      "Pre-merge smoke suite on 6 device profiles via Firebase Test Lab",
    ],
    metric: { value: "99.2%", label: "Crash-free" },
  },
  {
    icon: "📡",
    title: "Observability",
    lead: "You cannot improve what you cannot see on a real user's device.",
    proof: [
      "Crash, ANR, and custom trace instrumentation with owner alerting",
      "Performance budgets asserted in CI via Macrobenchmark",
      "SLOs for cold start, frame time, and sync latency, reviewed weekly",
    ],
    metric: { value: "4h", label: "Median MTTR" },
  },
  {
    icon: "⚙️",
    title: "CI/CD",
    lead: "Fast, boring pipelines are a feature engineers feel every day.",
    proof: [
      "GitHub Actions pipeline tuned from 38 min to 9 min",
      "Fastlane-automated signing, changelogs, and staged store rollout",
      "Merge queue plus remote build cache to keep main always green",
    ],
    metric: { value: "9 min", label: "Pipeline" },
  },
  {
    icon: "🧑‍🏫",
    title: "Mentoring & growth",
    lead: "My job is to make the next architecture decision not need me.",
    proof: [
      "Mentored 6 engineers; 2 promoted to senior within a year",
      "Weekly design reviews and a written Android code-review rubric",
      "Onboarding to first merged PR reduced from 3 weeks to 5 days",
    ],
    metric: { value: "6", label: "Engineers mentored" },
  },
];

export const decisions = [
  {
    id: "ADR-021",
    title: "Modularize by feature, not by layer",
    status: "Adopted",
    context:
      "A single :app module held 220k lines. Every change triggered a full rebuild, ownership was ambiguous, and four teams constantly collided in the same files.",
    options: [
      "Keep the monolith and rely on package conventions",
      "Split by layer (:data, :domain, :ui) across the whole app",
      "Split by feature, each with internal layer packages",
    ],
    decision:
      "Split by feature. Each feature module owns its own data/domain/ui internally and exposes a narrow public API; shared concerns live in :core modules.",
    tradeoff:
      "Layer-splitting was faster to execute but would have kept every team in every module. Feature-splitting cost two extra weeks of migration and demanded stricter API discipline.",
    outcome:
      "24 modules with clear team ownership, clean build time down 62%, and merge conflicts on shared files effectively eliminated.",
    accent: "#7dd3fc",
  },
  {
    id: "ADR-027",
    title: "Local-first sync over server-authoritative writes",
    status: "Adopted",
    context:
      "Field users on unreliable networks lost work. Every write waited on a server round-trip, so the UI stalled and concurrent edits silently overwrote each other.",
    options: [
      "Optimistic UI with server as source of truth",
      "Full CRDT implementation",
      "Operation log in Room with field-level merge",
    ],
    decision:
      "An append-only operation log persisted in Room, replayed by a dedicated :sync module with field-level conflict resolution.",
    tradeoff:
      "CRDTs would be mathematically stronger but added a heavy dependency and a steep learning curve for the team. Field-level merge covers ~98% of real conflicts at a fraction of the complexity.",
    outcome:
      "Input latency under 50ms, sync conflicts down 60%, zero reported data loss, and a :sync module reused by two sister apps.",
    accent: "#34d399",
  },
  {
    id: "ADR-014",
    title: "MVI for realtime surfaces, MVVM everywhere else",
    status: "Adopted",
    context:
      "Map and live-tracking screens process thousands of events per minute. Mutable ViewModel state produced race conditions that were nearly impossible to reproduce.",
    options: [
      "Standardize on MVVM app-wide",
      "Standardize on MVI app-wide",
      "MVI only where event volume is high",
    ],
    decision:
      "MVI with a single immutable state object and a reducer on realtime screens; keep pragmatic MVVM for simple CRUD forms.",
    tradeoff:
      "Two patterns in one codebase is a real cost, so the boundary is documented and enforced in review. Forcing MVI everywhere would have added ceremony to trivial screens.",
    outcome:
      "Realtime race-condition bugs dropped to near zero and state became trivially testable and time-travel debuggable.",
    accent: "#a78bfa",
  },
  {
    id: "ADR-033",
    title: "Design tokens as the single source of truth",
    status: "Adopted",
    context:
      "Nine apps each hardcoded their own colors and spacing. Accessibility audits repeatedly failed on contrast, and rebrands meant touching every screen.",
    options: [
      "Shared Compose theme with hardcoded values",
      "Token definitions compiled into typed theme objects",
      "Per-app themes with a shared style guide document",
    ],
    decision:
      "Tokens defined once and compiled into typed Compose theme objects, with a lint rule failing the build on raw hex values.",
    tradeoff:
      "Teams lost the ability to one-off a color, which caused early friction. We added an explicit escape hatch requiring a review sign-off.",
    outcome:
      "Zero contrast failures across the last four audits, feature UI delivery 70% faster, and a full rebrand shipped in two days.",
    accent: "#fbbf24",
  },
  {
    id: "ADR-036",
    title: "Protocol Buffers over JSON for the transit feed",
    status: "Adopted",
    context:
      "12,000 vehicle positions polled as JSON saturated cellular connections and drove measurable battery drain during commutes.",
    options: [
      "Keep JSON with gzip compression",
      "Protocol Buffers over WebSocket",
      "Custom binary format",
    ],
    decision:
      "GTFS-Realtime Protocol Buffers over a supervised WebSocket with conflated delivery to the UI layer.",
    tradeoff:
      "Payloads became non-human-readable, hurting debuggability, so we shipped an internal debug overlay that decodes frames on-device.",
    outcome:
      "Payload size down 71%, median update latency 1.2s, and a 35% reduction in battery use versus the previous release.",
    accent: "#f472b6",
  },
];

export const scorecard = [
  { metric: "Crash-free sessions", value: "99.2%", how: "Crashlytics, release-gated" },
  { metric: "ANR rate", value: "0.08%", how: "Play Vitals, alerting on regression" },
  { metric: "Cold start (P90)", value: "1.1s", how: "Macrobenchmark in CI" },
  { metric: "CI pipeline", value: "9 min", how: "GitHub Actions + remote cache" },
  { metric: "Unit test coverage", value: "78%", how: "JaCoCo, enforced floor" },
  { metric: "Release cadence", value: "Weekly", how: "Automated train + staged rollout" },
  { metric: "Median MTTR", value: "4 hours", how: "On-call rotation, owner alerts" },
  { metric: "Modules", value: "24", how: "Konsist boundary tests" },
];

export const collaboration = [
  {
    with: "Product",
    icon: "🎯",
    headline: "Scope framed as impact, not tickets",
    points: [
      "Translate roadmap goals into technical options with explicit cost and risk",
      "Ship behind feature flags so product can validate before full rollout",
      "Bring instrumentation to every launch so success is measurable, not argued",
    ],
  },
  {
    with: "Design",
    icon: "🎨",
    headline: "A shared vocabulary, not a handoff",
    points: [
      "Figma tokens compile directly into Compose theme objects — no drift",
      "Motion and accessibility specs agreed before build, verified in review",
      "Component library previews double as the design review surface",
    ],
  },
  {
    with: "Backend",
    icon: "🔌",
    headline: "Contract-first, failure-aware",
    points: [
      "Co-design API contracts and schemas before either side writes code",
      "Shared error taxonomy so clients degrade predictably, never silently",
      "Joint load testing on realtime feeds ahead of every major launch",
    ],
  },
];
