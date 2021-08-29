// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samplesArray = data.samples;

    // Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = samplesArray.filter(function(item){
      console.log(filteredSamples);
      return item.id == sample;
    });

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
    var firstSample = filteredSamples[0];
    console.log(firstSample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var result = resultArray[0];
    console.log(result);

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    otu_ids = firstSample.otu_ids.map(function(item){
      return "OTU " + item
    });
    console.log(otu_ids);

    otu_labels = Object.entries(firstSample.otu_labels);
    console.log(otu_labels);

    sample_values = firstSample.sample_values;
    console.log(sample_values);

    // 3. Create a variable that holds the washing frequency.
    var wfreq = result.wfreq;
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = {
      domain: { x: [0, 1],
                y: [0, 1]},
      value: wfreq,
      title: { text: "Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 9], tickwidth: 1, tickcolor: "#000082" },
        steps: [
          { range: [0, 1], color: "#fff4ed" },
          { range: [1, 2], color: "#ffddc6" },
          { range: [2, 3], color: "#ffc59f" },
          { range: [3, 4], color: "#ffae78" },
          { range: [4, 5], color: "#ff9650" },
          { range: [5, 6], color: "#ff7e29" },
          { range: [6, 7], color: "#ff6702" },
          { range: [7, 8], color: "#ed5f00" },
          { range: [8, 9], color: "#c64800" },
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 490,
        },
      },
    },
  ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 300,
      height: 225,
      margin: {t: 0, b:0}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', data, layout);
  });
}
