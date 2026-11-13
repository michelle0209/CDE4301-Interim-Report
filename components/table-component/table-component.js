
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
}).render(document.getElementById("table-1"));


new gridjs.Grid({
  columns: [
    "Phase",
    "Key Tasks",
    "Milestone"
  ],

  data: [
    [
      "1. Prototype refinement",
      "Incorporate NUH feedback and address the limitations identified",
      "Refined web prototype"
    ],

    [
      "2. Enhanced assessment",
      gridjs.html("• Improve GROW-L and 3P assessment accuracy through validation tests with a human assessor<br>• Add facial expression and vocal tone analysis"),
      "Enhanced AI assessor"
    ],

    [
      "3. VR development",
      gridjs.html("• Integrate avatar and voice interaction into VR<br>• Test comfort and usability"),
      "Working VR version"
    ],

    [
      "4. Validation and finalisation",
      gridjs.html("• Evaluation with NUH instructors and nurse managers<br>• Final fixes"),
      "Final deliverables"
    ]
  ]
}).render(document.getElementById("table-2"));

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
