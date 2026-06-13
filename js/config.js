/* ============================================================
   DIAMOND SOLAR — SITE CONFIG
   Sirf YE file edit karni hai. Baaki kuch chhuna nahi.
   ============================================================ */
const SITE_CONFIG = {

  // ---- GOOGLE SHEET (sabse important) ----
  // Apni Google Sheet kholo, URL me se ID copy karo:
  // https://docs.google.com/spreadsheets/d/  <<YE WALA HISSA>>  /edit
  // Sheet ko Share -> "Anyone with the link" -> Viewer karna ZAROORI hai.
  SHEET_ID: "PASTE_YOUR_GOOGLE_SHEET_ID_HERE",

  // Sheet ke tab (neeche wale naam) — exactly yahi naam rakho tabs ke:
  TAB_PRODUCTS: "Products",
  TAB_PROJECTS: "Projects",        // videos + photos of installed projects
  TAB_PHOTOGROUPS: "PhotoGroups",  // project-wise grouped photo albums
  TAB_TESTIMONIALS: "Testimonials",
  TAB_NEWSLETTER: "Newsletter",
  TAB_SETTINGS: "Settings",       // calculator rates yahan se (optional)

  // ---- FIRM DETAILS ----
  FIRM_NAME: "Diamond Solar",
  PHONE: "+91 9310028202",
  WHATSAPP: "919310028202", // bina + ke, country code ke saath
  EMAIL: "diamondsolar551@gmail.com",
  ADDRESS: "Near Haryana Hotel, G.S. Road, Opposite Lunia Kothi, Bikaner, Rajasthan 334001",

  // ---- ORDER GOOGLE FORM (products ke liye, optional) ----
  ORDER_FORM_URL: "https://docs.google.com/forms/d/e/1FAIpQLSdXfhK9ityyPXgor6gS-O6DXfuTfYKhG9mTspjHuA0wiKUYRg/viewform",

  // ---- CALCULATOR SETTINGS ----
  TARIFF_PER_UNIT: 8.5,        // Rajasthan avg ₹/unit
  COST_PER_KW: 60000,          // installed cost ₹/kW (approx, edit anytime)
  UNITS_PER_KW_MONTH: 130      // Bikaner sunshine: ~130 units/kW/month
};
