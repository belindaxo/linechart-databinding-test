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
                        <td>Color</td>
                    </tr>
                    <tr>
                        <td>
                            <select id="titleSize">
                                <option value="10px">10</option>
                                <option value="12px">12</option>
                                <option value="14px">14</option>
                                <option value="16px">16</option>
                                <option value="18px" selected>18</option>
                                <option value="20px">20</option>
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
                        <td>
                            <input id="titleColor" type="color" value="#000000">
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
                        <td>Color</td>
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
                        <td>
                            <input id="subtitleColor" type="color" value="#000000">
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
        <legend style="font-weight: bold;font-size: 18px;"> Legend </legend>
        <table>
            <tr>
                <td>
                    <input id="showLegend" type="checkbox" checked>
                    <label for="showLegend">Show legend</label>
                </td>
            </tr>
            <tr>
                <td>Layout</td>
                <td>Alignment</td>
            </tr>
            <tr>
                <td>
                    <select id="legendLayout">
                        <option value="horizontal" selected>Horizontal</option>
                        <option value="vertical">Vertical</option>

                    </select>
                </td>
                <td>
                    <select id="legendAlignment">
                        <option value="left">Left</option>
                        <option value="center" selected>Center</option>
                        <option value="right">Right</option>
                    </select>
            </tr>
        </table>
        <legend style="font-weight: bold;font-size: 18px;">Tooltip</legend>
        <table>
            <tr>
                <td>
                    <input id="showTooltip" type="checkbox" checked>
                    <label for="showTooltip">Show tooltip</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input id="tooltipShared" type="checkbox">
                    <label for="tooltipShared">Enable shared tooltip</label>
                </td>
            </tr>
        </table>
        <legend style="font-weight: bold;font-size: 18px;">Data Point</legend>
        <table>
            <tr>
                <td>
                    <input id="showDataLabels" type="checkbox">
                    <label for="showDataLabels">Show data labels</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input id="showDataMarkers" type="checkbox" checked>
                    <label for="showDataMarkers">Show data markers</label>
                </td>
            </tr>
            <tr>
                <td>
                    <input id="allowLabelOverlap" type="checkbox">
                    <label for="allowLabelOverlap">Allow data label overlap</label>
                </td>
            </tr>
        </table>
        <legend style="font-weight: bold;font-size: 18px;">Axis</legend>
        <table>
            <tr>
                <table>
                    <tr>
                        <td></td>
                        <td>X-Axis</td>
                        <td>Y-Axis</td>
                    </tr>
                    <tr>
                        <td>Show axis labels</td>
                        <td>
                            <input id="showXAxisLabels" type="checkbox" checked>
                        </td>
                        <td>
                            <input id="showYAxisLabels" type="checkbox" checked>
                        </td>
                    </tr>
                    <tr>
                        <td>Enable crosshair</td>
                        <td>
                            <input id="enableXAxisCrosshair" type="checkbox">
                        </td>
                        <td>
                            <input id="enableYAxisCrosshair" type="checkbox">
                        </td>
                    </tr>
                    <tr>
                        <td>Enable zooming</td>
                        <td>
                            <input id="enableXAxisZoom" type="checkbox" checked>
                        </td>
                        <td>
                            <input id="enableYAxisZoom" type="checkbox" checked>
                        </td>
                    </tr>
                    <tr>
                        <td>Enable panning</td>
                        <td>
                            <input id="enableXAxisPan" type="checkbox" checked>
                        </td>
                        <td>
                            <input id="enableYAxisPan" type="checkbox" checked>
                        </td>
                    </tr>
                </table>
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
            this._shadowRoot.getElementById('titleSize').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('titleFontStyle').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('titleAlignment').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('titleColor').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('subtitleSize').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('subtitleFontStyle').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('subtitleAlignment').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('subtitleColor').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('scaleFormat').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('decimalPlaces').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('showLegend').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('legendLayout').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('legendAlignment').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('showTooltip').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('tooltipShared').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('showDataLabels').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('showDataMarkers').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('allowLabelOverlap').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('showXAxisLabels').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('showYAxisLabels').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('enableXAxisCrosshair').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('enableYAxisCrosshair').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('enableXAxisZoom').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('enableYAxisZoom').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('enableXAxisPan').addEventListener('change', this._submit.bind(this));
            this._shadowRoot.getElementById('enableYAxisPan').addEventListener('change', this._submit.bind(this));
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
                        titleColor: this.titleColor,
                        chartSubtitle: this.chartSubtitle,
                        subtitleSize: this.subtitleSize,
                        subtitleFontStyle: this.subtitleFontStyle,
                        subtitleAlignment: this.subtitleAlignment,
                        subtitleColor: this.subtitleColor,
                        scaleFormat: this.scaleFormat,
                        decimalPlaces: this.decimalPlaces,
                        showLegend: this.showLegend,
                        legendLayout: this.legendLayout,
                        legendAlignment: this.legendAlignment,
                        showTooltip: this.showTooltip,
                        tooltipShared: this.tooltipShared,
                        showDataLabels: this.showDataLabels,
                        showDataMarkers: this.showDataMarkers,
                        allowLabelOverlap: this.allowLabelOverlap,
                        showXAxisLabels: this.showXAxisLabels,
                        showYAxisLabels: this.showYAxisLabels,
                        enableXAxisCrosshair: this.enableXAxisCrosshair,
                        enableYAxisCrosshair: this.enableYAxisCrosshair,
                        enableXAxisZoom: this.enableXAxisZoom,
                        enableYAxisZoom: this.enableYAxisZoom,
                        enableXAxisPan: this.enableXAxisPan,
                        enableYAxisPan: this.enableYAxisPan
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

        set titleColor(value) {
            this._shadowRoot.getElementById('titleColor').value = value;
        }

        get titleColor() {
            return this._shadowRoot.getElementById('titleColor').value;
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

        set subtitleColor(value) {
            this._shadowRoot.getElementById('subtitleColor').value = value;
        }

        set scaleFormat(value) {
            this._shadowRoot.getElementById('scaleFormat').value = value;
        }

        get scaleFormat() {
            return this._shadowRoot.getElementById('scaleFormat').value;
        }

        set decimalPlaces(value) {
            this._shadowRoot.getElementById('decimalPlaces').value = value;
        }

        get decimalPlaces() {
            return this._shadowRoot.getElementById('decimalPlaces').value;
        }

        set showLegend(value) {
            this._shadowRoot.getElementById('showLegend').checked = value;
        }

        get showLegend() {
            return this._shadowRoot.getElementById('showLegend').checked;
        }

        set legendLayout(value) {
            this._shadowRoot.getElementById('legendLayout').value = value;
        }

        get legendLayout() {
            return this._shadowRoot.getElementById('legendLayout').value;
        }

        set legendAlignment(value) {
            this._shadowRoot.getElementById('legendAlignment').value = value;
        }

        get legendAlignment() {
            return this._shadowRoot.getElementById('legendAlignment').value;
        }

        set showTooltip(value) {
            this._shadowRoot.getElementById('showTooltip').checked = value;
        }

        get showTooltip() {
            return this._shadowRoot.getElementById('showTooltip').checked;
        }

        set tooltipShared(value) {
            this._shadowRoot.getElementById('tooltipShared').checked = value;
        }

        get tooltipShared() {
            return this._shadowRoot.getElementById('tooltipShared').checked;
        }

        set showDataLabels(value) {
            this._shadowRoot.getElementById('showDataLabels').checked = value;
        }

        get showDataLabels() {
            return this._shadowRoot.getElementById('showDataLabels').checked;
        }

        set showDataMarkers(value) {
            this._shadowRoot.getElementById('showDataMarkers').checked = value;
        }

        get showDataMarkers() {
            return this._shadowRoot.getElementById('showDataMarkers').checked;
        }

        set allowLabelOverlap(value) {
            this._shadowRoot.getElementById('allowLabelOverlap').checked = value;
        }

        get allowLabelOverlap() {
            return this._shadowRoot.getElementById('allowLabelOverlap').checked;
        }

        set showXAxisLabels(value) {
            this._shadowRoot.getElementById('showXAxisLabels').checked = value;
        }

        get showXAxisLabels() {
            return this._shadowRoot.getElementById('showXAxisLabels').checked;
        }

        set showYAxisLabels(value) {
            this._shadowRoot.getElementById('showYAxisLabels').checked = value;
        }

        get showYAxisLabels() {
            return this._shadowRoot.getElementById('showYAxisLabels').checked;
        }

        set enableXAxisCrosshair(value) {
            this._shadowRoot.getElementById('enableXAxisCrosshair').checked = value;
        }

        get enableXAxisCrosshair() {
            return this._shadowRoot.getElementById('enableXAxisCrosshair').checked;
        }

        set enableYAxisCrosshair(value) {
            this._shadowRoot.getElementById('enableYAxisCrosshair').checked = value;
        }

        get enableYAxisCrosshair() {
            return this._shadowRoot.getElementById('enableYAxisCrosshair').checked;
        }

        set enableXAxisZoom(value) {
            this._shadowRoot.getElementById('enableXAxisZoom').checked = value;
        }

        get enableXAxisZoom() {
            return this._shadowRoot.getElementById('enableXAxisZoom').checked;
        }

        set enableYAxisZoom(value) {
            this._shadowRoot.getElementById('enableYAxisZoom').checked = value;
        }

        get enableYAxisZoom() {
            return this._shadowRoot.getElementById('enableYAxisZoom').checked;
        }

        set enableXAxisPan(value) {
            this._shadowRoot.getElementById('enableXAxisPan').checked = value;
        }

        get enableXAxisPan() {
            return this._shadowRoot.getElementById('enableXAxisPan').checked;
        }

        set enableYAxisPan(value) {
            this._shadowRoot.getElementById('enableYAxisPan').checked = value;
        }

        get enableYAxisPan() {
            return this._shadowRoot.getElementById('enableYAxisPan').checked;
        }
    }

    customElements.define('com-sap-sample-linechartdb-aps', HighchartsWidgetAps);
})();