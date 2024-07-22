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
        // Render the Highcharts chart
        this._renderChart();
    }
    _renderChart() {
        const dataBinding = this.dataBinding;
        if (!dataBinding || dataBinding.state !== 'success') { return; }

        const { data, metadata } = dataBinding;
        const {dimensions, measures } = parseMetadata(metadata);
        const categoryData = [];
        const series = measures.map(measure => {
            return {
                name: measure.label,
                id: measure.id,
                data: [],
                key: measure.key
            }
        });

        data.forEach(row => {
            categoryData.push(dimensions.map(dimension => {
                return row[dimension.key].label;
            }).join('/'));
            series.forEach(series => {
                series.data.push(row[series.key].raw);
            });
        });
        
        Highcharts.chart(this.shadowRoot.getElementById('container'), {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Line Chart with DataBinding'
            },
            xAxis: {
                categories: categoryData
            },
            series: series
        });
    }
}
customElements.define('com-sap-sample-linechartdb', HighchartsWidget);
