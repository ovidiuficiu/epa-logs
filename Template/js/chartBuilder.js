class ChartBuilder {

  /**
   * Build bar chart type
   *
   * @param {string} elementId
   * @param {object} data
   */
  buildBarChart(elementId, data) {
    return c3.generate({
      bindto: elementId,
      data: {
        json: [
          data
        ],
        keys: {
          value: Object.keys(data)
        },
        type: 'bar',
      }
    });
  }

  /**
   * Build donut chart type
   *
   * @param {string} elementId
   * @param {object} data
   */
  buildDonutChart(elementId, data) {
    return c3.generate({
      bindto: elementId,
      data: {
        json: [
          data
        ],
        keys: {
          value: Object.keys(data)
        },
        type: 'donut',
      },
      tooltip: {
        format: {
          value: function (value, ratio, id) {
            ratio = Math.floor(ratio * 100)
            return `${ratio}% ${value}`;
          }
        }
      },
    });
  }


  /**
   * Build scatter chart type
   *
   * @param {string} elementId
   * @param {object} data
   */
  buildScatterChart(elementId, data) {
    return c3.generate({
      bindto: elementId,
      data: {
        x: 'bytes',
        columns: data,
        type: 'scatter',
      },
      axis: {
        x: {
          label: 'Byte Size',
        },
        y: {
          label: 'Number of requests'
        }
      },
      tooltip: {
        format: {
          title: function (d) { return `${d} bytes`; },
        }
      },
      zoom: {
        enabled: true
      }
    });
  }

  /**
   * Build timeseries chart type
   *
   * @param {string} elementId
   * @param {object} data
   */
  buildTimeSeriesChart(elementId, data) {
    return c3.generate({
      bindto: elementId,
      data: {
        x: 'Datetime',
        xFormat: '%Y-%m-%d %H:%M',
        columns: data,
      },
      axis: {
        x: {
          label: 'Datetime',
          tick: {
            format: '%dth %H:%M',
            fit: true,
            count: 50,
            culling: {
              max: 10
            }
          },
          type: 'timeseries',
        },
        y: {
          label: 'Number of requests'
        }
      }
    });
  }

}