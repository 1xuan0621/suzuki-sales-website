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
      "Check passenger and luggage space together. Bring the dimensions of your stroller or regular luggage and try the boot with the rear seats upright.",
      "For mechanical parking, check length, width, height, weight limits and access conditions. Vehicle height alone does not confirm compatibility.",
      "Fuel economy is an official test result. Traffic, short trips, air conditioning and driving style affect everyday consumption.",
    ],
  },
  jimny: {
    subtitle: "Compact off-roader",
    description: "Meet the Taiwan-specification Jimny 2026: a three-door, four-seat model with ALLGRIP PRO and updated driver assistance. Ask about pricing and a Taipei test drive.",
    highlights: ["ALLGRIP PRO", "Adaptive cruise control", "DSBS II"],
    considerations: [
      "Try rear-seat access with your regular passengers, and check the trade-off between seating and luggage space.",
      "Four-wheel drive does not guarantee safe passage on every surface. Follow the owner's manual for drive modes and operating conditions.",
      "If you often travel long distances with several passengers, compare the seating and ride with other SUVs before deciding.",
    ],
  },
  "e-vitara": {
    subtitle: "All-electric SUV",
    description: "Compare Taiwan's e VITARA 2WD and ALLGRIP-e versions, prices, charging connections and official range figures before arranging a Taipei test drive.",
    highlights: ["All-electric drive", "2WD: 516 km NEDC range", "ALLGRIP-e all-wheel drive option"],
    considerations: [
      "If you rely on public charging, check compatible connectors, access hours and alternative charging sites along your usual routes.",
      "NEDC range is a test result, not a guaranteed distance at highway speeds, with a full load or with air conditioning in use.",
      "Home charging feasibility and cost require a qualified professional to inspect the power supply, wiring and parking space.",
    ],
  },
  vitara: {
    subtitle: "Mild-hybrid SUV",
    description: "A 1.4L turbo mild-hybrid SUV with ALLGRIP four-wheel drive. Compare Taiwan pricing, everyday space and your driving needs with S-CROSS.",
    highlights: ["ALLGRIP four-wheel drive", "1.4L BOOSTERJET", "48V mild hybrid"],
    considerations: [
      "Start with whether you need four-wheel drive, then compare purchase and running costs for your usual journeys.",
      "Tyres, road conditions and driver inputs still limit grip. Four-wheel drive is not a guarantee of access on every road.",
      "Check camping equipment or a stroller using its actual dimensions and the seating arrangement you normally use.",
    ],
  },
  "s-cross": {
    subtitle: "Family crossover",
    description: "A front-wheel-drive crossover with a 48V mild-hybrid engine and a 440 L boot. Explore Taiwan pricing and compare family space with VITARA.",
    highlights: ["440 L boot", "48V mild hybrid", "6 SRS airbags"],
    considerations: [
      "Boot capacity alone does not tell you whether everything fits. Check the opening, item dimensions and space with passengers seated.",
      "The version presented here is Taiwan's front-wheel-drive model. If you need four-wheel drive, compare VITARA rather than overseas S-CROSS specifications.",
      "Driver assistance has operating limits. The driver must continue to pay attention to the road and remain in control.",
    ],
  },
  carry: {
    subtitle: "Commercial truck",
    description: "A practical work truck with a 915 kg payload and a three-side-opening cargo bed. Check Taiwan pricing and suitability for your daily loading needs.",
    highlights: ["915 kg payload", "Three-side-opening cargo bed", "1.5L petrol engine"],
    considerations: [
      "Check both cargo dimensions and weight, including the effect of fitted equipment. A load fitting on the bed does not establish that it can be carried.",
      "Discuss special cargo, equipment or body modifications before ordering, and confirm suitability and applicable requirements.",
      "Commercial financing and campaign eligibility need individual confirmation. A general consumer offer may not apply to every business use.",
    ],
  },
};

