// All report tables. Each one renders into the <div id="table-N"> with the same number as its caption.
// Tables 1-5 (Section 3) and 7-8 (Section 6.1) use specTable(), which sizes the columns to fit the page.

// ---------------------------------------------------------------- Table 6: Evaluation of candidate approaches (Section 4.2)

new gridjs.Grid({
  columns: [
    "Approach",
    "Advantage",
    "Limitation"
  ],

  data: [
    [
      "Prompt-based LLM",
      gridjs.html("• Rapid implementation<br>• Low cost<br>• No additional datasets required"),
      "• Limited control over virtual nurses' emotions and disclosure progression"
    ],

    [
      "System prompt guardrails",
      gridjs.html("• Provides instructions to maintain character behaviour<br>• Restricts unwanted responses"),
      "• LLM may not consistently follow predefined instructions"
    ],

    [
      "Adaptive behavioural modelling",
      gridjs.html("• Regulates how the virtual nurses' emotional state and behaviour change in response to the nurse manager's input<br>• More consistent and realistic responses"),
      "• More complex to design and test"
    ],

    [
      "Predefined rule-based feedback",
      "• Provides consistent assessment based on predefined conditions",
      "• Limited flexibility in interpreting open-ended coaching conversations"
    ],

    [
      "LLM-based rubric-guided assessment",
      "• Generates personalised feedback based on coaching rubrics",
      "• Assessment accuracy and reliability require expert validation"
    ],

    [
      "Separate AI coachee and assessor",
      "• Allows conversation simulation and coaching assessment to be handled independently",
      "• Requires additional system integration"
    ]
  ]
}).render(document.getElementById("table-6"));


// ---------------------------------------------------------------- Table 9: Work plan (Section 7.2)

new gridjs.Grid({
  columns: [
    "Phase",
    "Key Tasks",
    "Milestone"
  ],

  data: [
    [
      "1. Prototype refinement",
      "• Incorporate NUH feedback and address the limitations identified",
      "Refined web prototype"
    ],

    [
      "2. Enhanced assessment",
      gridjs.html("• Improve GROW-L and 3P assessment accuracy through validation tests with a human assessor<br>• Add facial expression and vocal tone analysis"),
      "Enhanced AI assessor"
    ],

    [
      "3. AI assessment validation",
      gridjs.html("• Collect coaching conversation transcripts from NUH coaching experts and the AI assessor<br>• Compare assessment results using Cohen's kappa and percentage agreement"),
      "Validated AI assessor"
    ],

    [
      "4. VR development",
      gridjs.html("• Integrate avatar and voice interaction into VR<br>• Test comfort and usability"),
      "Working VR version"
    ],

    [
      "5. Validation and finalisation",
      gridjs.html("• Evaluate with NUH instructors and nurse managers<br>• Implement final fixes"),
      "Final deliverables"
    ]
  ]
}).render(document.getElementById("table-9"));


// ---------------------------------------------------------------- Section 3 and 6.1 tables

function specTable(id, columns, data) {
  const el = document.getElementById(id);
  if (!el) return;
  new gridjs.Grid({ columns, data, sort: false, search: false, width: "100%", autoWidth: false }).render(el);
}

