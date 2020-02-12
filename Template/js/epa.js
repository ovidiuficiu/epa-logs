jQuery(document).ready(function () {

  let dataOrganizer = new DataOrganizer(window.epadata);
  let chartBuilder = new ChartBuilder();

  let httpMethodsData = dataOrganizer.getHTTPMethodsData();
  chartBuilder.buildBarChart('#methodsChart', httpMethodsData);

  let httpResponseCodesData = dataOrganizer.getHTTPCodesData();
  chartBuilder.buildDonutChart('#responseCodeChart', httpResponseCodesData);

  let answerSize = dataOrganizer.getAnswerSizeData();
  chartBuilder.buildScatterChart('#documentSizeChart', answerSize);

  let requestPerMinutesData = dataOrganizer.getRequestPerMinutesData();
  chartBuilder.buildTimeSeriesChart('#requestsPerMinuteChart', requestPerMinutesData);

});



