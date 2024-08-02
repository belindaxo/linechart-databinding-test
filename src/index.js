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
        this._selectedPoint = null;
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
                type: 'line',
                events: {
                    click: function (event) {
                        this._handleBackgroundClick(event);
                    }.bind(this)
                }
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
                    point: {
                        events: {
                            select: function (event) {
                                this._handlePointClick(event);
                            }.bind(this),
                            unselect: function (event) {
                                this._handlePointClick(event);
                            }.bind(this)
                        }
                    }
                }
            },
            series
        }


        this._chart = Highcharts.chart(this.shadowRoot.getElementById('container'), chartOptions);
    }

    _handlePointClick(event) {
        console.log('Event object:', event);

        const point = event.target;
        if (!point) {
            console.error('Point is undefined');
            return;
        }

        console.log('Point object:', point); 

        const dataBinding = this.dataBinding;
        const metadata = dataBinding.metadata;
        const { dimensions } = parseMetadata(metadata);
        const [dimension] = dimensions;

        const label = point.category;
        const key = dimension.key;
        const dimensionId = dimension.id;
        const selectedItem = dataBinding.data.find(item => item[key].label === label);
 
        console.log('Selected item:', selectedItem); 

        const linkedAnalysis = this.dataBindings.getDataBinding('dataBinding').getLinkedAnalysis();

        if (event.type === 'select') {
            if (selectedItem) {
                const selection = {};
                selection[dimensionId] = selectedItem[key].id;
                console.log('Setting filter with selection:', selection); // Log the filter selection
                linkedAnalysis.setFilters(selection);
                this._selectedPoint = point;
            }
        } else if (event.type === 'unselect') {
            console.log('Removing filters'); // Log when filters are removed
            linkedAnalysis.removeFilters();
            this._selectedPoint = null;
        }
    }

    _handleBackgroundClick(event) {
        if (!event.target || event.target !== this._chart.container) {
            return;
        }

        if (this._selectedPoint) {
            const linkedAnalysis = this.dataBindings.getDataBinding('dataBinding').getLinkedAnalysis();
            console.log('Removing filters'); // Log when filters are removed
            linkedAnalysis.removeFilters();
            this._selectedPoint.select(false);
            this._selectedPoint = null;
        }
    }
}

    
customElements.define('com-sap-sample-linechartdb', HighchartsWidget);
})();