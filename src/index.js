import Highcharts from 'highcharts';

// REQUIRES: metadata is an object
// EFFECTS:  Parses the metadata and returns the dimensions and measures
var parseMetadata = metadata => {
    // Get the dimensions and measures from the metadata
    const { dimensions: dimensionsMap, mainStructureMembers: measuresMap } = metadata;
    // Create an array to store the dimensions
    const dimensions = [];
    // Iterate over the dimensions and add them to the array
    for (const key in dimensionsMap) {
        const dimension = dimensionsMap[key];
        dimensions.push({ key, ...dimension });
    }
    // Create an array to store the measures
    const measures = [];
    // Iterate over the measures and add them to the array
    for (const key in measuresMap) {
        const measure = measuresMap[key];
        measures.push({ key, ...measure });
    }
    // Return the dimensions and measures
    return { dimensions, measures, dimensionsMap, measuresMap };
}

class HighchartsWidget extends HTMLElement {
    // EFFECTS:  Creates a new custom widget instance
    constructor() {
        super();
        // Create a shadow root
        this.attachShadow({ mode: 'open' });
        // Create a container element to display the chart
        this.shadowRoot.innerHTML = `
            <div id="container" style="width: 100%; height: 100%;"></div>
        `;

        // Event handler for click events
        this.addEventListener('click', event => {
            var event = new Event('onClick');
            this.dispatchEvent(event);
        });

        this._props = {};
    }

    // REQUIRES: width and height are integers
    // MODIFIES: this
    // EFFECTS:  Updates the custom widget dimensions
    onCustomWidgetResize(width, height) {
        this._renderChart();
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = { ...this._props, ...changedProperties };
    }

    // REQUIRES: changedProperties is an object
    // MODIFIES: this
    // EFFECTS:  Updates the custom widget properties
    onCustomWidgetAfterUpdate(changedProperties) {
        if ('title' in changedProperties) {
            this._title = changedProperties['title'];
        }
        this._renderChart();
    }

    // MODIFIES: this
    // EFFECTS:  Destroys the custom widget
    onCustomWidgetDestroy() {
    }

    // REQUIRES: dataBinding is an object
    // MODIFIES: this
    // EFFECTS:  Renders the chart
    _renderChart() {
        // Get the dataBinding
        const dataBinding = this.dataBinding;
        // Check if the dataBinding is successful
        if (!dataBinding || dataBinding.state !== 'success') {
            return;
        }

        // Get the data and metadata
        const { data, metadata } = dataBinding;
        // Parse the metadata
        const { dimensions, measures } = parseMetadata(metadata);
        // Create an array to store the category data
        const categoryData = [];
        // Create an array to store the series data
        const series =  measures.map(measure => {
            return {
                id: measure.id,
                name: measure.label,
                data: [],
                key: measure.key,
                type: 'line'
            }
        });

        // Iterate over the data and populate the category and series data
        data.forEach(row => {
            categoryData.push(dimensions.map(dimension => {
                return row[dimension.key].label;
            }).join('/'));
            series.forEach(series => {
                series.data.push(row[series.key].raw);
            });
        });

        // Create the chart options (https://api.highcharts.com/highcharts/)
        const chartOptions = {
            chart: {
                type: 'line'
            },
            title: {
                text: this._title
            },
            xAxis: { 
                type: 'category',
                categories: categoryData 
            },
            yAxis: {
                type: 'linear'
            },
            series
        }

        // Create the chart
        Highcharts.chart(this.shadowRoot.getElementById('container'), chartOptions);
    }
}
// Define the custom element
customElements.define('com-sap-sample-linechartdb', HighchartsWidget);
