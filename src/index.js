import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);

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

    static get observedAttributes() {
        return [
            'chartTitle', 'titleSize', 'titleFontStyle', 'titleAlignment', 'titleColor',                // Title properties
            'chartSubtitle', 'subtitleSize', 'subtitleFontStyle', 'subtitleAlignment', 'subtitleColor', // Subtitle properties
            'scaleFormat', 'decimalPlaces',                                                             // Number formatting
            'legendLayout', 'legendAlignment',                                                          // Legend properties 
            'tooltipShared',                                                                            // Tooltip properties
            'showDataLabels', 'showDataMarkers', 'allowLabelOverlap',                                   // Data label properties
            'showXAxisLabels', 'showYAxisLabels', 'enableXAxisCrosshair', 'enableYAxisCrosshair'        // Axis properties                
        ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this[name] = newValue;
            this._renderChart();
        }
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

        const scaleFormat = (value) =>{
            let scaledValue = value;
            let suffix = '';
            switch (this.scaleFormat) {
                case 'k':
                    scaledValue = value / 1000;
                    suffix = 'k';
                    break;
                case 'm':
                    scaledValue = value / 1000000;
                    suffix = 'm';
                    break;
                case 'b':
                    scaledValue = value / 1000000000;
                    suffix = 'b';
                    break;
                default:
                    break;
            }
            return scaledValue.toFixed(this.decimalPlaces);
        }
    
        const chartOptions = {
            chart: {
                type: 'line'
            },
            title: {
                text: this.chartTitle || '',
                align: this.titleAlignment || 'center',
                style: {
                    fontSize: this.titleSize || '20px',
                    fontWeight: this.titleFontStyle || 'bold',
                    color: this.titleColor || '#333333'
                }
            },
            subtitle: {
                text: this.chartSubtitle || '',
                align: this.subtitleAlignment || 'center',
                style: {
                    fontSize: this.subtitleSize || '12px',
                    fontStyle: this.subtitleFontStyle || 'normal',
                    color: this.subtitleColor || '#666666'
                }
            },
            legend: {
                enabled: this.showLegend || true,
                layout: this.legendLayout || 'horizontal',
                align: this.legendAlignment || 'center'
            },
            xAxis: {
                type: 'category',
                categories: categoryData,
                labels: {
                    enabled: this.showXAxisLabels || true
                },
                crosshair: this.showXAxisCrosshair || false,
                zoomEnabled: this.enableXAxisZoom || true,
                panningEnabled: this.enableXAxisPan || true
            },
            yAxis: {
                type: 'linear',
                labels: {
                    enabled: this.showYAxisLabels || true,
                },
                crosshair: this.showYAxisCrosshair || false,
                zoomEnabled: this.enableYAxisZoom || true,
                panningEnabled: this.enableYAxisPan || true,
                title: {
                    text: undefined
                }
                
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: this.showDataLabels || false,
                        allowOverlap: this.allowLabelOverlap || false,
                        formatter: function () {
                            return scaleFormat(this.y);
                        }
                    },
                    enableMouseTracking: true,
                    marker: {
                        enabled: this.showDataMarkers || false
                    }
                },
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
                    },
                    
                }
            },
            tooltip: {
                valueDecimals: 0,
                shared: this.tooltipShared || false
            },
            exporting: {
                enabled: true
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

        const label = point.category || point.options.x || point.name;
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
}

    
customElements.define('com-sap-sample-linechartdb', HighchartsWidget);
})();