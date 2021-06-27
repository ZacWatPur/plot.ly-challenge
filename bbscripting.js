
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
  
  var samplle1 = resultsFiltered[0];
  
  var })