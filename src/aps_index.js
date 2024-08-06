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
                <legend style="font-weight: bold;font-size: 18px;"> Number Formatting </legend>
                <table>
                    <tr>
                        <td>Scale Format</td>
                        <td>
                            <select id="numberFormat">
                                <option value="unformatted" selected>Unformatted</option>
                                <option value="k">Thousands (k)</option>
                                <option value="m">Millions (m)</option>
                                <option value="b">Billions (b)</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Decimal Places</td>
                        <td>
                            <select id="decimalPlaces">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2" selected>2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </td>
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
            this._shadowRoot.getElementById('numberFormat').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('decimalPlaces').addEventListener('change', this._submit.bind(this));
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('propertiesChanged', {
                detail: {
                    properties: {
                        chartTitle: this.chartTitle,
                        chartSubtitle: this.chartSubtitle,
                        numberFormat: this.numberFormat,
                        decimalPlaces: this.decimalPlaces
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

        set numberFormat(value) {
            this._shadowRoot.getElementById('numberFormat').value = value;
        }

        get numberFormat() {
            return this._shadowRoot.getElementById('numberFormat').value;
        }

        set decimalPlaces(value) {
            this._shadowRoot.getElementById('decimalPlaces').value = value;
        }

        get decimalPlaces() {
            return this._shadowRoot.getElementById('decimalPlaces').value;
        }
   
    }

    customElements.define('com-sap-sample-linechartdb-aps', HighchartsWidgetAps);
})();