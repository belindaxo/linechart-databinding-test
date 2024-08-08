(function() {
    let template = document.createElement('template');
    template.innerHTML = `
        <form id="form">
            <legend style="font-weight: bold;font-size: 18px;"> Font </legend>
            <table>
                <tr>
                    <td>Chart Title</td>
                </tr>
                <tr>
                    <td><input id="chartTitle" type="text"></td>
                </tr>
                <tr>
                    <table>
                        <tr>
                            <td>Size</td>
                            <td>Font Style</td>
                            <td>Alignment</td>
                        </tr>
                        <tr>
                            <td>
                                <select id="titleSize">
                                    <option value="10px">10</option>
                                    <option value="12px">12</option>
                                    <option value="14px">14</option>
                                    <option value="16px">16</option>
                                    <option value="18px">18</option>
                                    <option value="20px" selected>20</option>
                                    <option value="22px">22</option>
                                    <option value="24px">24</option>
                                    <option value="32px">32</option>
                                    <option value="48px">48</option>
                                </select>
                            </td>
                            <td>
                                <select id="titleFontStyle">
                                    <option value="normal">Normal</option>
                                    <option value="bold" selected>Bold</option>
                                </select>
                            </td>
                            <td>
                                <select id="titleAlignment">
                                    <option value="left">Left</option>
                                    <option value="center" selected>Center</option>
                                    <option value="right">Right</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </tr>
            </table>
            <table>
                <tr>
                    <td>Chart Subtitle</td>
                </tr>
                <tr>
                    <td><input id="chartSubtitle" type="text"></td>
                </tr>
                <tr>
                    <table>
                        <tr>
                            <td>Size</td>
                            <td>Font Style</td>
                            <td>Alignment</td>
                        </tr>
                        <tr>
                            <td>
                                <select id="subtitleSize">
                                    <option value="10px">10</option>
                                    <option value="12px" selected>12</option>
                                    <option value="14px">14</option>
                                    <option value="16px">16</option>
                                    <option value="18px">18</option>
                                    <option value="20px">20</option>
                                    <option value="22px">22</option>
                                    <option value="24px">24</option>
                                    <option value="32px">32</option>
                                    <option value="48px">48</option>
                                </select>
                            </td>
                            <td>
                                <select id="subtitleFontStyle">
                                    <option value="normal" selected>Normal</option>
                                    <option value="italic">Italic</option>
                                </select>
                            </td>
                            <td>
                                <select id="subtitleAlignment">
                                    <option value="left">Left</option>
                                    <option value="center" selected>Center</option>
                                    <option value="right">Right</option>
                                </select>
                            </td>
                        </tr>
                    </table>
                </tr>
            </table>
            <legend style="font-weight: bold;font-size: 18px;"> Number Formatting </legend>
            <table>
                <tr>
                    <td>Scale Format</td>
                </tr>
                <tr>
                    <td>
                        <select id="scaleFormat">
                            <option value="unformatted" selected>Unformatted</option>
                            <option value="k">Thousands (k)</option>
                            <option value="m">Millions (m)</option>
                            <option value="b">Billions (b)</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Decimal Places</td>
                </tr>
                <tr>
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
            this._shadowRoot.getElementById('scaleFormat').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('decimalPlaces').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('titleSize').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('titleFontStyle').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('titleAlignment').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('subtitleSize').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('subtitleFontStyle').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('subtitleAlignment').addEventListener('change', this._submit.bind(this));
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('propertiesChanged', {
                detail: {
                    properties: {
                        chartTitle: this.chartTitle,
                        titleSize: this.titleSize,
                        titleFontStyle: this.titleFontStyle,
                        titleAlignment: this.titleAlignment,
                        chartSubtitle: this.chartSubtitle,
                        subtitleSize: this.subtitleSize,
                        subtitleFontStyle: this.subtitleFontStyle,
                        subtitleAlignment: this.subtitleAlignment,
                        scaleFormat: this.scaleFormat,
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

        set titleSize(value) {
            this._shadowRoot.getElementById('titleSize').value = value;
        }

        get titleSize() {
            return this._shadowRoot.getElementById('titleSize').value;
        }

        set titleFontStyle(value) {
            this._shadowRoot.getElementById('titleFontStyle').value = value;
        }

        get titleFontStyle() {
            return this._shadowRoot.getElementById('titleFontStyle').value;
        }

        set titleAlignment(value) {
            this._shadowRoot.getElementById('titleAlignment').value = value;
        }

        get titleAlignment() {
            return this._shadowRoot.getElementById('titleAlignment').value;
        }

        set chartSubtitle(value) {
            this._shadowRoot.getElementById('chartSubtitle').value = value;
        }

        get chartSubtitle() {
            return this._shadowRoot.getElementById('chartSubtitle').value;
        }

        set subtitleSize(value) {
            this._shadowRoot.getElementById('subtitleSize').value = value;
        }

        get subtitleSize() {
            return this._shadowRoot.getElementById('subtitleSize').value;
        }

        set subtitleFontStyle(value) {
            this._shadowRoot.getElementById('subtitleFontStyle').value = value;
        }

        get subtitleFontStyle() {
            return this._shadowRoot.getElementById('subtitleFontStyle').value;
        }

        set subtitleAlignment(value) {
            this._shadowRoot.getElementById('subtitleAlignment').value = value;
        }

        get subtitleAlignment() {
            return this._shadowRoot.getElementById('subtitleAlignment').value;
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