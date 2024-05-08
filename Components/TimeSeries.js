import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts';

const TimeSeries = () => {
  const [chartConfig, setChartConfig] = useState({
    type: 'timeseries',
    width: '100%',
    height: '500',
    dataFormat: 'json',
    dataSource: {
      data: null,
      caption: {
        text: 'Sales Analysis'
      },
      subcaption: {
        text: 'Grocery'
      },
      yAxis: [
        {
          plot: {
            value: 'Grocery Sales Value',
            type: 'line'
          },
          format: {
            prefix: '$'
          },
          title: 'Sale Value'
        }
      ]
    },
    schemaJson: null,
    dataJson: null
  });

  useEffect(() => {
    fetchDataAndSchema();
  }, []);

  const fetchDataAndSchema = () => {
    const jsonify = res => res.json();
    const dFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
    ).then(jsonify);
    const sFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
    ).then(jsonify);
    Promise.all([dFetch, sFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const updatedChartConfig = {...chartConfig, dataJson: data, schemaJson: schema};
      setChartConfig(updatedChartConfig);
    });
  };

  const modules = ['timeseries'];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        FusionCharts Integration with React Native
      </Text>
      <View style={styles.chartContainer}>
        <ReactNativeFusionCharts
          chartConfig={chartConfig}
          modules={modules}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
});

export default TimeSeries;