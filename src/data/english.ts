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
      "Fuel economy is an official test result. Traffic, short trips, air conditioning and driving style affect everyday consumption.",
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
      "Home charging feasibility and cost require a qualified professional to inspect the power supply, wiring and parking space.",
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
      "Commercial financing and campaign eligibility need individual confirmation. A general consumer offer may not apply to every business use.",
    ],
  },
};

export const englishCarDetails: Record<CarId, { introduction: string; testDrive: string[] }> = {
  swift: {
    introduction: "SWIFT pairs a 1.2L mild-hybrid engine with a CVT and does not need external charging. Start with your parking space, regular passengers and luggage, then compare an itemised quotation including colour, options, insurance and registration.",
    testDrive: [
      "Share your preferred date, number of passengers and typical commute so the advisor can check vehicle and time-slot availability.",
      "Notice acceleration, stop-start operation, braking and parking visibility on the agreed route.",
      "Adjust the front seats to your normal position, then try the rear seats and luggage space with your family.",
    ],
  },
  jimny: {
    introduction: "This page covers Taiwan's current three-door, four-seat Jimny 2026. Explore its equipment and everyday practicality, then confirm the model year, production date, colour, available stock and itemised quotation with the advisor.",
    testDrive: [
      "Ask about the ACC controls, touchscreen and phone connection using the actual display or test vehicle.",
      "Let your regular passengers try rear-seat access, and check luggage space and parking visibility.",
      "Experience steering, braking and bumps on the agreed road route. An off-road experience is not included unless separately confirmed.",
    ],
  },
  "e-vitara": {
    introduction: "Begin with your charging routine: where you park, whether equipment can be installed and where you would charge on longer journeys. Compare both drive requirements and official test ranges when choosing between 2WD and ALLGRIP-e.",
    testDrive: [
      "Try acceleration and deceleration, and check the driving position and screen controls.",
      "Ask for a demonstration of the charge port, charging information and everyday controls.",
      "Bring your usual routes and charging options to discuss a practical routine and backup stops.",
    ],
  },
  vitara: {
    introduction: "Consider VITARA through your drive requirements, passenger space and everyday routes. If weekdays mean commuting and weekends mean outdoor trips, compare it with S-CROSS using the same passengers and luggage.",
    testDrive: [
      "Experience acceleration, steering and parking visibility on an agreed route.",
      "Have your family try the seats, then check the boot opening against the dimensions of your usual luggage.",
      "Ask about ALLGRIP modes and their limits, and compare the ride with S-CROSS.",
    ],
  },
  "s-cross": {
    introduction: "Think about how your family uses a car each day: who sits in the back, whether passengers and luggage travel together, and how easy your parking space is to access. Check S-CROSS in person and compare your drive requirements with VITARA.",
    testDrive: [
      "Try the front and rear seats together, including access, storage and air conditioning.",
      "Check parking visibility and ask the advisor to demonstrate relevant assistance features.",
      "Compare luggage space with the rear seats upright and folded, using your actual luggage dimensions.",
    ],
  },
  carry: {
    introduction: "Start with the job: cargo size and weight, loading methods and daily routes, then review purchase and operating costs. The cargo-bed and payload figures help with initial selection; confirm your intended use against the vehicle's approved specifications.",
    testDrive: [
      "Share cargo dimensions, weight and loading methods before arranging a visit.",
      "Try getting in and out of the cab and check the position of everyday controls.",
      "Confirm display, test-drive and loading-demonstration availability in advance; do not assume a vehicle will be on site.",
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
    answer: "Website prices are recommended starting prices in New Taiwan dollars (NT$ / TWD). Ask for an itemised quotation covering the agreed vehicle price, colour and options, insurance, registration and taxes, financing charges and any separately arranged transport. Confirm what is already included before comparing quotations.",
  },
  {
    id: "test-drive-booking",
    question: "How do I arrange a showroom visit or test drive?",
    answer: "Send the model you are interested in, your preferred date and the number of people visiting. The advisor will confirm the display or test vehicle, time, route, eligibility and documents to bring. A successful website submission means your enquiry has been received; your appointment is confirmed separately by the advisor.",
  },
  {
    id: "delivery-time",
    question: "When can I receive my car, and can delivery be arranged outside Taipei?",
    answer: "Timing depends on the model, colour, available stock and the steps needed before delivery. Tell the advisor if you have a target date. Customers across Taiwan can discuss purchasing remotely; delivery location, transport costs, timing and the available service area are agreed individually.",
  },
  {
    id: "cash-or-loan",
    question: "Can I ask about financing or current offers?",
    answer: "Yes. Share your intended model, budget and purchase timing so the advisor can explain the available options. Financing is subject to individual review, and campaign eligibility and deadlines must be confirmed. Ask for the full payment schedule, fees and terms before choosing a plan; a monthly payment alone does not show the total cost.",
  },
  {
    id: "taiwan-phone",
    question: "Can I use the form without a Taiwan mobile number?",
    answer: "The online form accepts a Taiwan mobile number beginning with 09 or +8869. If you do not have one, please contact the advisor through LINE. Mention your preferred language and how you would like to be contacted when arranging your enquiry or visit.",
  },
  {
    id: "purchase-documents",
    question: "What information should I prepare before buying?",
    answer: "Start with the model, intended use, budget, purchase timing and whether you plan to pay in cash or apply for financing. Registration and financing documents depend on the purchaser and application. Ask the advisor to confirm the required documents for your circumstances before ordering.",
  },
  {
    id: "hybrid-plug",
    question: "Which of these cars need external charging?",
    answer: "The SWIFT, VITARA and S-CROSS mild-hybrid models described on this website do not need external charging. e VITARA is all-electric and needs a charging plan. Use the Taiwan specification for the exact model you are considering, as equipment and powertrains can differ across markets.",
  },
  {
    id: "showroom-parking",
    question: "Is parking available at the Beitou showroom?",
    answer: "The Beitou showroom provides free parking. Ask the staff where to park when you arrive. Please mention any boarding or mobility assistance needs when booking, and confirm the appointment before travelling.",
  },
];
