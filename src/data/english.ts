import { getCar, type CarId } from "./site";

// English summaries of the Taiwan content in site.ts and content.ts.
// Prices, source URLs and review dates continue to come from the shared data.
export const englishCars: Record<CarId, {
  subtitle: string;
  description: string;
  highlights: string[];
  considerations: string[];
}> = {
  swift: {
    subtitle: "Compact hatchback",
    description: "A Japan-built compact car with a 1.2L mild-hybrid engine. Explore Taiwan pricing, everyday space and a test drive in Beitou, Taipei.",
    highlights: ["24.5 km/L official fuel economy", "Imported from Japan", "1,480 mm vehicle height"],
    considerations: [
      "SWIFT has a 265 L boot with the rear seats upright, expanding to 579 L when folded. For family trips with a stroller and luggage, compare S-CROSS's 430–440 L boot, depending on rear seatback angle.",
      "SWIFT measures 3,860 × 1,735 × 1,480 mm and weighs 945 kg unladen, with a 4.8 m turning radius. A 1,550 mm parking height limit leaves 70 mm above the body; mechanical bays also need matching length, width, load and wheel-track limits.",
      "To track your own fuel use, divide kilometres driven between full tanks by litres refilled.",
    ],
  },
  jimny: {
    subtitle: "Compact off-roader",
    description: "Meet the Taiwan-specification Jimny 2026: a three-door, four-seat model with ALLGRIP PRO and updated driver assistance. Ask about pricing and a Taipei test drive.",
    highlights: ["ALLGRIP PRO", "Adaptive cruise control", "DSBS II"],
    considerations: [
      "Jimny is a three-door, four-seat model measuring 3,650 × 1,645 × 1,705 mm. Its short body suits city parking, while rear passengers enter through the front doors.",
      "Four-wheel drive does not guarantee safe passage on every surface. Follow the owner's manual for drive modes and operating conditions.",
      "For regular trips with three or four people and luggage, start with the five-door VITARA or S-CROSS. Jimny is easier to use for one or two people, with the rear seats available for extra luggage space.",
    ],
  },
  "e-vitara": {
    subtitle: "All-electric SUV",
    description: "Compare Taiwan's e VITARA 2WD and ALLGRIP-e versions, prices, charging connections and official range figures before arranging a Taipei test drive.",
    highlights: ["All-electric drive", "2WD: 516 km NEDC range", "ALLGRIP-e all-wheel drive option"],
    considerations: [
      "Use Type 1 (J1772) for AC charging and CCS1 for DC charging. Official development-stage targets at room temperature are about 9 hours from 10% to 100% at 7 kW AC, or 45 minutes from 10% to 80% with DC fast charging.",
      "Choose front-wheel-drive 2WD for longer range: 516 km in the official NEDC test. Choose dual-motor ALLGRIP-e for four-wheel drive and TRAIL mode, with a 444 km NEDC test range.",
      "For home charging, get an installation quote after an electrician checks the parking space, power supply and wiring.",
    ],
  },
  vitara: {
    subtitle: "Mild-hybrid SUV",
    description: "A 1.4L turbo mild-hybrid SUV with ALLGRIP four-wheel drive. Compare Taiwan pricing, everyday space and your driving needs with S-CROSS.",
    highlights: ["ALLGRIP four-wheel drive", "1.4L BOOSTERJET", "48V mild hybrid"],
    considerations: [
      "Choose VITARA when four-wheel drive matters to your routes. ALLGRIP offers Auto, Sport, Snow and Lock modes; the 1.4L turbo and 48V mild hybrid use petrol without external charging.",
      "Tyres, road conditions and driver inputs still limit grip. Four-wheel drive is not a guarantee of access on every road.",
      "VITARA has 375 L of boot space with the rear seats upright. If family luggage takes priority over four-wheel drive, compare S-CROSS's 430–440 L boot, depending on rear seatback angle.",
    ],
  },
  "s-cross": {
    subtitle: "Family crossover",
    description: "A front-wheel-drive crossover with a 48V mild-hybrid engine and a 440 L boot. Explore Taiwan pricing and compare family space with VITARA.",
    highlights: ["440 L boot", "48V mild hybrid", "6 SRS airbags"],
    considerations: [
      "S-CROSS provides 430–440 L of boot space with the rear seats upright, depending on backrest angle, or up to 1,230 L when folded. Use the upright-seat figure when planning trips with passengers and luggage together.",
      "Taiwan's S-CROSS uses front-wheel drive and a 1.4L turbo with a 48V mild hybrid. Choose it for family road trips without charging stops; choose VITARA if you also need ALLGRIP four-wheel drive.",
      "Driver assistance has operating limits. The driver must continue to pay attention to the road and remain in control.",
    ],
  },
  carry: {
    subtitle: "Commercial truck",
    description: "A practical work truck with a 915 kg payload and a three-side-opening cargo bed. Check Taiwan pricing and suitability for your daily loading needs.",
    highlights: ["915 kg payload", "Three-side-opening cargo bed", "1.5L petrol engine"],
    considerations: [
      "CARRY's cargo bed is 2,565 × 1,660 mm, with a 915 kg payload. Start with cargo dimensions for bulky goods and total weight for dense loads; include fitted equipment in your loading plan.",
      "The bed sits 750 mm above the ground and opens on three sides, making it easier to load from the rear or either side. Plan the stacking layout around your usual goods and loading method.",
      "For work use, budget for the vehicle, financing and fitted equipment, including any cargo box.",
    ],
  },
};

