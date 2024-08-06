(function() {
    let template = document.createElement('template');
    template.innerHTML = `
        <form id="form">
                <legend style="font-weight: bold;font-size: 18px;"> Text Properties </legend>
                <table>
                    <tr>
                        <td>Chart Title</td>
                        <td><input id="chartTitle" type="text"></td>
                    </tr>
                    <tr>
                        <td>Chart Subtitle</td>
                        <td><input id="chartSubtitle" type="text"></td>
                    </tr>
                </table>
                <input type="submit" style="display:none;">
        </form>
    `;

    class HighchartsWidgetAps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.getElementById('form').addEventListener('submit', this._submit.bind(this));
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('propertiesChanged', {
                detail: {
                    properties: {
                        chartTitle: this.chartTitle,
                        chartSubtitle: this.chartSubtitle
                    }
                }
            }));
        }

        set chartTitle(value) {
            this._shadowRoot.getElementById('chartTitle').value = value;
        }

        get chartTitle() {
            return this._shadowRoot.getElementById('chartTitle').value;
        }

        set chartSubtitle(value) {
            this._shadowRoot.getElementById('chartSubtitle').value = value;
        }

        get chartSubtitle() {
            return this._shadowRoot.getElementById('chartSubtitle').value;
        }
    }

    customElements.define('com-sap-sample-linechartdb-aps', HighchartsWidgetAps);
})();