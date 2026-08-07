/* Serene Dental — demo fallback data + resilient data loader.
   The site tries the live API first; if the backend/db is unavailable it
   falls back to this embedded demo content so the UI always renders. */
window.SD = window.SD || {};
(function (SD) {
  const img = (n) => `/images/${n}`;

  SD.DEMO = {
    stats: {
      yearsExperience: 25, patientsServed: 50000, satisfactionRate: 98,
      specialists: 15, totalReviews: 500, services: 9, patients: 0,
    },
    services: [
      { id: "s1", name: "General Dentistry", slug: "general-dentistry", shortDescription: "Comprehensive check-ups, cleanings, and preventive care.", description: "From routine check-ups and professional cleanings to detailed examinations, our general dentistry keeps your whole family's oral health on track.", price: 120, duration: 30, category: "GENERAL", icon: "stethoscope", department: { name: "General Dentistry" }, isFeatured: true, image: img("service-general.jpg") },
      { id: "s2", name: "Cosmetic Dentistry", slug: "cosmetic-dentistry", shortDescription: "Veneers, bonding, and smile makeovers.", description: "Transform your smile with veneers, tooth bonding, and complete smile makeovers tailored to your facial features.", price: 450, duration: 60, category: "COSMETIC", icon: "sparkles", department: { name: "Cosmetic Dentistry" }, isFeatured: true, image: img("service-cosmetic.jpg") },
      { id: "s3", name: "Orthodontics", slug: "orthodontics", shortDescription: "Braces and clear aligners for a straighter smile.", description: "Traditional braces and clear aligners (Invisalign) to correct alignment and bite issues at any age.", price: 300, duration: 45, category: "ORTHODONTICS", icon: "align-center", department: { name: "Orthodontics" }, isFeatured: true, image: img("service-ortho.jpg") },
      { id: "s4", name: "Dental Implants", slug: "dental-implants", shortDescription: "Permanent, natural-looking tooth replacement.", description: "Restore missing teeth with titanium implants that look, feel, and function like natural teeth.", price: 1500, duration: 90, category: "SURGERY", icon: "anchor", department: { name: "Oral Surgery" }, isFeatured: true, image: img("service-implant.jpg") },
      { id: "s5", name: "Teeth Whitening", slug: "teeth-whitening", shortDescription: "Brighten your smile in a single visit.", description: "Professional in-office whitening that lifts years of stains in about an hour.", price: 350, duration: 60, category: "COSMETIC", icon: "sun", department: { name: "Cosmetic Dentistry" }, isFeatured: true, image: img("service-whitening.jpg") },
      { id: "s6", name: "Pediatric Dentistry", slug: "pediatric-dentistry", shortDescription: "Gentle, fun dental care for children.", description: "A friendly, fear-free environment that helps kids build healthy habits for life.", price: 90, duration: 30, category: "PEDIATRIC", icon: "baby", department: { name: "Pediatric Dentistry" }, isFeatured: true, image: img("service-pediatric.jpg") },
      { id: "s7", name: "Emergency Care", slug: "emergency-care", shortDescription: "Same-day relief for dental emergencies.", description: "Toothaches, broken teeth, and urgent dental issues handled fast — 24/7.", price: 200, duration: 30, category: "EMERGENCY", icon: "siren", department: { name: "General Dentistry" }, isFeatured: true, image: img("service-emergency.jpg") },
      { id: "s8", name: "Root Canal Therapy", slug: "root-canal-therapy", shortDescription: "Save damaged teeth with modern, gentle endodontics.", description: "Comfortable root canal treatment using rotary technology to relieve pain and preserve your natural tooth.", price: 700, duration: 90, category: "RESTORATIVE", icon: "activity", department: { name: "Endodontics" }, isFeatured: false, image: img("service-rootcanal.jpg") },
      { id: "s9", name: "Periodontal Treatment", slug: "periodontal-treatment", shortDescription: "Expert care for healthy gums.", description: "Scaling, root planing, and gum therapy to treat and prevent periodontal disease.", price: 250, duration: 60, category: "PREVENTIVE", icon: "shield", department: { name: "Periodontics" }, isFeatured: false, image: img("service-periodontal.jpg") },
    ],
    doctors: [
      { id: "d1", name: "Dr. Emily Carter", specialization: "General Dentistry", experience: 12, department: "General Dentistry", avatar: img("doc-1.jpg"), consultationFee: 150, bio: "Dr. Carter leads our general dentistry practice with a gentle, patient-first approach.", averageRating: 4.9, totalReviews: 120, languages: ["English", "Spanish"] },
      { id: "d2", name: "Dr. James Reyes", specialization: "Orthodontics", experience: 10, department: "Orthodontics", avatar: img("doc-2.jpg"), consultationFee: 180, bio: "Board-certified orthodontist specializing in clear aligner therapy for teens and adults.", averageRating: 4.8, totalReviews: 96, languages: ["English"] },
      { id: "d3", name: "Dr. Sarah Okafor", specialization: "Cosmetic Dentistry", experience: 9, department: "Cosmetic Dentistry", avatar: img("doc-3.jpg"), consultationFee: 200, bio: "Award-winning cosmetic dentist crafting natural-looking smile makeovers.", averageRating: 4.9, totalReviews: 140, languages: ["English", "French"] },
      { id: "d4", name: "Dr. Michael Tanaka", specialization: "Oral Surgery", experience: 15, department: "Oral Surgery", avatar: img("doc-4.jpg"), consultationFee: 250, bio: "Experienced oral surgeon focused on comfortable implant placement and extractions.", averageRating: 5.0, totalReviews: 88, languages: ["English", "Japanese"] },
    ],
    testimonials: [
      { id: "t1", patientName: "Sarah Mitchell", content: "The entire team made me feel at ease from the moment I walked in. My smile has never looked better!", rating: 5, isFeatured: true },
      { id: "t2", patientName: "David Chen", content: "I used to dread the dentist. Serene Dental completely changed that — every visit is calm and painless.", rating: 5, isFeatured: true },
      { id: "t3", patientName: "Amanda Rodriguez", content: "The clear aligners process was smooth and the results are incredible. Highly recommend the orthodontics team!", rating: 5, isFeatured: true },
      { id: "t4", patientName: "John Miller", content: "Emergency toothache at 8pm — they saw me right away and fixed me up. True lifesavers.", rating: 5 },
      { id: "t5", patientName: "Priya Patel", content: "Beautiful clinic, friendly staff, and transparent pricing. Exactly what you want in a dental office.", rating: 4 },
      { id: "t6", patientName: "Robert Thompson", content: "My kids actually look forward to their dental visits now. That says everything.", rating: 5 },
    ],
    faqs: [
      { id: "f1", question: "How often should I visit the dentist?", answer: "For most patients, every six months is recommended for a check-up and professional cleaning.", category: "FIRST_VISIT" },
      { id: "f2", question: "Do you accept dental insurance?", answer: "Yes, we work with most major insurance providers and our front desk will help verify your benefits.", category: "INSURANCE" },
      { id: "f3", question: "What should I do in a dental emergency?", answer: "Call us immediately. We keep same-day emergency slots open and provide 24/7 support.", category: "EMERGENCY" },
      { id: "f4", question: "Are the treatments painful?", answer: "We use modern anesthesia and gentle techniques so most treatments are virtually pain-free.", category: "TREATMENTS" },
      { id: "f5", question: "How much does a first visit cost?", answer: "New patients enjoy a free consultation plus 20% off their first treatment.", category: "BILLING" },
      { id: "f6", question: "How do I book an appointment?", answer: "You can book online through this website, call us, or visit the clinic in person.", category: "APPOINTMENTS" },
      { id: "f7", question: "Do you treat children?", answer: "Absolutely. Our pediatric dentistry team creates a fun, fear-free environment for kids.", category: "GENERAL" },
    ],
    gallery: [
      { id: "g1", title: "Our Reception Area", description: "A calm, spa-like welcome space.", category: "CLINIC", image: img("gallery-reception.jpg") },
      { id: "g2", title: "Modern Treatment Suite", description: "Digital dentistry in comfort.", category: "CLINIC", image: img("gallery-treatment.jpg") },
      { id: "g3", title: "Imaging Technology", description: "3D digital imaging for precise care.", category: "TECHNOLOGY", image: img("gallery-tech.jpg") },
      { id: "g4", title: "Smile Makeover Result", description: "A happy patient after cosmetic care.", category: "BEFORE_AFTER", image: img("gallery-smile.jpg") },
      { id: "g5", title: "Our Care Team", description: "Friendly experts who put you first.", category: "TEAM", image: img("gallery-team.jpg") },
      { id: "g6", title: "Relaxed Dental Care", description: "Gentle treatments, stress-free visits.", category: "TREATMENTS", image: img("gallery-care.jpg") },
    ],
    blog: [
      { id: "b1", title: "10 Everyday Habits That Keep Your Teeth Healthy", slug: "10-everyday-habits-healthy-teeth", excerpt: "Simple, science-backed habits that protect your smile between visits.", content: "<p>Great oral health starts at home. Here are ten simple habits that keep your teeth and gums in top shape between dental visits.</p><p>Brush twice a day with fluoride toothpaste, floss daily, stay hydrated, limit sugary snacks, and don't skip your six-month check-ups.</p>", readingTime: 4, publishedAt: null, category: { name: "Dental Care" }, author: { name: "Serene Dental" }, featuredImage: img("blog-1.jpg") },
      { id: "b2", title: "What to Expect During Your First Dental Visit", slug: "first-dental-visit-expectations", excerpt: "A walkthrough of your first appointment at Serene Dental — from check-in to check-up.", content: "<p>Your first visit is all about understanding your oral health and getting comfortable. Here's what to expect: a warm welcome, digital imaging, a gentle exam, and a personalized care plan.</p>", readingTime: 3, publishedAt: null, category: { name: "Dental Care" }, author: { name: "Serene Dental" }, featuredImage: img("blog-2.jpg") },
      { id: "b3", title: "Invisalign vs. Traditional Braces: Which Is Right for You?", slug: "invisalign-vs-braces", excerpt: "We break down the differences to help you choose the best orthodontic treatment.", content: "<p>Both Invisalign and traditional braces straighten teeth effectively, but they suit different lifestyles and cases. Learn the trade-offs and talk to our orthodontists about which fits you.</p>", readingTime: 5, publishedAt: null, category: { name: "Dental Care" }, author: { name: "Serene Dental" }, featuredImage: img("blog-3.jpg") },
    ],
  };

  // ── Resilient loader: prefer API, fall back to demo data ─────────────────
  SD.data = {
    get: (name) =>
      SD.api[name]()
        .then((r) => (r.ok ? r.data : SD.DEMO[name]))
        .catch(() => SD.DEMO[name]),
  };
})(window.SD);
