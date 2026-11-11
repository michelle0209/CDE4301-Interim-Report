
new gridjs.Grid({
  columns: [
    "Approach",
    "Advantage",
    "Limitation"
  ],

  data: [
    ["Prompt-based LLM",
      gridjs.html("• Rapid implementation<br>• Low-cost<br>• No additional datasets required"),
      "Limited control over virtual nurse's emotions and disclosure progression"],

    ["System prompt guardrails",
      gridjs.html("• Provides instructions to maintain character behaviour<br>• Restricts unwanted responses"),
      "LLM may not consistently follow predefined instructions"],

    ["Adaptive behavioural modelling",
      gridjs.html("• Regulates how the virtual nurse's emotional state and behaviour change in response to the nurse manager's input<br>• More consistent and realistic responses"),
      "• More complex to design and test"],

    ["Predefined rule-based feedback",
      "• Provides consistent assessment based on predefined conditions",
      "• Limited flexibility in interpreting open-ended coaching conversations"],

    ["LLM-based rubric-guided assessment",
      "• Generates personalised feedback based on the coaching rubrics",
      "• Assessment accuracy and reliability require expert validation"],

    ["Separate AI coachee and assessor",
      "• Allows conversation simulation and coaching assessment to be handled independently",
      "• Requires additional system integration"]
  ]
}).render(document.getElementById("table-1"));


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
