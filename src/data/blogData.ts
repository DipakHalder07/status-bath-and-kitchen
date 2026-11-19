export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface BlogContentSection {
  id: string;
  heading: string;
  paragraphs: string[];
  image?: string;
  imageCaption?: string;
  proTip?: string;
  bulletPoints?: string[];
  comparisonTable?: {
    headers: string[];
    rows: string[][];
  };
}

export interface BlogArticleFull {
  slug: string;
  title: string;
  excerpt: string;
  category: "Modular Kitchens" | "Bathrooms" | "Wardrobes" | "Materials & Care" | "Living & Decor";
  readTime: string;
  publishedAt: string;
  image: string;
  author: Author;
  tags: string[];
  keyTakeaways: string[];
  sections: BlogContentSection[];
  relatedProductIds: string[];
  faqs?: { q: string; a: string }[];
}

export const blogCategories = [
  "All Articles",
  "Modular Kitchens",
  "Bathrooms",
  "Wardrobes",
  "Materials & Care",
  "Living & Decor",
] as const;

export const blogArticles: BlogArticleFull[] = [
  {
    slug: "modular-kitchen-layouts-golden-triangle-guide",
    title: "Modular Kitchen Layouts: Mastering the Golden Triangle for Indian Homes",
    excerpt: "Understand how the distance between your hob, sink, and refrigerator determines cooking speed, ergonomic comfort, and clutter control.",
    category: "Modular Kitchens",
    readTime: "6 min read",
    publishedAt: "12th May, 2026",
    image: "/images/site/cat-kitchen-island.jpg",
    author: {
      name: "Pooja Singhania",
      role: "Lead Kitchen Architect",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80",
    },
    tags: ["Modular Kitchen", "Ergonomics", "Indian Cooking", "Space Planning"],
    keyTakeaways: [
      "The sum of all three sides of the kitchen work triangle should ideally measure between 12 and 26 feet.",
      "Parallel and L-shaped kitchens offer the most resilient workflows for Indian multi-cook routines.",
      "Locate the sink near natural light or mechanical ventilation to keep wet prep areas hygienic and dry.",
      "Ensure heavy spice and oil pullouts sit directly to the right or left of the cooktop for zero-step access.",
    ],
    sections: [
      {
        id: "what-is-work-triangle",
        heading: "What is the Kitchen Work Triangle?",
        paragraphs: [
          "Developed in the 1940s by architectural researchers, the Kitchen Work Triangle connects the three primary high-activity nodes of any culinary space: the refrigerator (storage & retrieval), the sink (cleaning & prep), and the hob (cooking).",
          "In modern Indian homes, cooking is vibrant, spice-intensive, and often involves multiple generations cooking together. Applying the work triangle ensures that cook and helper paths never collide, oil splashes stay confined away from fresh ingredients, and steps taken per meal prep decrease by up to 35%.",
        ],
        proTip: "Never place the refrigerator directly adjacent to the hob. The radiant heat forces the compressor to overwork and creates a bottleneck when opening door drawers.",
      },
      {
        id: "evaluating-layouts",
        heading: "Comparing the 4 Primary Kitchen Layouts",
        paragraphs: [
          "Every floorplan imposes distinct dimensional parameters. Here is how the most popular configurations compare in daily Indian use:",
        ],
        comparisonTable: {
          headers: ["Layout Type", "Best Suited For", "Triangle Efficiency", "Ideal Room Size"],
          rows: [
            ["L-Shaped", "Open-plan living & compact apartments", "High (Compact flow)", "80 - 140 sq.ft."],
            ["Parallel / Galley", "Dedicated long kitchens & dual cooks", "Maximum (Zero wasted steps)", "90 - 180 sq.ft."],
            ["U-Shaped", "Independent villas & large families", "Exceptional (Surround zones)", "130 - 250 sq.ft."],
            ["Island Kitchen", "Luxury entertaining & breakfast bars", "Premium (Multi-station)", "180+ sq.ft."],
          ],
        },
        image: "/images/site/cur-k-handleless.jpg",
        imageCaption: "A parallel kitchen layout with integrated appliances and handleless acrylic shutters.",
      },
      {
        id: "indian-kitchen-nuances",
        heading: "Indian Kitchen Specifics: Spice Racks, Wet Zones & Ventilation",
        paragraphs: [
          "Unlike Western pantries centered around dry canned boxes, Indian cooking depends on 20+ everyday whole and ground spices, heavy iron tadka pans, wet grinders, and pressure cookers. Standard drawer hardware often sags under this localized load.",
          "We specify 40kg dynamic-rated Austrian soft-close tandem boxes lined with anti-skid food-grade mats, accompanied by twin tall-bottle spice pullouts equipped with stainless steel guard rails.",
        ],
        bulletPoints: [
          "Separate Wet Washing from Dry Chopping: Maintain at least 30 inches of counter run between the sink rim and the cooktop edge.",
          "High-Airflow Chimney Ducting: Choose 1200+ m3/hr suction with filterless auto-clean mechanisms to exhaust mustard and chili smoke.",
          "Heat-Resistant Backsplashes: Avoid porous grout behind the stove; use seamless quartz or high-gloss sintered porcelain slabs.",
        ],
      },
      {
        id: "material-durability",
        heading: "Selecting the Right Marine Core & Shutter Finishes",
        paragraphs: [
          "Water damage remains the primary failure mode of sub-standard kitchen cabinets. For Indian kitchens where counter wiping and floor mopping happen multiple times daily, base cabinets must be constructed with BWP (Boiling Water Proof) Marine Grade IS:710 plywood.",
          "For door fronts, anti-fingerprint acrylic or thermal PET laminates offer scratch resilience and wipe clean effortlessly with warm soapy water without yellowing under sunlight.",
        ],
        proTip: "Always demand 1mm PVC edgebanding sealed with PUR (polyurethane) waterproof glue rather than conventional EVA hot-melt.",
      },
    ],
    relatedProductIds: ["cur-k-handleless", "cur-k-shaker", "cur-k-sage"],
    faqs: [
      {
        q: "What is the standard counter height for Indian modular kitchens?",
        a: "Standard counter height is between 32 and 34 inches (820mm - 860mm), adjusted based on the primary cook's height to prevent back strain during repetitive rolling and stirring.",
      },
      {
        q: "Can I install an island kitchen in a small 100 sq.ft. space?",
        a: "An island requires at least 36 to 42 inches of clearance on all 4 sides for drawer opening and walkway circulation. For rooms under 130 sq.ft., a peninsula or rolling breakfast bar is strongly recommended instead.",
      },
    ],
  },
  {
    slug: "small-bathroom-makeover-hacks",
    title: "Small Bathroom Makeovers: 8 Smart Ways to Create a Spa Experience",
    excerpt: "Turn a compact 35-sq.ft. bathroom into a calm, moisture-proof haven with floating vanities, frameless glass partitions, and concealed cisterns.",
    category: "Bathrooms",
    readTime: "5 min read",
    publishedAt: "28th April, 2026",
    image: "/images/site/deal-bath.jpg",
    author: {
      name: "Vikramaditya Roy",
      role: "Sanitaryware & Bath Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    },
    tags: ["Bathroom Design", "Small Spaces", "Sanitaryware", "Storage"],
    keyTakeaways: [
      "Wall-hung sanitaryware and floating vanity cabinets open up unbroken floor tiles, making rooms feel 30% larger.",
      "Fixed glass shower screens separate wet splashing from vanity grooming zones with zero visual bulk.",
      "Recessed wall niches in the shower stall eliminate protruding wire caddies and rusted shampoo shelves.",
      "Large-format 600x1200mm rectified tiles reduce grout seams and visual grid clutter.",
    ],
    sections: [
      {
        id: "opening-floor-plane",
        heading: "1. Elevate Everything: The Power of Wall-Hung Fixtures",
        paragraphs: [
          "The eye measures the boundary of a small room by the amount of visible floor plate. Floor-standing vanity pedestals and traditional WC bowls anchor the perimeter and make tight spaces feel cramped.",
          "By mounting a wall-hung WC with an in-wall concealed cistern and floating vanity drawers 10 inches off the tile, the uninterrupted floor line expands perceived room depth while making routine mopping effortless.",
        ],
        image: "/images/site/cur-b-marble.jpg",
        imageCaption: "Floating quartz-top vanity paired with concealed PVD matte black plumbing.",
      },
      {
        id: "wet-dry-separation",
        heading: "2. The Glass Partition Rule: Banishing Wet Floors Forever",
        paragraphs: [
          "One of the biggest frustrations in compact Indian bathrooms is stepping onto a wet, slippery floor after a family member showers.",
          "Installing a frameless 8mm toughened glass walk-in panel (typically 30 to 36 inches wide) creates a dedicated wet shower zone without needing a swinging door. Pair this with a 15mm floor threshold or slope-graded linear tile-insert drain.",
        ],
        proTip: "Select glass treated with nano-hydrophobic coating so hard water mineral spots do not adhere to the surface.",
      },
      {
        id: "lighting-mirrors",
        heading: "3. Backlit LED Mirrors & Vertical Recessed Niches",
        paragraphs: [
          "Overhead single bulbs cast harsh shadows across the face and make corners feel dark. A defogging LED mirror with 4000K natural warm lighting provides even illumination for shaving and skincare.",
          "Take advantage of wall cavity thickness behind the plumbing chase to build 4-inch deep tiled niches for shampoo, soap, and bath essentials.",
        ],
        bulletPoints: [
          "Use warm 3000K-4000K LED strip illumination in wall recesses for relaxing evening ambient baths.",
          "Opt for high-velocity IPX4 silent inline exhaust fans to extract steam in under 3 minutes.",
          "Select brushed brass or gunmetal PVD tapware for superior hard-water stain resistance over standard chrome.",
        ],
      },
    ],
    relatedProductIds: ["cur-b-marble", "cur-b-wood", "cur-b-spa"],
  },
  {
    slug: "sliding-vs-hinged-wardrobes-comparison",
    title: "Sliding vs Hinged Wardrobes: Which Suits Your Bedroom Best?",
    excerpt: "Compare floor clearance, internal visibility, mirror integration, and long-term hardware durability to make the right choice.",
    category: "Wardrobes",
    readTime: "4 min read",
    publishedAt: "19th April, 2026",
    image: "/images/site/cat-wardrobe-walkin.jpg",
    author: {
      name: "Ananya Deshmukh",
      role: "Storage & Wardrobe Stylist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80",
    },
    tags: ["Wardrobes", "Bedroom Furniture", "Space Saving", "Home Styling"],
    keyTakeaways: [
      "Sliding wardrobes require zero exterior swing space, making them ideal for bedrooms with less than 3 feet of bed clearance.",
      "Hinged wardrobes allow 100% full internal compartment visibility at once, whereas sliding systems only expose 50% at any moment.",
      "Internal wardrobe lighting and integrated pull-out trouser racks double day-to-day organizational efficiency.",
    ],
    sections: [
      {
        id: "walkway-clearance",
        heading: "Floor Clearance: The Crucial 36-Inch Measurement",
        paragraphs: [
          "Before deciding on aesthetics, measure the distance between your wardrobe front and the side of your mattress or doorway. A standard hinged door swings outward between 18 and 24 inches, requiring at least 36 inches of clear walking corridor.",
          "If your walkway is under 30 inches, a bottom-rolling or top-hung sliding system eliminates collision points entirely.",
        ],
        comparisonTable: {
          headers: ["Feature", "Hinged Wardrobes", "Sliding Wardrobes"],
          rows: [
            ["Door Clearance Needed", "20 - 24 inches swing clearance", "Zero clearance (glides internally)"],
            ["Internal Storage Visibility", "100% open at once", "50% open at once (two-track)"],
            ["Back of Door Usage", "Can mount ties, belts & mirrors", "Cannot use back of doors"],
            ["Maximum Width", "Any width (modular)", "Best for runs 5 feet and wider"],
            ["Long-term Maintenance", "Minimal (standard hinges)", "Requires track dust cleaning"],
          ],
        },
      },
      {
        id: "internal-customization",
        heading: "Customizing the Internal Ergonomics",
        paragraphs: [
          "Wardrobe satisfaction comes from what is behind the doors. Combine double-hanging rods for shirts and sarees with shallow jewelry drawers lined with velvet and heavy-duty soft-close pullout wicker baskets for bed linens.",
        ],
        proTip: "Equip your wardrobe with automatic door-triggered PIR sensor LED light profiles so you can dress without disturbing your sleeping partner.",
      },
    ],
    relatedProductIds: ["ward-walkin-luxury", "ward-sliding-glass", "ward-hinged-scandi"],
  },
  {
    slug: "modern-kitchen-countertop-materials-guide",
    title: "Quartz, Granite or Sintered Stone? The Ultimate Countertop Guide",
    excerpt: "From turmeric stains and boiling oil spillage to knife scratch resistance, find the perfect kitchen worktop material for Indian culinary demands.",
    category: "Materials & Care",
    readTime: "7 min read",
    publishedAt: "5th April, 2026",
    image: "/images/site/look-kitchen.jpg",
    author: {
      name: "Pooja Singhania",
      role: "Lead Kitchen Architect",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80",
    },
    tags: ["Countertops", "Quartz", "Granite", "Kitchen Materials"],
    keyTakeaways: [
      "Engineered Quartz provides zero-porosity, meaning turmeric (haldi) and coffee stains wipe off with zero residue.",
      "Granite offers unbeatable thermal tolerance for hot kadhais straight from the flame, but requires periodic sealing.",
      "Sintered stone is the newest ultra-compact surface: completely scratch-proof, UV-stable, and knife-durable.",
    ],
    sections: [
      {
        id: "the-indian-cooking-test",
        heading: "The Real Test: Haldi, Lemon, and Boiling Oil",
        paragraphs: [
          "Indian cooking subjects kitchen counters to challenges rarely seen elsewhere: crushed turmeric, sour tamarind, lime juice acid, and cast-iron cookware heated to 250°C.",
          "Choosing the wrong surface leads to permanent yellow rings, acid etching, or hairline thermal shock fractures around the sink and hob cutouts.",
        ],
        comparisonTable: {
          headers: ["Material", "Stain Resistance", "Heat Tolerance", "Scratch Proof", "Maintenance"],
          rows: [
            ["Engineered Quartz", "9.5/10 (Non-porous)", "8/10 (Use trivets for hot pots)", "9/10", "Zero sealing required"],
            ["Natural Granite", "7/10 (Requires annual seal)", "10/10 (Heat immune)", "8.5/10", "Periodic resealing"],
            ["Sintered Stone", "10/10 (Pore-free)", "10/10 (Flame resistant)", "10/10 (Diamond-hard)", "Virtually maintenance-free"],
            ["Solid Acrylic", "8/10 (Can scratch easily)", "5/10 (Low thermal limit)", "6/10", "Can be buffed out"],
          ],
        },
      },
      {
        id: "sink-mounting-edge-profiles",
        heading: "Under-mount Sinks and Chamfered Edge Profiles",
        paragraphs: [
          "Always pair your countertop with an under-mount sink. Unlike top-mount drop-in sinks where grime collects under the silicone lip, under-mount installations allow you to sweep water and crumbs directly from the counter into the bowl with a sponge.",
          "For edges, avoid sharp 90-degree corners that chip when struck by pressure cookers. Opt for a 3mm pencil round or chamfer profile.",
        ],
        proTip: "Check that your countertop fabricator reinforces the sink cutout with submerged steel rods or fiberglass netting to prevent handling fractures.",
      },
    ],
    relatedProductIds: ["cur-k-handleless", "cur-k-wood", "cur-k-diner"],
  },
  {
    slug: "sustainable-materials-eco-friendly-furniture",
    title: "Eco-Friendly Living: How Low-VOC and Recycled Materials Protect Your Health",
    excerpt: "Discover how FSC-certified timber, E0 low-emission core boards, and non-toxic waterborne finishes elevate indoor air quality.",
    category: "Materials & Care",
    readTime: "5 min read",
    publishedAt: "24th March, 2026",
    image: "/images/status/about_career.jpg",
    author: {
      name: "Aditya Kulkarni",
      role: "Sustainability Director",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    },
    tags: ["Sustainability", "Indoor Air Quality", "Green Living", "Materials"],
    keyTakeaways: [
      "Traditional particle boards emit formaldehyde gas for up to 3 years; E0 and CARB Phase 2 boards emit near-zero fumes.",
      "Powder-coated aluminum frames and steel hardware are 100% recyclable infinitely with zero degradation.",
      "Status Bath & Kitchen products adhere to strict FSC-certified sustainable timber sourcing guidelines.",
    ],
    sections: [
      {
        id: "indoor-air-quality",
        heading: "What Are VOCs and Why Do They Matter in Your Bedroom?",
        paragraphs: [
          "Volatile Organic Compounds (VOCs) are chemical gases released by solvent-based adhesives, polyurethane paints, and urea-formaldehyde resins commonly used in commercial furniture.",
          "Because modern air-conditioned bedrooms remain sealed with limited fresh air circulation, high-VOC furniture causes morning eye irritation, respiratory discomfort, and disturbed REM sleep.",
          "We manufacture all cabinetry using low-emission adhesives meeting European E0 standards, safeguarding infants and elderly family members.",
        ],
      },
      {
        id: "circular-lifecycle",
        heading: "The Wecycle Circular Furniture Commitment",
        paragraphs: [
          "True sustainability extends beyond manufacturing into end-of-life responsibility. Through our closed-loop initiative, customer furniture reaching retirement is disassembled, segregated into raw metal and timber pellets, and repurposed rather than sent to urban landfills.",
        ],
        proTip: "Look for GreenGuard Gold and FSC certification marks whenever investing in fitted furniture for bedrooms and nurseries.",
      },
    ],
    relatedProductIds: ["ward-hinged-scandi", "cur-k-sage", "cur-b-wood"],
  },
  {
    slug: "living-room-space-saving-furniture-trends",
    title: "10 Space-Saving Living Room Trends Revolutionizing Indian Apartments",
    excerpt: "From floating TV consoles with hidden cable channels to modular sectional seating and nested tables, maximize open floor area effortlessly.",
    category: "Living & Decor",
    readTime: "6 min read",
    publishedAt: "10th March, 2026",
    image: "/images/site/look-living.jpg",
    author: {
      name: "Ananya Deshmukh",
      role: "Storage & Wardrobe Stylist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80",
    },
    tags: ["Living Room", "Space Saving", "Modern Decor", "Apartment Living"],
    keyTakeaways: [
      "Floating consoles keep room edges clear and accommodate robot vacuum cleaners effortlessly.",
      "Nesting coffee tables expand when hosting festive guests and tuck away for open kids' play areas.",
      "Vertical slatted acoustic wood paneling draws the eye upward, making standard 9-foot ceilings feel expansive.",
    ],
    sections: [
      {
        id: "vertical-storage",
        heading: "1. Thinking Vertically: Slatted Paneling & Floating Consoles",
        paragraphs: [
          "In high-density city apartments, square footage is precious, but cubic volume (vertical wall space) is often underutilized.",
          "A wall-mounted TV media unit with fluted oak paneling, integrated warm LED backlights, and concealed cable passages keeps floors entirely uncluttered while doubling as a striking design focal point.",
        ],
      },
      {
        id: "multi-functional-seating",
        heading: "2. Dual-Purpose Seating & Ottoman Storage",
        paragraphs: [
          "Select sectional sofas with lift-up hydraulic storage chaises to stow festive quilts, extra cushions, and board games out of sight.",
          "Pair this with lightweight nested marble-top accent tables that can easily be dispersed around the seating area during tea time.",
        ],
      },
    ],
    relatedProductIds: ["cur-k-wood", "cur-d-glass", "cur-b-bright"],
  },
];

export function getBlogArticleBySlug(slug: string): BlogArticleFull | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getRelatedArticles(currentSlug: string, count = 3): BlogArticleFull[] {
  return blogArticles.filter((a) => a.slug !== currentSlug).slice(0, count);
}

