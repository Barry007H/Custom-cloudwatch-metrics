const AWS = require('aws-sdk');
const proxy = require('proxy-agent');

AWS.config.update({region: 'us-east-1',
  httpOptions: {
    agent: proxy('http://iss-emea-pitc-londonz.proxy.corporate.gtm.ge.com:80')
  }
});

const cw = new AWS.CloudWatch({apiVersion: '2010-08-01'});

const metricParams = {
  MetricData: [
    {
      MetricName: 'CustomMetric',
      Dimensions: [
        {
          Name: 'myCustomMetric',
          Value: 'Number Metrics'
        }
      ],
      Values: [10]
    }
  ],
  Namespace: 'AWS/ECS'
}

cw.putMetricData(metricParams, function(err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data);
  }
})