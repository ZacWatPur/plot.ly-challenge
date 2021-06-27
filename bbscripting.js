
// Open the data

function init() {  
  // Referencing the dropdown
    
    var dropSelect = d3.select("#selDataset");
    
    d3.json("samples.json").then((datat) => {
      var sampleName = data.names;
      
      sampleName.forEach((sample) => {
         dropSelect.append("option").text(sample).property("value", sample);
      });
      
    // Build initial plots with first set of data
         
    var samp1 = sampleName[0];
    buildCharts(samp1);
    buildMetadata(samp1);
    }); 
 }


// Initialize the dashboard
init();

function newOption(newSample) {
  // Grabbing new data for each new sample
  buildCharts(newSample);
  buildMetadata(newSample);  
}

// Build the demographics panel

function buildMetadata(sample) {
   d3.json("samples.json").then((data) => {
     var meta = data.metadata;
     // Filter data for requested sample Number
     
     var arrResult = meta.filter(dampleObj => sampleOb.i == sample);
     var result = arrResult[0];
     // Using d3 to slelct corresponding panel
     var panel = d3.select("#sample-metadata");
     
     // clearing existing meadata
     panel.html("");
     
     // Adding key and value pair to panel
     Object.entries(result).forEach(([key, value]) => {
       panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
     });
  });
}

// buildCharts function creation
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
  var cSamples = data.samples;
  console.log(cSamples);
  var resultsFiltered = cSamples.filter(sampleName => sampleName.id == sample)
  
  var sample1 = resultsFiltered[0];
  
  // variables to hold ids, labesl, and values
  var otu_ids = sample1.otu_ids;
  var otu_labels = sample1.otu_labels;
  var sampleValues = sample1.sampleValues;
  
  // ytics for the bar charts
  var ytics = otu_ids.slice(0,10).map(value => `OTU ${value}`).reverse();
  
  // trace for bar chart
  var barData = [{
    x: sampleValues.slice(0,10).reverse(),
    y: ytics,
    text: out_labesl.slice(0,10).reverse(),
    text: "bar",
    orientation: "h"
  }];
  
  // Bar chart layout
  var barLay = {
    title: "Top 10 Bacteria Cultures Found:",
    margin:{t:25,1:125}
  };
  
  // Plotly to plot data
  
  Plotly.newPlot("bar", barData, barLay0);
  
  // Bubble Chart section
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
  }
  ];
  
  })
  })