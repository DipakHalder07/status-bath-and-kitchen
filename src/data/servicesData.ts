export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Residential" | "Commercial" | "Modular" | "All";
  image: string;
  highlights: string[];
  included: string[];
  pricingStarting: string;
  turnaroundTime: string;
  recommendedFrequency: string;
}

export interface CareBooklet {
  id: string;
  title: string;
  category: string;
  fileSize: string;
  description: string;
  coverImage: string;
  keyPoints: string[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
  category: "General" | "Warranty" | "AMC" | "Booking";
}

export const servicesList: ServiceItem[] = [
  {
    id: "repainting",
    title: "Repainting",
    tagline: "Breathe new life into your space",
    description:
      "Breathe new life into your space. Repaint your almirahs and metal pieces to unveil a fresh look that lasts for years to come.",
    category: "Residential",
    image: "/images/services/repainting.png",
    highlights: [
      "Over 40+ curated contemporary matte & gloss shades",
      "Automated spray booth with dust-free curing",
      "Anti-rust phosphate conversion treatment for metal",
      "Doorstep pickup & delivery or specialized on-site mask & spray",
    ],
    included: [
      "Surface sanding & dent leveling",
      "Anti-corrosive primer coating",
      "Two coats of automotive-grade PU / enamel lacquer",
      "Hardware polishing & re-alignment",
    ],
    pricingStarting: "₹3,499 per unit",
    turnaroundTime: "3 - 5 Days",
    recommendedFrequency: "Every 4 - 5 Years",
  },
  {
    id: "reupholstery",
    title: "Reupholstery",
    tagline: "Update your decor with stylish comfort",
    description:
      "Looking to update your decor? Choose from our wide range of materials and give your furniture a stylish new look with updated upholstery.",
    category: "Residential",
    image: "/images/services/reupholstery.png",
    highlights: [
      "300+ fabric choices: boucle, velvet, linen-blend & vegan leather",
      "High-resilience 40D polyurethane foam replenishment",
      "Pet-scratch resistant & liquid-repellent options",
      "Precise piping, tufting, and double-needle stitching",
    ],
    included: [
      "Old fabric stripping & frame inspection",
      "Spring suspension tightening & web tensioning",
      "Cushion batting and foam top renewal",
      "Final steam sanitization and protective nano-coating",
    ],
    pricingStarting: "₹4,999 per seat",
    turnaroundTime: "5 - 7 Days",
    recommendedFrequency: "Every 3 - 4 Years",
  },
  {
    id: "cleaning",
    title: "Cleaning",
    tagline: "Eco-friendly deep sanitization",
    description:
      "We deep-clean your sofas, chairs, and carpets using high-quality cleaning solutions to remove stains, maintain overall hygiene and make them look fresh.",
    category: "Residential",
    image: "/images/services/cleaning.png",
    highlights: [
      "High-pressure 140°C dry steam kills 99.9% of dust mites and bacteria",
      "German injection-extraction stain removal technology",
      "Non-toxic, bio-degradable, baby- and pet-safe detergents",
      "Rapid moisture extraction — dry and ready to use in 3 to 4 hours",
    ],
    included: [
      "Industrial high-vacuum dry dust extraction",
      "Pre-spray stain treatment for oil, food & beverage spills",
      "Agitation and deep fibre extraction",
      "Deodorizing botanical mist and anti-fungal barrier",
    ],
    pricingStarting: "₹1,899 per sofa set",
    turnaroundTime: "2 - 3 Hours on-site",
    recommendedFrequency: "Every 6 Months",
  },
  {
    id: "annual-care",
    title: "Annual Care",
    tagline: "Preventative maintenance for lasting luxury",
    description:
      "Extend the life of your furniture with our annual maintenance contract. Our expert care keeps your pieces looking their best and ensures durability.",
    category: "Modular",
    image: "/images/services/annual_care.png",
    highlights: [
      "Biannual comprehensive 24-point hardware check",
      "Free replacement of worn-out dampers and minor hardware",
      "Priority same-day technician dispatch for urgent plumbing or hinge faults",
      "Exclusive 15% discount on all spare parts and accessories",
    ],
    included: [
      "Hinge lubrication and door vertical/horizontal realignment",
      "Drawer runner balance testing and soft-close calibration",
      "Under-sink silicone sealant inspection to prevent water seepage",
      "Pantry pull-out mechanism weight re-balancing",
    ],
    pricingStarting: "₹4,499 per year",
    turnaroundTime: "Scheduled Bi-Annually",
    recommendedFrequency: "Annual Contract",
  },
  {
    id: "refurbishing",
    title: "Refurbishing",
    tagline: "Smart renewal at a fraction of replacement cost",
    description:
      "An ideal solution for workspaces where we replace fabrics to rejuvenate appearance and boost life, while keeping it affordable.",
    category: "Modular",
    image: "/images/services/refurbishing.png",
    highlights: [
      "Save up to 65% compared to purchasing new cabinetry",
      "Upgrade traditional cabinets to modern soft-close tandem drawers",
      "Laser-welded PUR edge-banding prevents moisture ingress",
      "Replace stained laminate shutters with sleek anti-fingerprint acrylic",
    ],
    included: [
      "On-site laser measurements and structural carcass inspection",
      "Custom shutter and drawer face fabrication",
      "Soft-close slide and clip-on hinge installation",
      "Post-installation alignment and warranty certificate",
    ],
    pricingStarting: "₹12,999 per kitchen module",
    turnaroundTime: "5 - 7 Days",
    recommendedFrequency: "As Needed",
  },
  {
    id: "densification",
    title: "Densification",
    tagline: "Layout reconfiguration for maximum spatial efficiency",
    description:
      "We optimise your office space and give it a new look, while enhancing the layout - this improves privacy and productivity of your people.",
    category: "Commercial",
    image: "/images/services/densification.png",
    highlights: [
      "Architectural 3D space utilization audit",
      "Modular workstation relocation, cabling management & re-sizing",
      "Acoustic felt screen zoning for noise dampening",
      "Zero disruption with overnight and weekend installation teams",
    ],
    included: [
      "Current layout CAD mapping and flow analysis",
      "Reconfiguration proposal with 3D renderings",
      "Professional disassembly, leveling, and reassembly",
      "Cable ducting, power grommet re-routing, and ergonomics audit",
    ],
    pricingStarting: "₹850 per workstation",
    turnaroundTime: "1 - 3 Days (Weekend execution)",
    recommendedFrequency: "When Team Grows / Office Remodels",
  },
  {
    id: "kitchen-bath-health-check",
    title: "Kitchen & Bath 21-Point Health Check",
    tagline: "Complete preventative plumbing & cabinet inspection",
    description:
      "Our specialized technicians perform a meticulous diagnostic of your modular kitchen and bathroom wet areas to identify micro-leaks, drain blockages, hinge sag, and gas conduit aging before they cause costly damage.",
    category: "Modular",
    image: "/images/site/look-kitchen.jpg",
    highlights: [
      "Moisture meter detection behind base cabinets and false ceiling",
      "Drain trap descaling and cockroach-stop seal verification",
      "Gas regulator pressure and burner safety check",
      "Written inspection report with actionable recommendations",
    ],
    included: [
      "Sink waste coupling tight-seal testing",
      "Silicone bead scraping and antimicrobial re-caulking",
      "Full hardware tension and leveling pass",
      "Water purifier line pressure and shutoff valve testing",
    ],
    pricingStarting: "₹1,299 per inspection visit",
    turnaroundTime: "90 Minutes on-site",
    recommendedFrequency: "Once Every 12 Months",
  },
  {
    id: "design-consultation",
    title: "Free In-Home 3D Design Consultation",
    tagline: "From concept sketch to photorealistic 3D visualization",
    description:
      "Invite a senior Status space architect to your home. We measure your layout with precision laser tools, discuss material finishes, and generate a photorealistic 3D render with transparent pricing.",
    category: "All",
    image: "/images/site/cat-bath-vanity.jpg",
    highlights: [
      "Zero obligation, 100% complimentary home visit",
      "Millimeter-accurate electronic room mapping",
      "Live material sample box brought to your doorstep",
      "Itemized transparent estimate with zero hidden extras",
    ],
    included: [
      "On-site architectural measurement",
      "Lifestyle & storage habit assessment",
      "3D floorplan and finish options review",
      "Comprehensive quote breakdown with easy EMI options",
    ],
    pricingStarting: "100% Complimentary",
    turnaroundTime: "24 - 48 Hours scheduling",
    recommendedFrequency: "For Any Renovation or New Home",
  },
];

export const careBooklets: CareBooklet[] = [
  {
    id: "booklet-kitchen",
    title: "Modular Kitchen Care & Daily Maintenance Guide",
    category: "Modular Kitchens",
    fileSize: "2.4 MB PDF",
    description:
      "Official maintenance manual covering acrylic, PU, laminate, and glass surfaces. Includes countertop stain removal protocols and hinge adjustment diagrams.",
    coverImage: "/images/site/cat-kitchen-island.jpg",
    keyPoints: [
      "Daily wipe-down routines using microfiber cloths and pH-neutral cleaners",
      "Preventing moisture ingress into base carcass panels",
      "Blum soft-close hinge micro-adjustment via screwdriver screws",
      "Chimney baffle filter degreasing schedule and dishwasher settings",
    ],
  },
  {
    id: "booklet-bath",
    title: "Bathroom Ceramics, Faucets & Acrylic Care",
    category: "Bathrooms",
    fileSize: "1.8 MB PDF",
    description:
      "Learn how to protect chrome and PVD brushed gold brassware against hard water spots, maintain rimless ceramic glazes, and prevent bathroom mold.",
    coverImage: "/images/site/cur-b-wood.jpg",
    keyPoints: [
      "Removing stubborn hard-water scale without scratching chrome or black matt PVD",
      "Care instructions for LED defogger mirrors and quartz vanity counters",
      "Drain trap hair-trap maintenance for uninhibited water drainage",
      "Safe disinfectant list that won't etch silicone seals",
    ],
  },
  {
    id: "booklet-wardrobes",
    title: "Engineered Wardrobes & Sliding Track Handbook",
    category: "Wardrobes",
    fileSize: "2.1 MB PDF",
    description:
      "Step-by-step guidance on keeping sliding wardrobe tracks whisper-quiet, lubricating drawer runners, and caring for leatherette internal accessories.",
    coverImage: "/images/site/look-living.jpg",
    keyPoints: [
      "Sliding door floor-track dust vacuuming and roller bearing lubrication",
      "Hydraulic loft lifter tension calibration",
      "Preventing moth and moisture buildup in high-humidity monsoon seasons",
      "Cleaning sensor LED light bars and battery charging guidelines",
    ],
  },
];

export const servicesFAQs: ServiceFAQ[] = [
  {
    question: "How quickly can a service technician visit after logging a request?",
    answer:
      "For routine service requests (repainting, cleaning, maintenance), appointments are scheduled within 24 to 48 hours based on your preferred time slot. For active Annual Maintenance Contract (AMC) holders or emergency plumbing/electrical requests, our priority technician dispatch responds within 4 to 6 hours.",
    category: "Booking",
  },
  {
    question: "What is covered under the Status 10-Year Warranty?",
    answer:
      "Our 10-Year Modular Kitchen & Wardrobe Warranty covers structural integrity of BWP marine-grade plywood, Blum and Hettich hardware hinges, drawer runner mechanisms, and factory edge-band adhesion against manufacturing defects. Consumable items like LED bulbs and silicone caulking are covered under our 1-year complimentary service warranty.",
    category: "Warranty",
  },
  {
    question: "Can you service or repair modular kitchens from other brands?",
    answer:
      "Yes! Our skilled technicians can replace broken hinges, retrofit soft-close drawers, install modern pull-out pantry baskets, repaint cabinet doors, or re-caulk countertops for modular kitchens and wardrobes made by any manufacturer or local carpenter.",
    category: "General",
  },
  {
    question: "How does the Annual Maintenance Contract (AMC) work?",
    answer:
      "When you enroll in our AMC plan, you receive two scheduled comprehensive maintenance visits per year. Our technician inspects, lubricates, and aligns all hinges, drawers, pull-outs, and plumbing seals. You also receive unlimited callouts with zero labour charges and a 15% discount on all original spare parts.",
    category: "AMC",
  },
  {
    question: "Are the chemicals used in deep cleaning safe for children and pets?",
    answer:
      "Absolutely. We strictly use German bio-degradable, hypoallergenic, non-chlorine cleaning agents formulated specifically for residential environments. The upholstery and carpets are steam-sanitized at 140°C and fully dry within 3 to 4 hours.",
    category: "General",
  },
];

