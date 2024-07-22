import Highcharts from 'highcharts';

var parseMetadata = metadata => {
    const { dimensions: dimensionsMap, mainStructureMembers: measuresMap } = metadata;
    const dimensions = [];
    for (const key in dimensionsMap) {
        const dimension = dimensionsMap[key];
        dimensions.push({ key, ...dimension });
    }
    const measures = [];
    for (const key in measuresMap) {
        const measure = measuresMap[key];
        measures.push({ key, ...measure });
    }
    return { dimensions, measures, dimensionsMap, measuresMap };
}

class HighchartsWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <div id="container" style="width: 100%; height: 100%;"></div>
        `;
        this._props = {};
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
        if ("dataBinding" in changedProperties) {
            this._updateData(changedProperties.dataBinding);
        }
    }

    _updateData(dataBinding) {
        console.log('dataBinding: ', dataBinding);
        if(!dataBinding) {
            console.error('dataBinding is undefined');
        }
        if(!dataBinding || !dataBinding.data) {
            console.error('dataBinding.data is undefined');
        }

        if (dataBinding && Array.isArray(dataBinding.data)) {
            const data = dataBinding.data.map(row => {
                console.log('row: ', row);

                if (row.dimensions_0 && row.measures_0) {
                    return {
                        dimension: row.dimensions_0.label,
                        measure: row.measures_0.raw
                    }
                }
            });

            this._renderChart(data);
        } else {
            console.error('Data is not an array: ', dataBinding && dataBinding.data);
        }
    }


    _renderChart(data) {
        console.log('data', data);
        console.log(this.shadowRoot.getElementById('container'));
        Highcharts.chart(this.shadowRoot.getElementById('container'), {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Line Chart with DataBinding'
            },
            xAxis: {
                categories: data.map(d => d.dimension)
            },
            series: [{
                name: 'Values',
                data: data.map(d => d.measure)
            }]
        });
    }
}
customElements.define('com-sap-sample-linechartdb', HighchartsWidget);