export const englishCarDetails: Record<CarId, { introduction: string; specs: string[]; testDrive: string[] }> = {
  swift: {
    introduction: "SWIFT pairs a 1.2L mild-hybrid engine with a CVT and does not need external charging. Start with your parking space, regular passengers and luggage, then compare an itemised quotation including colour, options, insurance and registration.",
    specs: [
      "Engine: 1.2L three-cylinder petrol with 12V mild hybrid",
      "Power: 81 PS at 5,700 rpm",
      "Official fuel economy: 24.5 km/L",
      "Dimensions (L × W × H): 3,860 × 1,735 × 1,480 mm",
      "Boot: 265 L; 579 L with the rear seats folded",
      "Driver assistance and safety: full-speed ACC, LKA, DSBS II and 6 SRS airbags",
    ],
    testDrive: [
      "Share your preferred date, number of passengers and typical commute so the advisor can check vehicle and time-slot availability.",
      "Notice acceleration, stop-start operation, braking and parking visibility on the agreed route.",
      "Adjust the front seats to your normal position, then try the rear seats and luggage space with your family.",
    ],
  },
  jimny: {
    introduction: "This page covers Taiwan's current three-door, four-seat Jimny 2026. Explore its equipment and everyday practicality, then confirm the model year, production date, colour, available stock and itemised quotation with the advisor.",
    specs: [
      "Engine: 1.5L four-cylinder petrol",
      "Power: 102 PS at 6,000 rpm",
      "Drive: part-time 4WD with a transfer case (2H / 4H / 4L)",
      "Dimensions (L × W × H): 3,650 × 1,645 × 1,705 mm",
      "Official fuel economy: 14.5 km/L",
      "Chassis: ladder frame",
      "Driver assistance and safety: ACC, DSBS II, LDP and 6 SRS airbags",
      "Cabin: 9-inch touchscreen with wireless Apple CarPlay and Android Auto",
    ],
    testDrive: [
      "Ask about the ACC controls, touchscreen and phone connection using the actual display or test vehicle.",
      "Let your regular passengers try rear-seat access, and check luggage space and parking visibility.",
      "Experience steering, braking and bumps on the agreed road route. An off-road experience is not included unless separately confirmed.",
    ],
  },
  "e-vitara": {
    introduction: "Begin with your charging routine: where you park, whether equipment can be installed and where you would charge on longer journeys. Compare both drive requirements and official test ranges when choosing between 2WD and ALLGRIP-e.",
    specs: [
      "Powertrain: electric motors with a 61 kWh battery",
      "Drive: 2WD front-wheel drive or ALLGRIP-e all-wheel drive",
      "NEDC range: approximately 516 km (2WD) or 444 km (ALLGRIP-e)",
      "Charging: AC Type 1 (J1772) and DC CCS1",
      "DC fast charging: approximately 45 minutes from 10% to 80%; time varies with temperature and battery condition",
    ],
    testDrive: [
      "Try acceleration and deceleration, and check the driving position and screen controls.",
      "Ask for a demonstration of the charge port, charging information and everyday controls.",
      "Bring your usual routes and charging options to discuss a practical routine and backup stops.",
    ],
  },
  vitara: {
    introduction: "Consider VITARA through your drive requirements, passenger space and everyday routes. If weekdays mean commuting and weekends mean outdoor trips, compare it with S-CROSS using the same passengers and luggage.",
    specs: [
      "Engine: 1.4L BOOSTERJET direct-injection turbo with 48V mild hybrid",
      "Power: 110.02 PS at 4,400 rpm",
      "Torque: 23.97 kgm at 2,000–2,500 rpm",
      "Drive: ALLGRIP four-wheel drive (Auto / Sport / Snow / Lock)",
      "Official fuel economy: 17.4 km/L",
      "Boot: 375 L; maximum 710 L",
      "Driver assistance and safety: ACC, LKA, DSBS II and 6 SRS airbags",
    ],
    testDrive: [
      "Experience acceleration, steering and parking visibility on an agreed route.",
      "Have your family try the seats, then check the boot opening against the dimensions of your usual luggage.",
      "Ask about ALLGRIP modes and their limits, and compare the ride with S-CROSS.",
    ],
  },
  "s-cross": {
    introduction: "Think about how your family uses a car each day: who sits in the back, whether passengers and luggage travel together, and how easy your parking space is to access. Check S-CROSS in person and compare your drive requirements with VITARA.",
    specs: [
      "Engine: 1.4L BOOSTERJET turbo with 48V mild hybrid",
      "Power: 110.02 PS at 4,400 rpm",
      "Torque: 23.97 kgm at 2,000–2,500 rpm",
      "Official fuel economy: 19.1 km/L",
      "Boot: 440 L; 1,230 L with the rear seats folded",
      "Drive: 2WD front-wheel drive",
      "Driver assistance and safety: ACC, LKA, DSBS II, 360° camera and 6 SRS airbags",
    ],
    testDrive: [
      "Try the front and rear seats together, including access, storage and air conditioning.",
      "Check parking visibility and ask the advisor to demonstrate relevant assistance features.",
      "Compare luggage space with the rear seats upright and folded, using your actual luggage dimensions.",
    ],
  },
  carry: {
    introduction: "Start with the job: cargo size and weight, loading methods and daily routes, then review purchase and operating costs. The cargo-bed and payload figures help with initial selection; confirm your intended use against the vehicle's approved specifications.",
    specs: [
      "Engine: 1.5L four-cylinder petrol",
      "Power: 96.6 PS at 5,600 rpm",
      "Torque: 13.8 kgm at 4,400 rpm",
      "Payload: 915 kg",
      "Cargo bed (L × W × H): 2,565 × 1,660 × 290 mm, with three opening sides",
      "Official fuel economy: 14.7 km/L",
      "Manufacturer warranty: 3 years or 100,000 km; confirm the applicable terms",
    ],
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
