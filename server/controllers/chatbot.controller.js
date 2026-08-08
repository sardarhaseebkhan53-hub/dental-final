/* Junaid Dental Care — Chatbot API (knows site A-Z, developed by Sardar Haseeb) */
const { success, fail, asyncHandler } = require("../lib/response");

// Same KB as client — kept in sync for server responses
const DEVELOPER = {
  name: "Sardar Haseeb",
  email: "sardarghaseeb777@gmail.com",
  phone: "03369778543",
  phoneDisplay: "0336 9778543",
  phoneIntl: "+92 336 9778543",
  whatsapp: "923369778543",
};

const CLINIC = {
  name: "Junaid Dental Care",
  tagline: "Premium Dental Care with a Personal Touch",
  founded: 2006,
  rating: "4.6/5 on Google — 487+ reviews",
  address: "Main Lehtrar Road, Alipur U turn, near Old Bank Stop, Ali Pur, Islamabad 45600, Pakistan",
  phones: ["+92 312 5028812", "+92 314 8290684"],
  email: "junaiddental22@gmail.com",
  whatsapp: "923125028812",
  maps: "https://maps.app.goo.gl/J9DzSYyFtrsJFhTr6",
  hours: {
    weekday: "8:00 AM - 9:00 PM",
    sunday: "Closed (Emergency Only)",
  },
};

const SERVICES = [
  { slug: "general-dentistry", name: "General Dentistry", price: "PKR 1,500" },
  { slug: "cosmetic-dentistry", name: "Cosmetic Dentistry", price: "from PKR 8,500" },
  { slug: "orthodontics", name: "Orthodontics & Braces", price: "from PKR 45,000" },
  { slug: "dental-implants", name: "Dental Implants", price: "from PKR 85,000" },
  { slug: "teeth-whitening", name: "Teeth Whitening", price: "PKR 6,500" },
  { slug: "pediatric-dentistry", name: "Pediatric Dentistry", price: "PKR 1,200" },
  { slug: "emergency-care", name: "Emergency Care", price: "PKR 2,500" },
  { slug: "root-canal-therapy", name: "Root Canal Therapy", price: "PKR 12,000" },
  { slug: "periodontal-treatment", name: "Periodontal Treatment", price: "PKR 4,500" },
  { slug: "wisdom-tooth-extraction", name: "Wisdom Tooth Extraction", price: "PKR 8,000" },
  { slug: "dental-crowns-bridges", name: "Dental Crowns & Bridges", price: "PKR 15,000" },
  { slug: "dental-fillings", name: "Dental Fillings", price: "PKR 2,000" },
];

function answerFor(query) {
  const q = String(query || "").toLowerCase().trim();
  const qOrig = String(query || "").trim();

  // Developer intent — highest priority
  if (/(who (made|built|developed|created|designed)|developer|made this|who is sardar|about sardar|credit|developed by)/i.test(qOrig) || /sardar haseeb|sardarghaseeb|03369778543/i.test(qOrig)) {
    return {
      answer: `This website and chatbot were developed by ${DEVELOPER.name} — ${DEVELOPER.email} | ${DEVELOPER.phoneDisplay} (${DEVELOPER.phone}). He built the entire Junaid Dental Care platform including this AI assistant that knows the site A to Z.`,
      developer: DEVELOPER,
      suggestions: ["Contact clinic", "Our services", "Book appointment"],
      links: [
        { label: "Email Developer", href: "mailto:" + DEVELOPER.email },
        { label: "WhatsApp Developer", href: "https://wa.me/" + DEVELOPER.whatsapp },
      ],
    };
  }

  if (/(contact|phone|call|whatsapp|email|address|location|map|where)/i.test(q) && !/sardar/i.test(q)) {
    return {
      answer: `Contact Junaid Dental Care: Phone ${CLINIC.phones.join(" / ")}, WhatsApp +92 312 5028812, Email ${CLINIC.email}, Address: ${CLINIC.address}. Maps: ${CLINIC.maps}. Hours: Mon-Sat ${CLINIC.hours.weekday}, Sun ${CLINIC.hours.sunday}. Developed by ${DEVELOPER.name} (${DEVELOPER.email}).`,
      developer: DEVELOPER,
      clinic: CLINIC,
    };
  }

  if (/(service|treatment|price|cost|fee)/i.test(q)) {
    const list = SERVICES.map((s) => `${s.name}: ${s.price}`).join("; ");
    return {
      answer: `We offer 12 services: ${list}. First consultation PKR 1,500. Flexible instalments available. See /services and /pricing.`,
      services: SERVICES,
      developer: DEVELOPER,
    };
  }

  if (q) {
    return {
      answer: `I'm the Junaid Dental Care assistant — I know the entire website (services, doctors, pricing, contact, gallery & more). Ask me about services, doctors, location, hours, booking, emergency, or pricing. Clinic: ${CLINIC.address}, Phone ${CLINIC.phones[0]}. Developed by ${DEVELOPER.name} — ${DEVELOPER.email} | ${DEVELOPER.phoneDisplay}.`,
      clinic: CLINIC,
      developer: DEVELOPER,
      suggestions: ["Our services", "Doctors", "Location & timings", "Book appointment"],
    };
  }

  return {
    answer: `Hello! I'm your Junaid Dental Care assistant (developed by ${DEVELOPER.name}). I know this website A to Z — ask me anything!`,
    developer: DEVELOPER,
    clinic: CLINIC,
  };
}

// POST /api/chatbot/message  { message: "hi" }
// GET  /api/chatbot/message?q=hello
const chat = asyncHandler(async (req, res) => {
  const message = String(req.body?.message || req.query?.q || req.query?.message || "").trim();
  if (!message) return fail(res, 400, "Please provide a message. Example: { message: 'What are your services?' }");
  const data = answerFor(message);
  return success(res, { query: message, ...data });
});

// GET /api/chatbot/info  — full knowledge for client preloading
const info = asyncHandler(async (req, res) => {
  return success(res, {
    clinic: CLINIC,
    developer: DEVELOPER,
    services: SERVICES,
    stats: { years: 16, patients: "12,000+", specialists: 6, satisfaction: "98%", reviews: 487 },
    pages: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Doctors", href: "/doctors" },
      { label: "Book Appointment", href: "/book-appointment" },
      { label: "Contact", href: "/contact" },
    ],
  });
});

// GET /api/chatbot/developer — explicit developer info
const developerInfo = asyncHandler(async (req, res) => {
  return success(res, DEVELOPER);
});

module.exports = { chat, info, developerInfo, answerFor, DEVELOPER, CLINIC };