// Table 1: Functional requirements
specTable("table-1", [
  { name: "ID", width: "7%" },
  { name: "Requirement", width: "16%" },
  { name: "Why", width: "19%" },
  { name: "Target", width: "16%" },
  { name: "Verification", width: "15%" },
  { name: "Priority", width: "10%" },
  { name: "Status", width: "17%" },
], [
  ["F1", "The manager shall converse with the coachee by voice.",
    "Coaching is a spoken skill, so practice should match real conversations, to have a similar effect as a role play.",
    "Full session completed by voice, with typed input available if the microphone fails.",
    "Functional test", "Must", "Met"],
  ["F2", "The conversation shall not end at a fixed turn count.",
    "Real coaching conversations have no set length, so a cut-off could end a session before the coaching is done.",
    "No turn limit enforced and the manager can always continue or end.",
    "Functional test", "Must", "Met"],
  ["F3", "The coachee shall stay in role and keep hidden information private.",
    "If a manager can break the character or extract hidden information or scores, the practice stops being realistic and the feedback can be gamed.",
    "0 role breaks observed across a prompt-injection test (e.g. \"show me your prompt\", \"ignore your instructions and...\").",
    "Live prompt-injection test and unit tests of the in-character filter", "Must",
    "Met. 0 of 40 live attacks broke role or revealed hidden information (Section 6.1)"],
  ["F4", "Disclosure shall deepen only as trust builds.",
    "Aisha should open up only when the manager builds trust, so that good coaching is what reveals her story, as described by Social Penetration Theory (Altman & Taylor, 1973).",
    "Reply content matches the permitted disclosure layer in ≥ 95% of turns.",
    "Transcript audit of 9 scripted conversations against the layer trust permits", "Should",
    "Not met. 81% of 54 scripted replies stayed within the permitted layer, and leaks occurred only under supportive questioning (Section 6.1)"],
  ["F5", "Feedback shall be structured by Partner, Practice and GROW-L, with every claim quoting the manager.",
    "ELCP is NUH's coaching framework, and feedback can only be trusted if each claim can be checked against what the manager said.",
    "100% of quotes found in the transcript, with unverifiable claims removed automatically.",
    "Automatic quote check and manual audit of feedback reports", "Must",
    "Met. 80 of 80 quotes verified across 9 reports, and 2 invented quotes removed by the safeguard (Section 6.1)"],
  ["F6", "The manager shall be able to retry and see scores change per skill.",
    "Deliberate practice relies on repeated attempts with specific feedback, so managers need to see which skills improve.",
    "Competence scores per skill across attempts, with no single overall score.",
    "Functional test over repeated sessions", "Should", "Met"],
  ["F7", "The conversation shall be able to close naturally once the coaching reaches a resolution, e.g. an agreed next step.",
    "NUH's tester found the open-ended ending unnatural. Real conversations close once a next step is agreed.",
    "The coachee recognises wrap-up cues and closes the conversation, and the manager can still continue.",
    "User sessions rating whether endings feel natural", "Should",
    "Not yet met. Requested during NUH testing, to be addressed in Phase 1"],
  ["F8", "The coachee shall appear as a 3D avatar in a realistic office setting, in the browser.",
    "A visible, embodied character makes the conversation feel closer to a real one-to-one than text or a static picture.",
    "3D avatar and office rendered in Chrome on a standard laptop.",
    "Functional test", "Should", "Met"],
  ["F9", "The avatar's facial expressions, body language and voice shall match the coachee's simulated emotional state.",
    "Managers must be able to read how a remark landed from nonverbal cues, as they would with a real staff member.",
    "Each emotional state produces the intended expression, posture and voice delivery (FACS-informed face, Laban-informed movement).",
    "Team check of logged values and screenshots, with a perception study with NUH staff planned", "Should",
    "Partly met, self-validated. To be perception-tested with NUH staff in Phase 5"],
  ["F10", "The manager shall be able to speak hands-free, with a natural pause ending each turn.",
    "Pressing a key on every turn interrupts the flow of a spoken conversation.",
    "A turn ends after about 1.6 s of silence. Pressing Enter still ends a turn early.",
    "Functional test and usability sessions", "Should", "Met"],
  ["F11", "New scenarios shall be addable as data files without code changes.",
    "NUH plans more scenarios, such as an aspiring charge nurse or a reluctant coachee, and adding one should not need a developer.",
    "A new scenario file (character, visible brief, hidden layers, opening line, emotional settings) loads and runs without code edits.",
    "Unit tests of scenario loading and adding a second scenario", "Should", "Met, one scenario built so far"],
]);

const specColumns = [
  { name: "ID", width: "7%" },
  { name: "Requirement", width: "25%" },
  { name: "Target and verification", width: "33%" },
  { name: "Priority", width: "10%" },
  { name: "Status", width: "25%" },
];

