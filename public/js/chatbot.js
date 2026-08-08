/* Junaid Dental Care — Intelligent Chatbot
   Knows website A to Z | Developed by Sardar Haseeb | sardarghaseeb777@gmail.com | 03369778543 */
window.SD = window.SD || {};
(function(SD){
  "use strict";

  SD.DEVELOPER = {
    name: "Sardar Haseeb",
    email: "sardarghaseeb777@gmail.com",
    phone: "03369778543",
    phoneDisplay: "0336 9778543",
    phoneIntl: "+92 336 9778543",
    whatsapp: "923369778543"
  };

  // Full knowledge base — mirrors live site content
  SD.CHAT_KB = {
    clinic: {
      name: "Junaid Dental Care",
      shortName: "JDC",
      tagline: "Premium Dental Care with a Personal Touch",
      founded: 2006,
      experienceText: "16+ years (since 2006)",
      rating: "4.6/5 on Google — 487+ reviews",
      address: "Main Lehtrar Road, Alipur U turn, near Old Bank Stop, Ali Pur, Islamabad 45600, Pakistan",
      fullAddress: "JDC – Junaid Dental Care, Main Lehtrar Road, Alipur U turn, Near Old Bank Stop, Ali Pur, Islamabad, Pakistan 45600",
      phones: ["+92 312 5028812", "+92 314 8290684"],
      whatsapp: "+92 312 5028812 (WhatsApp: https://wa.me/923125028812)",
      email: "junaiddental22@gmail.com",
      website: "https://junaiddentalcare.pk",
      maps: "https://maps.app.goo.gl/J9DzSYyFtrsJFhTr6",
      mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.9!2d73.1827848!3d33.6455004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfe92f3623e127%3A0xd712574943e7b21!2sJunaid%20Dental%20care!5e0!3m2!1sen!2s!4v1730000000000",
      coords: "33.6455004, 73.1827848",
      hours: {
        monSat: "Monday – Saturday: 8:00 AM – 9:00 PM",
        sat: "Saturday: 9:00 AM – 6:00 PM (same hours)",
        sun: "Sunday: Closed (Emergency Only — call +92 312 5028812)"
      },
      socials: {
        facebook: "https://www.facebook.com/profile.php?id=100083737489911",
        instagram: "https://instagram.com/junaiddentalcare",
        youtube: "https://youtube.com/@junaiddentalcare",
        tiktok: "https://tiktok.com/@junaiddentalcare"
      }
    },
    stats: {
      years: 16,
      patients: "12,000+",
      specialists: 6,
      satisfaction: "98%",
      reviews: 487
    },
    services: [
      { id:"general-dentistry", name:"General Dentistry", price:"PKR 1,500", priceNum:1500, dur:"30 min", desc:"Comprehensive check-ups, professional cleanings, and preventive care for the whole family. Your first consultation is PKR 1,500 and includes full oral exam.", href:"/services/general-dentistry", keywords:["general","cleaning","checkup","check-up","preventive","family"] },
      { id:"cosmetic-dentistry", name:"Cosmetic Dentistry", price:"from PKR 8,500", priceNum:8500, dur:"60 min", desc:"Veneers, bonding, and complete smile makeovers tailored to your facial features — natural-looking results that last for years.", href:"/services/cosmetic-dentistry", keywords:["cosmetic","veneer","bonding","smile makeover","aesthetic"] },
      { id:"orthodontics", name:"Orthodontics & Braces", price:"from PKR 45,000", priceNum:45000, dur:"45 min", desc:"Traditional metal braces, ceramic braces, and clear aligners for teenagers & adults. Free orthodontic consultation included.", href:"/services/orthodontics", keywords:["braces","ortho","aligner","invisalign","straighten","orthodontic"] },
      { id:"dental-implants", name:"Dental Implants", price:"from PKR 85,000", priceNum:85000, dur:"90 min", desc:"Premium titanium implants that look, feel & function like natural teeth. Guided surgery for precise, comfortable placement.", href:"/services/dental-implants", keywords:["implant","missing tooth","titanium","surgery"] },
      { id:"teeth-whitening", name:"Teeth Whitening", price:"PKR 6,500", priceNum:6500, dur:"60 min", desc:"Professional in-office whitening that lifts years of stains safely in about an hour. Take-home kits also available.", href:"/services/teeth-whitening", keywords:["whitening","bleaching","white teeth","stain"] },
      { id:"pediatric-dentistry", name:"Pediatric Dentistry", price:"PKR 1,200", priceNum:1200, dur:"30 min", desc:"Gentle, fun, fear-free dental care for children — building healthy habits for life.", href:"/services/pediatric-dentistry", keywords:["pediatric","child","kids","children","baby teeth"] },
      { id:"emergency-care", name:"Emergency Care", price:"PKR 2,500", priceNum:2500, dur:"30 min", desc:"Same-day relief for toothaches, broken/knocked-out teeth, swelling & trauma. Emergency slots kept open daily — call +92 312 5028812.", href:"/services/emergency-care", keywords:["emergency","pain","toothache","broken","knocked","urgent","same day"] },
      { id:"root-canal-therapy", name:"Root Canal Therapy", price:"PKR 12,000", priceNum:12000, dur:"90 min", desc:"Comfortable root canal using rotary endodontics to relieve pain and save your natural tooth — usually completed in a single visit.", href:"/services/root-canal-therapy", keywords:["root canal","rct","endodontic","nerve"] },
      { id:"periodontal-treatment", name:"Periodontal Treatment", price:"PKR 4,500", priceNum:4500, dur:"60 min", desc:"Scaling, root planing and gum therapy to treat & prevent gum disease. Healthy gums = beautiful smile.", href:"/services/periodontal-treatment", keywords:["gum","periodontal","scaling","bleeding gums","gum disease"] },
      { id:"wisdom-tooth-extraction", name:"Wisdom Tooth Extraction", price:"PKR 8,000", priceNum:8000, dur:"60 min", desc:"Safe, gentle surgical removal of impacted wisdom teeth with modern sedation. Minimal discomfort, fast recovery.", href:"/services/wisdom-tooth-extraction", keywords:["wisdom","extraction","remove tooth","impacted"] },
      { id:"dental-crowns-bridges", name:"Dental Crowns & Bridges", price:"PKR 15,000", priceNum:15000, dur:"60 min", desc:"Premium zirconia & porcelain crowns and bridges — hand-crafted for perfect fit and natural appearance.", href:"/services/dental-crowns-bridges", keywords:["crown","bridge","zirconia","pfm","cap"] },
      { id:"dental-fillings", name:"Dental Fillings", price:"PKR 2,000", priceNum:2000, dur:"30 min", desc:"Tooth-colored composite fillings that match your shade perfectly. Stop decay in a single visit.", href:"/services/dental-fillings", keywords:["filling","cavity","composite","decay"] }
    ],
    doctors: [
      { name:"Dr. Junaid Ahmed", role:"Principal Dentist & Implantologist", exp:"12 years", fee:"PKR 2,000", lang:"Urdu, English, Punjabi", bio:"Founder & principal dentist — specializes in dental implants and full-mouth rehabilitation.", href:"/doctors", avatar:"/images/doc-1.jpg" },
      { name:"Dr. Ayesha Khan", role:"Cosmetic & Restorative Dentist", exp:"8 years", fee:"PKR 1,800", lang:"Urdu, English", bio:"Artistic eye for smile makeovers, veneers & natural-looking restorations.", href:"/doctors", avatar:"/images/doc-2.jpg" },
      { name:"Dr. Hassan Raza", role:"Orthodontist", exp:"9 years", fee:"PKR 2,000", lang:"Urdu, English, Punjabi", bio:"Specialist in metal, ceramic braces & clear aligners for all ages.", href:"/doctors", avatar:"/images/doc-3.svg" },
      { name:"Dr. Sana Malik", role:"Pediatric Dentist", exp:"6 years", fee:"PKR 1,500", lang:"Urdu, English", bio:"Loved by children & parents — warm, fun atmosphere for kids.", href:"/doctors", avatar:"/images/doc-4.svg" },
      { name:"Dr. Bilal Sheikh", role:"Oral Surgeon", exp:"10 years", fee:"PKR 2,500", lang:"Urdu, English", bio:"Complex extractions, wisdom tooth surgery & implant placement.", href:"/doctors", avatar:"/images/doc-1.jpg" },
      { name:"Dr. Maria Aslam", role:"Endodontist", exp:"7 years", fee:"PKR 2,000", lang:"Urdu, English", bio:"Root canal therapy & microsurgery using rotary technology — virtually painless.", href:"/doctors", avatar:"/images/doc-2.jpg" }
    ],
    pages: [
      { label:"Home", href:"/", desc:"Hero, services overview, doctors, gallery, testimonials" },
      { label:"About Us", href:"/about", desc:"Our story since 2006, mission, why choose us, location map" },
      { label:"Our Team", href:"/team", desc:"Meet all specialists" },
      { label:"Technology", href:"/technology", desc:"Digital X-rays, 3D imaging, laser, rotary endodontics" },
      { label:"Patient Journey", href:"/patient-journey", desc:"Step-by-step visit guide: booking → consultation → treatment → follow-up" },
      { label:"Services", href:"/services", desc:"All 12 treatments with prices & durations" },
      { label:"Doctors", href:"/doctors", desc:"6 specialist dentists and booking" },
      { label:"Gallery", href:"/gallery", desc:"Clinic photos, treatment rooms, team & technology" },
      { label:"Before & After", href:"/smile-transformation", desc:"Real smile transformation cases" },
      { label:"Testimonials", href:"/testimonials", desc:"Patient reviews & video stories — 4.6/5 from 487+ reviews" },
      { label:"Blog", href:"/blog", desc:"Dental tips, news & guides" },
      { label:"Contact", href:"/contact", desc:"Phone, WhatsApp, email, address, map & contact form" },
      { label:"Book Appointment", href:"/book-appointment", desc:"Online booking: choose doctor, service, date & time — confirmation within 1 hour" },
      { label:"Emergency", href:"/emergency", desc:"Urgent care guide — what to do for toothache, broken tooth, knocked-out tooth" },
      { label:"Pricing", href:"/pricing", desc:"Transparent fee list & instalment plans" },
      { label:"Insurance", href:"/insurance", desc:"Accepted insurance & help with claims" },
      { label:"FAQ", href:"/faq", desc:"10+ frequently asked questions and answers" },
      { label:"Privacy Policy", href:"/privacy", desc:"How we protect your data" },
      { label:"Terms", href:"/terms", desc:"Terms of service" },
      { label:"Careers", href:"/careers", desc:"Join Junaid Dental Care team" }
    ],
    faqs: [
      { q:"How often should I visit the dentist?", a:"Every 6 months for a check-up & professional cleaning — even if nothing hurts. It catches problems early and is cheaper than fixing them later." },
      { q:"Do you offer payment plans?", a:"Yes — flexible instalment plans for implants, braces & smile makeovers. Ask at reception or call +92 312 5028812 for details." },
      { q:"What should I do in a dental emergency?", a:"Call immediately at +92 312 5028812 or WhatsApp. We keep same-day emergency slots open for toothache, broken/knocked-out teeth & swelling." },
      { q:"Are treatments painful?", a:"We use modern local anesthesia & gentle techniques — most treatments are virtually painless. Sedation options available for anxious patients." },
      { q:"How much is the first consultation?", a:"PKR 1,500 — includes full oral exam. Free orthodontic consultation for braces/aligners." }
    ]
  };

  // ── Helper: format service list ────────────────────────────────────────
  function serviceListHtml() {
    return SD.CHAT_KB.services.map(function(s){
      return '<li><strong><a href="'+s.href+'" style="color:var(--cb-primary);text-decoration:none">'+s.name+'</a></strong> — '+s.price+' • '+s.dur+'<br><span style="color:#64748b;font-size:12px">'+s.desc.substring(0,92)+'...</span></li>';
    }).join("");
  }

  // ── Core answer engine ──────────────────────────────────────────────────
  function getAnswer(raw) {
    var q = (raw || "").toString().trim().toLowerCase();
    if (!q) return null;
    var qOrig = raw.trim();
    var clinic = SD.CHAT_KB.clinic;
    var dev = SD.DEVELOPER;

    // Developer / who made you — highest priority (user explicitly requested)
    if (/(who (made|built|developed|created|designed)|developer|made this (website|site|app|chatbot|system)|who is sardar|about sardar|credit|developed by)/i.test(qOrig)) {
      return {
        text: 'This website and chatbot were <strong>developed by '+dev.name+'</strong> — a professional web developer. <br><br>📧 Email: <a href="mailto:'+dev.email+'">'+dev.email+'</a><br>📞 Phone: <a href="tel:'+dev.phoneIntl+'">'+dev.phoneDisplay+' ('+dev.phone+')</a> — also on WhatsApp<br><br>I am the AI assistant for <strong>Junaid Dental Care</strong>, trained on the entire website (services, doctors, pricing, FAQs, contact, gallery & more) to help you instantly. Need to contact the developer for a similar project? Just email or WhatsApp him!',
        links: [
          { label: '📧 Email Sardar Haseeb', href: 'mailto:'+dev.email },
          { label: '💬 WhatsApp Developer', href: 'https://wa.me/'+dev.whatsapp },
          { label: '🦷 Visit Junaid Dental Care', href: '/' }
        ]
      };
    }
    if (/(sardar haseeb|sardarghaseeb|0336)/i.test(qOrig)) {
      // catches direct mention of name/phone/email
      if (q.indexOf("sardar")>-1 || q.indexOf("sardarghaseeb")>-1 || q.indexOf("0336")>-1) {
        return {
          text: '<strong>'+dev.name+'</strong> is the developer of this website & chatbot.<br>📧 <a href="mailto:'+dev.email+'">'+dev.email+'</a><br>📞 <a href="tel:'+dev.phoneIntl+'">'+dev.phoneDisplay+'</a> (03369778543)<br><br>He built the entire Junaid Dental Care platform — design, frontend, backend, database & this AI assistant that knows the site A to Z.',
          links: [
            { label: '📧 Email Developer', href: 'mailto:'+dev.email },
            { label: '📞 Call Developer', href: 'tel:'+dev.phoneIntl }
          ]
        };
      }
    }

    // Greetings
    if (/^(hi|hello|hey|salam|assalam|aoa|good morning|good afternoon|good evening|howdy)[!.\s]*$/i.test(qOrig.trim()) || q === "hi" || q === "hello" || q.startsWith("hello ") || q.startsWith("hi ")) {
      return {
        text: 'Hello! 👋 I’m your <strong>Junaid Dental Care</strong> assistant — I know this website A to Z. <br><br>I can help with:<ul><li>🦷 All 12 services & prices</li><li>👨‍⚕️ 6 specialist doctors</li><li>📍 Address, map & directions</li><li>⏰ Timings & emergency care</li><li>📅 Booking an appointment</li><li>💳 Pricing & instalments</li></ul>What would you like to know?',
        chips: ["🦷 Our services", "👨‍⚕️ Doctors", "📍 Location & timings", "📅 Book appointment", "👨‍💻 Who developed this?"]
      };
    }

    // Thanks / bye
    if (/(thank|thanks|shukria|jazakallah)/i.test(q)) {
      return { text: 'You’re most welcome! 😊 Anything else about Junaid Dental Care? I’m here 24/7.<br><br><em>Developed with ❤️ by <strong>Sardar Haseeb</strong> — <a href="mailto:'+dev.email+'">'+dev.email+'</a></em>', chips: ["📞 Contact us", "📅 Book appointment"] };
    }
    if (/(bye|goodbye|allah hafiz|khuda hafiz|see you)/i.test(q)) {
      return { text: 'Allah Hafiz! Take care of your smile 😁🦷<br>We’re at Main Lehtrar Road, Ali Pur — open Mon–Sat 8AM–9PM. Call <a href="tel:+923125028812">+92 312 5028812</a> anytime.<br><br><em>Chatbot by <strong>Sardar Haseeb</strong></em>' };
    }

    // Contact / address / location
    if (/(contact|phone|call|number|mobile|whatsapp|email|mail|reach|get in touch)/i.test(q)) {
      // but not developer phone
      if (!/sardar|developer/i.test(q)) {
        return {
          text: '<strong>Contact Junaid Dental Care:</strong><br>📞 <a href="tel:+923125028812">+92 312 5028812</a> (primary & emergency)<br>📞 <a href="tel:+923148290684">+92 314 8290684</a> (secondary)<br>💬 WhatsApp: <a href="https://wa.me/923125028812" target="_blank">wa.me/923125028812</a><br>📧 <a href="mailto:junaiddental22@gmail.com">junaiddental22@gmail.com</a><br>📍 '+clinic.fullAddress+'<br>🗺️ <a href="'+clinic.maps+'" target="_blank">Open in Google Maps</a><br><br><em>Website & chatbot developed by <strong>Sardar Haseeb</strong> — <a href="mailto:'+dev.email+'">'+dev.email+'</a> | '+dev.phoneDisplay+'</em>',
          links: [
            { label: '📞 Call Now', href: 'tel:+923125028812' },
            { label: '💬 WhatsApp', href: 'https://wa.me/923125028812' },
            { label: '🗺️ Directions', href: clinic.maps },
            { label: '✉️ Contact Form', href: '/contact' }
          ]
        };
      }
    }
    if (/(where|location|address|directions|map|ali pur|lehtrar|old bank stop|coordinates|gps)/i.test(q)) {
      return {
        text: '<strong>We are here:</strong><br>📍 '+clinic.fullAddress+'<br>📌 Coordinates: '+clinic.coords+'<br>🗺️ <a href="'+clinic.maps+'" target="_blank">Open Google Maps</a><br><br>Landmark: Alipur U turn, near Old Bank Stop, Main Lehtrar Road, Ali Pur, Islamabad.<br>Easy to reach from Lehtrar Road & surrounding areas.',
        links: [
          { label: '🗺️ Get Directions', href: clinic.maps },
          { label: '📞 Call for directions', href: 'tel:+923125028812' },
          { label: '📍 View on Contact page', href: '/contact' }
        ]
      };
    }

    // Hours / timing
    if (/(time|timing|hours|open|closed|working|schedule|sunday|monday|friday|weekend|when.*open)/i.test(q)) {
      return {
        text: '<strong>Clinic Hours:</strong><br>'+clinic.hours.monSat+'<br>'+clinic.hours.sun+'<br><br>We keep <strong>same-day emergency slots</strong> open — for urgent pain call <a href="tel:+923125028812">+92 312 5028812</a> anytime. Emergency care is 24/7 on call.',
        links: [
          { label: '📅 Book Appointment', href: '/book-appointment' },
          { label: '🚨 Emergency Info', href: '/emergency' }
        ]
      };
    }

    // Emergency
    if (/(emergency|urgent|toothache|severe pain|swelling|bleeding|knocked|broken tooth|accident|trauma)/i.test(q)) {
      return {
        text: '🚨 <strong>Dental Emergency? We’re here to help — same-day appointments available!</strong><br><br>For toothache, broken/knocked-out tooth, swelling or bleeding:<br>• Call immediately: <a href="tel:+923125028812">+92 312 5028812</a><br>• WhatsApp: <a href="https://wa.me/923125028812" target="_blank">Message on WhatsApp</a><br>• Visit: Main Lehtrar Road, Alipur U turn, Ali Pur<br><br>Keep the tooth moist (milk/saliva) if knocked out & come within 30 minutes if possible. We prioritize emergencies even on Sundays.',
        links: [
          { label: '📞 Call Emergency', href: 'tel:+923125028812' },
          { label: '🚨 Emergency Page', href: '/emergency' },
          { label: '📍 Directions', href: clinic.maps }
        ]
      };
    }

    // Appointment / book
    if (/(appointment|book|reserve|schedule|slot|availability|consultation|visit)/i.test(q)) {
      return {
        text: '📅 <strong>Book your appointment in 1 minute:</strong><br>• Online: <a href="/book-appointment">/book-appointment</a> — choose doctor, service, date & time<br>• Call: <a href="tel:+923125028812">+92 312 5028812</a><br>• WhatsApp: <a href="https://wa.me/923125028812" target="_blank">wa.me/923125028812</a><br><br>Confirmation within 1 hour. First consultation is <strong>PKR 1,500</strong> (full oral exam). Free orthodontic consultation for braces/aligners.',
        links: [
          { label: '📅 Book Online Now', href: '/book-appointment' },
          { label: '👨‍⚕️ Choose Doctor', href: '/doctors' },
          { label: '💬 WhatsApp Booking', href: 'https://wa.me/923125028812' }
        ]
      };
    }

    // Doctors
    if (/(doctor|dentist|specialist|team|staff|dr\.|dr |junaid ahmed|ayesha|hassan|bilal|sana|maria)/i.test(q)) {
      var docList = SD.CHAT_KB.doctors.map(function(d){ return '<li><strong>'+d.name+'</strong> — '+d.role+' ('+d.exp+')<br><span style="font-size:12px;color:#64748b">Fee: '+d.fee+' • Speaks: '+d.lang+' • '+d.bio+'</span></li>'; }).join("");
      return {
        text: '<strong>Meet our 6 specialist dentists:</strong><br><ul>'+docList+'</ul>All registered with PMDC and leaders in their fields.',
        links: [
          { label: '👨‍⚕️ View All Doctors', href: '/doctors' },
          { label: '📅 Book with a Doctor', href: '/book-appointment' }
        ]
      };
    }

    // Specific service detection — try to match any service keywords
    for (var i=0;i<SD.CHAT_KB.services.length;i++){
      var svc = SD.CHAT_KB.services[i];
      var hit = false;
      for (var k=0;k<svc.keywords.length;k++){
        if (q.indexOf(svc.keywords[k])>-1) { hit=true; break; }
      }
      // also check name words
      if (!hit && svc.name.toLowerCase().split(/\s+/).some(function(w){ return w.length>3 && q.indexOf(w)>-1; })) hit = true;
      if (hit) {
        return {
          text: '<strong>'+svc.name+'</strong><br>'+svc.desc+'<br><br>💰 <strong>'+svc.price+'</strong> • ⏱ '+svc.dur+' • <a href="'+svc.href+'">View details & before/after</a>',
          links: [
            { label: '🦷 View '+svc.name, href: svc.href },
            { label: '📅 Book '+svc.name, href: '/book-appointment' },
            { label: '💰 See Pricing', href: '/pricing' }
          ]
        };
      }
    }

    // Services list
    if (/(services|treatment|treatments|what do you (do|offer)|offerings|procedures|all services|menu of services)/i.test(q)) {
      return {
        text: '<strong>We offer 12 treatments under one roof:</strong><ul>'+serviceListHtml()+'</ul>Transparent Pakistani pricing, modern technology & gentle care.',
        links: [
          { label: '🦷 View All Services', href: '/services' },
          { label: '💰 Pricing', href: '/pricing' },
          { label: '📅 Book Now', href: '/book-appointment' }
        ]
      };
    }

    // Pricing / cost
    if (/(price|pricing|cost|fee|charge|how much|kitna|pkr|rs\.|cheap|expensive|affordable|payment|installment|emi|finance)/i.test(q)) {
      var pricingText = SD.CHAT_KB.services.map(function(s){ return '<li><strong>'+s.name+'</strong>: '+s.price+'</li>'; }).join("");
      return {
        text: '<strong>Transparent pricing (PKR):</strong><ul>'+pricingText+'</ul>First consultation: <strong>PKR 1,500</strong> (includes full exam). Flexible <strong>instalment plans</strong> available for implants, braces & makeovers — ask at reception or call <a href="tel:+923125028812">+92 312 5028812</a>.',
        links: [
          { label: '💰 Full Pricing Page', href: '/pricing' },
          { label: '📅 Book Consultation', href: '/book-appointment' },
          { label: '🛡️ Insurance Info', href: '/insurance' }
        ]
      };
    }

    // Insurance
    if (/(insurance|cover|claim|panel|card|insurance)/i.test(q)) {
      return {
        text: '🛡️ <strong>Insurance & Payments:</strong><br>We accept major Pakistani insurers and help with claim paperwork. We also offer flexible instalment plans for implants, braces & smile makeovers. Bring your insurance card to your visit — our team will guide you.<br><br>Call <a href="tel:+923125028812">+92 312 5028812</a> to check if your insurer is on our panel.',
        links: [
          { label: '🛡️ Insurance Details', href: '/insurance' },
          { label: '💰 Pricing', href: '/pricing' },
          { label: '📞 Check Your Insurance', href: 'tel:+923125028812' }
        ]
      };
    }

    // Technology
    if (/(technology|tech|equipment|machine|digital|x-ray|3d|laser|modern|rotary)/i.test(q)) {
      return {
        text: '🔬 <strong>Modern Digital Technology:</strong><br>• Digital X-rays (low radiation)<br>• 3D imaging & guided implant surgery<br>• Rotary endodontics for painless root canals<br>• Laser dentistry & modern sterilization<br>• Intra-oral cameras so you see what we see<br><br>All to make treatment faster, safer & more comfortable.',
        links: [
          { label: '🔬 Our Technology', href: '/technology' },
          { label: '🏥 Clinic Gallery', href: '/gallery' }
        ]
      };
    }

    // Gallery / before after
    if (/(gallery|photos|images|clinic photos|before.*after|after.*before|transformation|smile gallery|tour)/i.test(q)) {
      return {
        text: '📸 <strong>Smile Gallery & Transformations:</strong><br>Browse real clinic photos, treatment rooms, technology & stunning before/after smile makeovers from our own patients.',
        links: [
          { label: '📸 Clinic Gallery', href: '/gallery' },
          { label: '✨ Before & After', href: '/smile-transformation' },
          { label: '🎥 Video Testimonials', href: '/testimonials#video' }
        ]
      };
    }

    // Testimonials / reviews / rating
    if (/(review|testimonial|feedback|rating|google review|4\.6|patients say|happy patients)/i.test(q)) {
      return {
        text: '⭐ <strong>Rated 4.6/5 on Google — 487+ reviews</strong><br>Patients love our gentle hands, transparent pricing & calm environment. Many say they actually look forward to visits — that’s the Junaid Dental Care difference!<br><br>Satisfaction rate: 98% • 12,000+ patients served.',
        links: [
          { label: '⭐ Read Reviews', href: '/testimonials' },
          { label: '📸 Smile Transformations', href: '/smile-transformation' }
        ]
      };
    }

    // Blog
    if (/(blog|article|post|news|tips|guide|read)/i.test(q)) {
      return {
        text: '📝 <strong>Dental Tips & Guides:</strong><br>Our dentists share practical advice on brushing, braces care, implants, whitening, child dental health & more on our Blog.',
        links: [
          { label: '📝 Visit Blog', href: '/blog' },
          { label: '❓ FAQ', href: '/faq' }
        ]
      };
    }

    // FAQ
    if (/(faq|frequently asked|questions|q&a)/i.test(q)) {
      var faqHtml = SD.CHAT_KB.faqs.map(function(f){ return '<li><strong>'+f.q+'</strong><br><span style="color:#64748b">'+f.a+'</span></li>'; }).join("");
      return {
        text: '<strong>Frequently Asked Questions:</strong><ul>'+faqHtml+'</ul>',
        links: [
          { label: '❓ Full FAQ Page', href: '/faq' },
          { label: '📞 Ask Us Directly', href: 'tel:+923125028812' }
        ]
      };
    }

    // About / history / founded
    if (/(about|who are you|history|story|since when|founded|2006|experience|ali pur|trusted)/i.test(q)) {
      return {
        text: '🦷 <strong>About Junaid Dental Care:</strong><br>Since <strong>2006</strong> (16+ years), we’ve been Ali Pur’s most trusted family dental clinic. 6 specialist dentists, modern digital equipment & a warm, calm environment — all at honest Pakistani prices.<br><br>12,000+ patients served • 98% satisfaction • 4.6★ on Google<br><br><em>Website & AI assistant crafted by <strong>Sardar Haseeb</strong> — <a href="mailto:'+dev.email+'">'+dev.email+'</a></em>',
        links: [
          { label: '🏥 About Us', href: '/about' },
          { label: '👨‍⚕️ Our Team', href: '/team' },
          { label: '🔬 Technology', href: '/technology' }
        ]
      };
    }

    // Website navigation / sitemap
    if (/(sitemap|all pages|website map|navigate|menu|what pages)/i.test(q)) {
      var pagesHtml = SD.CHAT_KB.pages.map(function(p){ return '<li><a href="'+p.href+'" style="color:var(--cb-primary);font-weight:700;text-decoration:none">'+p.label+'</a> — <span style="color:#64748b">'+p.desc+'</span></li>'; }).join("");
      return {
        text: '<strong>Explore our website:</strong><ul>'+pagesHtml+'</ul>',
        links: [
          { label: '🗺️ Sitemap', href: '/sitemap' },
          { label: '🏠 Home', href: '/' }
        ]
      };
    }

    // Careers
    if (/(career|job|hiring|vacancy|join)/i.test(q)) {
      return {
        text: '💼 <strong>Careers at Junaid Dental Care:</strong><br>We’re always looking for passionate dental professionals & support staff who share our commitment to gentle, modern care.',
        links: [
          { label: '💼 View Careers', href: '/careers' },
          { label: '📞 Contact HR', href: '/contact' }
        ]
      };
    }

    // Privacy / terms / cookies / refund
    if (/(privacy|terms|cookie|refund|policy)/i.test(q)) {
      return {
        text: '📄 <strong>Policies:</strong><br>We respect your privacy. Read our policies for details on data, cookies, terms & refunds.',
        links: [
          { label: '🔒 Privacy Policy', href: '/privacy' },
          { label: '📄 Terms of Service', href: '/terms' },
          { label: '🍪 Cookie Policy', href: '/cookies' },
          { label: '↩️ Refund Policy', href: '/refund-policy' }
        ]
      };
    }

    // Patient journey
    if (/(patient journey|what.*expect|visit.*like|first visit|next steps)/i.test(q)) {
      return {
        text: '<strong>Your Patient Journey:</strong><br>1️⃣ Book online or call<br>2️⃣ Consultation & digital X-ray<br>3️⃣ Personalized treatment plan & transparent quote<br>4️⃣ Gentle treatment with modern tech<br>5️⃣ Follow-up & care tips<br>We guide you at every step.',
        links: [
          { label: '🗺️ Patient Journey', href: '/patient-journey' },
          { label: '📅 Book Now', href: '/book-appointment' }
        ]
      };
    }

    // Fallback — helpful search
    return {
      text: 'I’m not sure about that specific question, but I know the whole Junaid Dental Care website! Try asking me about:<br><ul><li>🦷 Services & prices (e.g., "implants cost", "braces")</li><li>👨‍⚕️ Doctors</li><li>📍 Address, directions, hours</li><li>📅 Booking an appointment</li><li>🚨 Emergency help</li><li>💳 Pricing & instalments</li></ul>You can also use the search or visit the <a href="/contact">Contact page</a> — or call <a href="tel:+923125028812">+92 312 5028812</a> for immediate help.<br><br><em>I was developed by <strong>Sardar Haseeb</strong> — <a href="mailto:'+dev.email+'">'+dev.email+'</a> | '+dev.phoneDisplay+'</em>',
      chips: ["🦷 Services", "📍 Location", "📞 Contact", "📅 Book appointment"],
      links: [
        { label: '🔍 Search Services', href: '/services' },
        { label: '❓ FAQ', href: '/faq' },
        { label: '📞 Call Clinic', href: 'tel:+923125028812' }
      ]
    };
  }

  SD.Chatbot = { getAnswer: getAnswer };

  // ── UI ──────────────────────────────────────────────────────────────────
  function el(html){
    var d=document.createElement('div'); d.innerHTML=html.trim(); return d.firstChild;
  }

  function timeNow(){
    return new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true});
  }

  function logoDataUrlForHeader(){
    // Use icon-only logo (perfect for circular header) -> fallback to full logo -> tooth SVG
    return '<span class="cb-logo-inner" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%"><img src="/images/logo-icon.png" alt="JDC" onerror="if(!this.dataset.f1){this.dataset.f1=1;this.src=\'/images/logo.png\';}else{this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'}" style="width:100%;height:100%;object-fit:cover"><span style="display:none;align-items:center;justify-content:center;width:100%;height:100%;background: var(--cb-primary);color:#fff"><svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3.25c-4.84 0-8.75 3.72-8.75 8.32 0 2.52.85 4.43 1.92 6.13.63 1 1.03 2.12 1.2 3.3l.37 2.65c.38 2.74 2.61 5.1 5.26 5.1 1.15 0 1.77-.63 2.26-1.62l1.17-2.38c.23-.47.9-.47 1.13 0l1.17 2.38c.49.99 1.11 1.62 2.26 1.62 2.65 0 4.88-2.36 5.26-5.1l.37-2.65c.17-1.18.57-2.3 1.2-3.3 1.07-1.7 1.92-3.61 1.92-6.13 0-4.6-3.91-8.32-8.75-8.32-1.64 0-3.15.44-4.44 1.22A8.55 8.55 0 0 0 16 3.25Z" fill="currentColor" stroke="none" opacity="0.95"/><path d="M12 10.5c1.2-1.1 2.7-1.6 4.4-1.6M20.5 13.2c.7.5 1.5.8 2.4.8" stroke="white" stroke-width="1.8" stroke-linecap="round" opacity="0.85"/></svg></span></span>';
  }

  function initChatbot(){
    if (document.getElementById('jdc-chatbot')) return;

    // inject CSS if not already present
    if (!document.querySelector('link[href*="chatbot.css"]')){
      var l=document.createElement('link'); l.rel='stylesheet'; l.href='/css/chatbot.css'; (document.head || document.getElementsByTagName('head')[0] || document.body).appendChild(l);
    }

    var root=document.createElement('div');
    root.id='jdc-chatbot';
    root.innerHTML =
      '<button class="cb-launcher" aria-label="Open chat" id="cbLauncher">'+
        '<img src="/images/logo-icon.png" alt="Chat" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'" style="display:block;width:100%;height:100%;object-fit:cover;border-radius:50%">'+
        '<svg style="display:none" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M8 10h8"/><path d="M8 14h5"/></svg>'+
        '<span class="cb-dot" aria-hidden="true"></span>'+
        '<span class="cb-badge" id="cbBadge" style="display:none">1</span>'+
      '</button>'+
      '<div class="cb-window" role="dialog" aria-label="Junaid Dental Care Assistant" aria-modal="false">'+
        '<div class="cb-header">'+
          '<div class="cb-logo">'+logoDataUrlForHeader()+'</div>'+
          '<div class="cb-title"><h3>Junaid Dental Care</h3><p><span class="live"></span> AI Assistant • Online • by Sardar Haseeb</p></div>'+
          '<div class="cb-actions">'+
            '<button class="cb-btn" id="cbMin" aria-label="Minimize" title="Minimize"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 12h12"/></svg></button>'+
            '<button class="cb-btn" id="cbClose" aria-label="Close" title="Close"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>'+
          '</div>'+
        '</div>'+
        '<div class="cb-messages" id="cbMessages"></div>'+
        '<div class="cb-chips" id="cbChips"></div>'+
        '<form class="cb-inputbar" id="cbForm">'+
          '<div class="cb-inputwrap"><input id="cbInput" type="text" placeholder="Ask about services, doctors, prices..." autocomplete="off" aria-label="Type your message"><button type="submit" class="cb-send" aria-label="Send" id="cbSend"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9 22 2Z"/></svg></button></div>'+
        '</form>'+
        '<div class="cb-foot">Powered by <a href="mailto:'+SD.DEVELOPER.email+'">'+SD.DEVELOPER.name+'</a> • <a href="mailto:'+SD.DEVELOPER.email+'">'+SD.DEVELOPER.email+'</a> • '+SD.DEVELOPER.phoneDisplay+'</div>'+
      '</div>';

    document.body.appendChild(root);

    var launcher=root.querySelector('#cbLauncher');
    var win=root.querySelector('.cb-window');
    var msgs=root.querySelector('#cbMessages');
    var chipsEl=root.querySelector('#cbChips');
    var form=root.querySelector('#cbForm');
    var input=root.querySelector('#cbInput');
    var badge=root.querySelector('#cbBadge');

    var isOpen=false;
    var hasWelcomed=false;
    var unread=0;

    function setOpen(open){
      isOpen=open;
      root.classList.toggle('cb-open', open);
      if (launcher) launcher.setAttribute('aria-label', open? 'Close chat':'Open chat');
      if (open){
        unread=0; if (badge) badge.style.display='none';
        if(!hasWelcomed){
          hasWelcomed=true;
          setTimeout(function(){ addBotWelcome(); }, 300);
        }
        setTimeout(function(){ if (input) input.focus(); }, 350);
      }
    }

    if (launcher) launcher.addEventListener('click', function(){ setOpen(!isOpen); });
    var closeBtn = root.querySelector('#cbClose');
    var minBtn = root.querySelector('#cbMin');
    if (closeBtn) closeBtn.addEventListener('click', function(){ setOpen(false); });
    if (minBtn) minBtn.addEventListener('click', function(){ setOpen(false); });

    // ESC to close
    document.addEventListener('keydown', function(e){ if(e.key==='Escape' && isOpen) setOpen(false); });

    function todayLabel(){
      return new Date().toLocaleDateString('en-US',{weekday:'long', year:'numeric', month:'long', day:'numeric'});
    }

    function scrollToBottom(){ msgs.scrollTop = msgs.scrollHeight; }

    function addBotWelcome(){
      var dateRow=el('<div class="cb-date">'+todayLabel()+'</div>'); msgs.appendChild(dateRow);
      var ans=getAnswer("hello"); // reuse greeting
      appendBot(ans, true);
      renderChips(ans.chips || ["🦷 Services & prices","👨‍⚕️ Doctors","📍 Location","📅 Book appointment"]);
    }

    function appendUser(text){
      var row=el('<div class="cb-msg user"><div class="cb-bubble"></div></div>');
      row.querySelector('.cb-bubble').textContent=text;
      var time=el('<div class="cb-time">'+timeNow()+'</div>');
      var wrap=document.createElement('div');
      wrap.style.display='flex'; wrap.style.flexDirection='column'; wrap.style.alignItems='flex-end'; wrap.style.maxWidth='88%'; wrap.style.alignSelf='flex-end';
      wrap.appendChild(row); wrap.appendChild(time);
      msgs.appendChild(wrap);
      scrollToBottom();
    }

    function appendBot(answer, isWelcome){
      var dev=SD.DEVELOPER;
      var bubbleHtml = '<div class="cb-bubble">'+answer.text;
      if (answer.links && answer.links.length){
        bubbleHtml += '<div class="cb-links">';
        answer.links.forEach(function(l){
          var isExternal = l.href.startsWith('http') || l.href.startsWith('mailto:') || l.href.startsWith('tel:');
          var cls = l.href.startsWith('tel:') || l.href.indexOf('book-appointment')>-1 ? 'cb-link' : 'cb-link sec';
          // make primary for main CTAs
          if (l.label.indexOf('Book')>-1 || l.label.indexOf('Call')>-1) cls='cb-link';
          bubbleHtml += '<a class="'+cls+'" href="'+l.href+'" '+(isExternal? 'target="_blank" rel="noopener"':'')+'>'+l.label+'</a>';
        });
        bubbleHtml += '</div>';
      }
      bubbleHtml += '<div class="cb-watermark">● Junaid Dental Care • Developed by <strong>'+dev.name+'</strong></div>';
      bubbleHtml += '</div>';

      var msg=el('<div class="cb-msg bot"><div class="cb-avatar bot"><svg viewBox="0 0 32 32" width="16" height="16" fill="none"><path d="M16 3.25c-4.84 0-8.75 3.72-8.75 8.32 0 2.52.85 4.43 1.92 6.13.63 1 1.03 2.12 1.2 3.3l.37 2.65c.38 2.74 2.61 5.1 5.26 5.1 1.15 0 1.77-.63 2.26-1.62l1.17-2.38c.23-.47.9-.47 1.13 0l1.17 2.38c.49.99 1.11 1.62 2.26 1.62 2.65 0 4.88-2.36 5.26-5.1l.37-2.65c.17-1.18.57-2.3 1.2-3.3 1.07-1.7 1.92-3.61 1.92-6.13 0-4.6-3.91-8.32-8.75-8.32Z" fill="currentColor"/></svg></div>'+bubbleHtml+'</div>');
      var time=el('<div class="cb-time" style="margin-left:36px">'+timeNow()+'</div>');
      msgs.appendChild(msg);
      msgs.appendChild(time);
      scrollToBottom();
      if (!isOpen){
        unread++; badge.textContent=unread>9? '9+': unread; badge.style.display='flex';
      }
      if (answer.chips && answer.chips.length) renderChips(answer.chips);
    }

    function showTyping(){
      var t=el('<div class="cb-msg bot" id="cbTyping"><div class="cb-avatar bot"><svg viewBox="0 0 32 32" width="16" height="16" fill="none"><path d="M16 3.25c-4.84 0-8.75 3.72-8.75 8.32 0 2.52.85 4.43 1.92 6.13.63 1 1.03 2.12 1.2 3.3l.37 2.65c.38 2.74 2.61 5.1 5.26 5.1 1.15 0 1.77-.63 2.26-1.62l1.17-2.38c.23-.47.9-.47 1.13 0l1.17 2.38c.49.99 1.11 1.62 2.26 1.62 2.65 0 4.88-2.36 5.26-5.1l.37-2.65c.17-1.18.57-2.3 1.2-3.3 1.07-1.7 1.92-3.61 1.92-6.13 0-4.6-3.91-8.32-8.75-8.32Z" fill="currentColor"/></svg></div><div class="cb-bubble"><div class="cb-typing"><span></span><span></span><span></span></div></div></div>');
      msgs.appendChild(t); scrollToBottom(); return t;
    }

    function renderChips(list){
      chipsEl.innerHTML='';
      (list||[]).forEach(function(c){
        var b=document.createElement('button');
        b.className='cb-chip'; b.type='button'; b.textContent=c;
        b.addEventListener('click', function(){
          handleSend(c.replace(/^[^\w]+/,''));
        });
        chipsEl.appendChild(b);
      });
      if (chipsEl.children.length) chipsEl.style.display='flex'; else chipsEl.style.display='none';
    }

    function handleSend(text){
      var t=(text||"").trim();
      if(!t) return;
      if(!isOpen) setOpen(true);
      appendUser(t);
      input.value='';
      renderChips([]);
      var typing=showTyping();
      var delay= 550 + Math.min(600, t.length*12);
      setTimeout(function(){
        typing.remove();
        var ans=getAnswer(t);
        appendBot(ans);
      }, delay);
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      handleSend(input.value);
    });

    // Allow clicking links inside chatbot without closing
    msgs.addEventListener('click', function(e){
      var a=e.target.closest('a.cb-link');
      if (a && a.getAttribute('href').startsWith('/')){
        // internal navigation — allow default but close chatbot on mobile?
        if (window.innerWidth<480) setOpen(false);
      }
    });

    // Expose for debugging
    SD.ChatbotUI = { open: function(){ setOpen(true); }, close: function(){ setOpen(false); }, send: handleSend };

    // Auto hint after 8s if not opened
    setTimeout(function(){
      if (!isOpen && !hasWelcomed){
        badge.textContent='1'; badge.style.display='flex';
      }
    }, 8000);
  }

  // Auto-init on DOM ready
  if (document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }

  // Also expose init for manual call from main.js
  SD.initChatbot = initChatbot;
})(window.SD);
