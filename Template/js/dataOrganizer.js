/**
 * Class used to organize and parse data as needed for various charts
 */
class DataOrganizer {
  constructor(data) {
    this.data = data
  }

  /**
   * Get http methods dataset for chart
   *
   * @return {Object} httpMethods
   */
  getHTTPMethodsData() {
    let httpMethods = {};
    this.data.forEach(element => {
      if (element.request.method in httpMethods) {
        httpMethods[element.request.method]++;
      } else {
        httpMethods[element.request.method] = 1;
      }
    });

    return httpMethods;
  }

  /**
   * Get http codes dataset for chart
   *
   * @return {Object} httpCodes
   */
  getHTTPCodesData() {
    let httpCodes = {};
    this.data.forEach(element => {
      if (element['response_code'] in httpCodes) {
        httpCodes[element['response_code']]++;
      } else {
        httpCodes[element['response_code']] = 1;
      }
    });

    return httpCodes;
  }

   /**
   * Get response size dataset
   *
   * @return {array}
   */
  getAnswerSizeData(data) {
    let answerSizeData = {};
    this.data.forEach((element, id) => {
      if (element['response_code'] == 200 && element['document_size'] < 1000) {
        if (element['document_size'] in answerSizeData) {
          answerSizeData[element['document_size']]++;
        } else {
          answerSizeData[element['document_size']] = 1;
        }
      }
    });

    let requestSizes = Object.keys(answerSizeData);
    requestSizes.unshift('bytes');

    let requestSizesCounts = Object.values(answerSizeData);
    requestSizesCounts.unshift('Request count');

    return [requestSizes, requestSizesCounts];
  }

  /**
   * Get request per minutes dataset
   *
   * @return {array}
   */
  getRequestPerMinutesData() {
    let requestsPerMinutesData = [];
    this.data.forEach(element => {
      let datetime = `1995-08-${element.datetime.day} ${element.datetime.hour}:${element.datetime.minute}`;
      if (datetime in requestsPerMinutesData) {
        requestsPerMinutesData[datetime]++
      } else {
        requestsPerMinutesData[datetime] = 1;
      }
    });

    let requestDatetime = Object.keys(requestsPerMinutesData);
    requestDatetime.unshift('Datetime');

    let requestCount = Object.values(requestsPerMinutesData);
    requestCount.unshift('Request count');

    return [requestDatetime, requestCount];
  }
}