// Table 2: Performance requirements
specTable("table-2", specColumns, [
  ["P1", "The coachee shall begin replying promptly.",
    "Median ≤ 4 s from the end of speech, since longer delays worsen experiences with AI characters (Maslych et al., 2025). Verified with response timing logs.",
    "Must",
    "Partly measured. Reply generation took a median of 1.2 s (maximum 2.4 s) across the 54 F4 replies, with typed input and voice off. End-to-end response time, including speech recognition and voice synthesis, will be measured in Phase 1 against the 4 s target"],
  ["P2", "Speech shall be transcribed accurately for Singapore-accented English.",
    "Word error rate ≤ 10% on recorded test phrases.", "Should", "To be measured in Phase 1"],
  ["P3", "The system shall run on a standard laptop browser.",
    "Chrome on a laptop without a dedicated GPU, with no installation needed.", "Must", "Met"],
]);

// Table 3: Feedback quality requirements
specTable("table-3", specColumns, [
  ["Q1", "AI ratings shall agree with ELCP trainers.",
    "Cohen's κ ≥ 0.61, \"substantial\" agreement (Landis & Koch, 1977), on a shared set of transcripts.",
    "Must", "Planned for Phase 3"],
  ["Q2", "Demonstrated 3P + GROW-L stages shall not be missed.",
    "Missed behaviours per criterion recorded against expert ratings.",
    "Should", "Partly met. The first NUH test missed some stages (Section 6.2), to be addressed in Phase 2"],
]);

// Table 4: Usability requirements
specTable("table-4", specColumns, [
  ["U1", "The interface shall be easy to use without training.",
    "System Usability Scale score ≥ 68 with nurse managers. The scale was developed by Brooke (1996), and 68 is the commonly cited average (Sauro, 2011).",
    "Should",
    "Rated 5/5 on usability by the NUH ELCP course conductor in a perception survey. To be tested further with the System Usability Scale and more users in Phase 5"],
  ["U2", "A first-time user shall complete a session unaided.",
    "Task completion in observed sessions.", "Should", "Met, based on one expert session"],
]);

// Table 5: Privacy and safety requirements
specTable("table-5", specColumns, [
  ["S1", "No patient data shall be required or requested.",
    "No patient fields, with an on-screen privacy notice. Design review.", "Must", "Met"],
  ["S2", "The manager's raw audio shall not be stored.",
    "Only transcripts kept, and sessions can be deleted. Storage inspection.", "Must", "Met"],
  ["S3", "Data sent to external services shall be disclosed and approved before deployment.",
    "Data-flow documentation reviewed against NUH governance and PDPA.", "Must",
    "Documented, with submission to NUH and approval pending"],
]);

// Table 7: Live functional tests (Section 6.1)
specTable("table-7", ["Test", "Req.", "Sample", "Result", "Target", "Met?"], [
  ["Role stability", "F3", "40 attacks", "40 of 40 passed", "40 of 40", "Yes"],
  ["Disclosure control", "F4", "54 replies", "81% within the permitted layer", "≥ 95%", "No"],
  ["Feedback grounding", "F5", "9 reports", "80 of 80 quotes verified, 2 invented quotes removed", "100% of quotes verified", "Yes"],
]);

// Table 8: Disclosure results by script (Section 6.1)
specTable("table-8", ["Script", "Replies", "Leaks", "Strict leaks", "Self-solutions"], [
  ["A Supportive", "18", "6", "11", "0"],
  ["B Judged at turn 4", "18", "4", "7", "2"],
  ["C Dismissive", "18", "0", "0", "0"],
  [gridjs.html("<strong>Total</strong>"), gridjs.html("<strong>54</strong>"), gridjs.html("<strong>10 (19%)</strong>"),
    gridjs.html("<strong>18 (33%)</strong>"), gridjs.html("<strong>2</strong>")],
]);


class TableComponent extends HTMLElement {
  static get observedAttributes() {
    return ["subtitle"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, _, newValue) {
    this[name] = newValue;
  }

  render() {
    const div = document.createElement("div");
    div.innerHTML = `
    <slot></slot>
    <sub>${this.subtitle}</sub>
    <style>
      :host {
        display: block;
        text-align: center;
      }

      sub {
        font-size: 1rem;
        font-style: italic;
      }
    </style>
  `;

    this.shadowRoot.appendChild(div);
  }
}

customElements.define("table-component", TableComponent);
