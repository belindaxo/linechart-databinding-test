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
(function () {
class HighchartsWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <div id="container" style="width: 100%; height: 100%;"></div>
        `;
    }

    onCustomWidgetResize(width, height) {
        this._renderChart();
    }

    onCustomWidgetAfterUpdate(changedProperties) {
        this._renderChart();
    }

    onCustomWidgetDestroy() {
    }

    _renderChart() {
        const dataBinding = this.dataBinding;
        if (!dataBinding || dataBinding.state !== 'success') {
            return;
        }

        const { data, metadata } = dataBinding;
        const { dimensions, measures } = parseMetadata(metadata);
        
        const categoryData = [];

        const series =  measures.map(measure => {
            return {
                id: measure.id,
                name: measure.label,
                data: [],
                key: measure.key,
                type: 'line'
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

        const chartOptions = {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Line Chart with DataBinding'
            },
            xAxis: { 
                type: 'category',
                categories: categoryData 
            },
            yAxis: {
                type: 'linear'
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    events: {
                        click: function (event) {
                            console.log(event.point);
                            if (dataBinding.getLinkedAnalysis().isDataPointSelectionEnabled()) {
                                const dimensionFilters = [];
                                const measuresFilters = [];
                                for (const key in event.point) {
                                    const value = event.point[key];
                                    if (key === 'category') {
                                        const dimensions = value.split('/');
                                        dimensions.forEach((dimension, index) => {
                                            const dimensionKey = metadata.dimensions[index].key;
                                            dimensionFilters.push({
                                                key: dimensionKey,
                                                value: dimension
                                            });
                                        });
                                    } else {
                                        measuresFilters.push({
                                            key,
                                            value
                                        });
                                    }
                                }
                                dataBinding.getLinkedAnalysis().setDataPointSelection({
                                    dimensions: dimensionFilters,
                                    measures: measuresFilters
                                });
                            }
                        }
                    }
                }
            },
            series
        }


        Highcharts.chart(this.shadowRoot.getElementById('container'), chartOptions);
    }
}
customElements.define('com-sap-sample-linechartdb', HighchartsWidget);
})();