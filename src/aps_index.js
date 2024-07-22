(function()  {
    // Create a template for the Styling Panel
	let template = document.createElement("template");
    // Set the inner HTML of the template
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Colored Box Properties</legend>
				<table>
					<tr>
						<td>Chart Title</td>
						<td><input id="aps_title" type="string"></td>
					</tr>
				</table>
			</fieldset>
		</form>
	`;

	class LineChartDBAps extends HTMLElement {
        // EFFECTS:  Creates a shadow root and appends the template content to it
		constructor() {
			super();
            // Create a shadow root
			this._shadowRoot = this.attachShadow({mode: "open"});
            // Append the template content to the shadow root
			this._shadowRoot.appendChild(template.content.cloneNode(true));
            // Add an event listener for the form submit event
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

        // REQUIRES: e is an event
        // MODIFIES: this
        // EFFECTS:  Prevents the default form submission behavior and dispatches a custom event with the updated properties
		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							title: this.title
						}
					}
			}));
		}

        // Getters and setters for the title property
		set title(newTitle) {
			this._shadowRoot.getElementById("aps_title").value = newTitle;
		}

		get title() {
			return this._shadowRoot.getElementById("aps_title").value;
		}
	}
    // Define the custom element
    customElements.define("com-sap-sample-linechartdb-aps", LineChartDBAps);
})();