export const englishCarDetails: Record<CarId, { introduction: string; testDrive: string[] }> = {
  swift: {
    introduction: "A compact 1.2L mild-hybrid hatchback for city commuting and easier parking. SWIFT uses petrol and needs no external charging.",
    testDrive: [
      "Tell the advisor your preferred date and usual commute to plan a useful test-drive route.",
      "Notice acceleration, stop-start operation, braking and parking visibility on the agreed route.",
      "Adjust the front seats to your normal position, then try the rear seats and luggage space with your family.",
    ],
  },
  jimny: {
    introduction: "Taiwan’s Jimny 2026 is a three-door, four-seat off-roader. Its short body suits one or two people who want city manoeuvrability and four-wheel drive.",
    testDrive: [
      "Ask about the ACC controls, touchscreen and phone connection using the actual display or test vehicle.",
      "Let your regular passengers try rear-seat access, and check luggage space and parking visibility.",
      "On the road, pay attention to steering, braking and how bumps feel from each seat.",
    ],
  },
  "e-vitara": {
    introduction: "An electric SUV with a choice of front-wheel-drive 2WD or dual-motor ALLGRIP-e. Choose 2WD for longer test range, or ALLGRIP-e for four-wheel drive.",
    testDrive: [
      "Try acceleration and deceleration, and check the driving position and screen controls.",
      "Ask for a demonstration of the charge port, charging information and everyday controls.",
      "Bring your usual routes and charging options to discuss a practical routine and backup stops.",
    ],
  },
  vitara: {
    introduction: "A 1.4L turbo SUV with a 48V mild hybrid and ALLGRIP four-wheel drive. Fill up with petrol; no charger is needed.",
    testDrive: [
      "Experience acceleration, steering and parking visibility on an agreed route.",
      "Have your family try the seats, then check the boot opening against the dimensions of your usual luggage.",
      "Ask about ALLGRIP modes and their limits, and compare the ride with S-CROSS.",
    ],
  },
  "s-cross": {
    introduction: "S-CROSS is a front-wheel-drive mild-hybrid SUV for family trips. Its boot holds 430–440 L with the rear seats in use, depending on backrest angle; no external charging is needed.",
    testDrive: [
      "Try the front and rear seats together, including access, storage and air conditioning.",
      "Check parking visibility and ask the advisor to demonstrate relevant assistance features.",
      "Compare luggage space with the rear seats upright and folded, using your actual luggage dimensions.",
    ],
  },
  carry: {
    introduction: "CARRY is a work truck with a 915 kg payload and a cargo bed that opens on three sides. The 2,565 × 1,660 mm bed makes it easy to plan space for tools and goods.",
    testDrive: [
      "Share cargo dimensions, weight and loading methods before arranging a visit.",
      "Try getting in and out of the cab and check the position of everyday controls.",
      "Book ahead so the advisor can arrange the available vehicle and any loading demonstration.",
    ],
  },
};

export function englishVersionName(id: CarId, versionName: string) {
  return id === "e-vitara" ? versionName : `${getCar(id)!.name} Taiwan specification`;
}

export const englishFaqs = [
  {
    id: "total-cost",
    question: "Is the price on the website the total delivery price?",
    answer: "Website prices are recommended starting prices in NT$. Your quotation adds any options, insurance, registration, finance fees and transport. Compare the final total and avoid counting included items twice.",
  },
  {
    id: "test-drive-booking",
    question: "How do I arrange a showroom visit or test drive?",
    answer: "Send your preferred model, date and number of visitors by LINE or the enquiry form. The advisor will reply with the available vehicle, appointment time and documents to bring.",
  },
  {
    id: "delivery-time",
    question: "When can I receive my car, and can delivery be arranged outside Taipei?",
    answer: "Delivery follows vehicle allocation, payment or financing, registration and accessory fitting. Give the advisor your target date early. For delivery outside Taipei, request a separate quote for the location and transport cost.",
  },
  {
    id: "cash-or-loan",
    question: "Can I ask about financing or current offers?",
    answer: "Yes. Send your model, budget and purchase timing. Compare the down payment, all instalments, final payment and fees together. Loan approval and terms depend on the lender.",
  },
  {
    id: "taiwan-phone",
    question: "Can I use the form without a Taiwan mobile number?",
    answer: "Use LINE if you do not have a Taiwan mobile number. The form accepts numbers starting with 09 or +8869. Include your preferred language in your message.",
  },
  {
    id: "purchase-documents",
    question: "What information should I prepare before buying?",
    answer: "For a first enquiry, send the model, budget, purchase timing and whether you prefer cash or financing. Registration documents differ for personal and company purchases; request the matching document list when ordering.",
  },
  {
    id: "hybrid-plug",
    question: "Which of these cars need external charging?",
    answer: "SWIFT, VITARA and S-CROSS use petrol and need no external charging. The all-electric e VITARA uses Type 1 (J1772) AC charging or CCS1 DC fast charging.",
  },
  {
    id: "showroom-parking",
    question: "Is parking available at the Beitou showroom?",
    answer: "Yes, parking at the Beitou showroom is free. Staff can show you where to park on arrival. Mention any mobility assistance needs when booking.",
  },
];
