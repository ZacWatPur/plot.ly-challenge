
// Open the data

function init() {  
  // Referencing the dropdown
    
  var menu = d3.select("#selDataset");
    
  d3.json("static/samples.json").then((data) => {
    var sampleName = data.names;
      
    sampleName.forEach((sample) => {
       menu.append("option").text(sample).property("value", sample);
    });
      
  // Build initial plots with first set of data
         
  var samp1 = sampleName[0];
  buildCharts(samp1);
  buildMetadata(samp1);
  }); 
}


// Initialize the dashboard
init();


// Build the demographics panel

function optionChanged(newSample) {
  // Grabbing new data for each new sample
  buildMetadata(newSample);
  buildCharts(newSample);  
};

function buildMetadata(newSample) {
  d3.json("static/samples.json").then((data) => {
    var meta = data.metadata;
    var arrResult = meta.filter(sampleObj => sampleObj.id == newSample);
    var result = arrResult[0];
    var panel = d3.select("#sample-metadata");
    
    // clearing existing meadata
    panel.html("");
     
    // Adding key and value pair to panel
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
};

// buildCharts function creation
function buildCharts(newSample) {
  d3.json("static/samples.json").then((data) => {
  
  var meta = data.metadata;
  console.log(meta);
  
  var resultsFiltered = meta.filter(sampleName => sampleName.id == newSample);
  var sample1 = resultsFiltered[0];

  var cSamples = parseFloat(sample1.wfreq);
  var cSelected = data.samples;  

  
  // variables to hold ids, labesl, and values
  var otu_ids = cSelected.otu_ids;
  var otu_labels = cSelected.otu_labels;
  var sampleValues = cSelected.sample_values;
  
  // ytics for the bar charts
  var yTenOtu = otu_ids.slice(0, 10).reverse();
  var ytics = yTenOtu.map(OTU => ("OTU " + OTU + " -"));
  
  // trace for bar chart
  var barData = [{
    x: sampleValues.slice(0,10).reverse(),
    y: ytics,
    text: out_labels.reverse(),
    text: "bar",
    orientation: "h"
  }];
  
  // Bar chart layout
  var barLay = {
    title: "Top 10 Bacteria Cultures Found:",
    margin:{t:25,1:125}
  };
  
  // Plotly to plot data
  
  Plotly.newPlot("bar", barData, barLay);
  
// Bubble Chart section
  // Data for bubble graph
  var bubbleData = [{
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: "markers",
    marker: {
      color: otu_ids,
      size: sample_values,
      colorscale: 'Earth', 
    }
  }];
  
  // Bubble layout
  var bubbleLay = {
    title: "Bacteria Cultures Per Sample",
    xaxis:{title: "OTU ID"},
    margin:{t:10,l:10},
    hovermode: "closest"
  };
  
  // Plotly to plot the data with the layout.
  Plotly.newPlot("bubble", bubbleData, bubbleLay,);

  // Variable for filtered metadata
  var metadata = data.metadata;
  // Create a variable that holds the first sample in the array.
  var filterMetadata = metadata.filter(sampleObject => sampleObject.id == sample);

  // 2. Create a variable that holds the first sample in the metadata array.
   var metadataResult = filterMetadata[0];
  // 3. Create a variable that holds the washing frequency.
  var washfreq = metadataResult.wfreq; 
  // 4. Create the trace for the gauge chart.
  var gaugeData = [{
    title: "Bell Button Washing Frequency",
    value: washfreq,
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      bar: {color: "black"},
      axis: {visible: true, range: [0, 10]},
      steps: [
        {range: [0, 2], color: "lavender"},
        {range: [2, 4], color: "thistle"},
        {range: [4, 6], color: "lightsteelblue"},
        {range: [6, 8], color: "lightblue"},
        {range: [8, 10], color: "yellowgreen"}
      ]}
        
  }];
  
  
  // 5. Create the layout for the gauge chart.
  var gaugeLayout = { 
    margin: {t:10,b:0,l:15,r:25}
  };

  // 6. Use Plotly to plot the gauge data and layout.
  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });


}

