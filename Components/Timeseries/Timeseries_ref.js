import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts';
import { data } from './data/null_data';
import { schema } from './schema/null_schema';

console.log(schema);

const TimeSeries_ref = () => {
    const [chartConfig, setChartConfig] = useState({
        type: 'timeseries',
        width: '100%',
        height: '500',
        dataFormat: 'json',
        dataSource: {
            chart: {},
            //data: null,
            caption: {
                text: "Pollution Report of Yatcha Street"
            },
            subcaption: {
                text: "An industrial town"
            },
            yaxis: [{
                plot: [{
                    value: "Pollution",
                    "connectnulldata": "true",
                    type: 'line'

                }],
                title: "Pollution Concentration (in ppm)",
                min: "130",

                referenceline: [{
                    label: "Controlled Temperature",
                    value: "150"
                }]
            }]
        },
        schemaJson: schema,
        dataJson: data
    });

    const events = {
        dataplotclick: (e, a) => {
            alert(`You clicked on ${e.data.categoryLabel}`);
        },
        "referencelineclick": function (ev) {
            alert('reference line clicked')
        },
    }

    useEffect(() => {
        //  fetchDataAndSchema();
        alert('Working')
    }, []);

    const fetchDataAndSchema = () => {
        const jsonify = res => res.json();

        const dFetch = fetch('./data/null_data.json')
            .then(jsonify)
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });

        const sFetch = fetch('./schema.json')
            .then(jsonify)
            .catch(error => {
                console.error('Error fetching schema:', error);
                throw error;
            });

        Promise.all([dFetch, sFetch])
            .then(res => {
                const data = res[0];
                console.log(data)
                const schema = res[1];
                const updatedChartConfig = { ...chartConfig, dataJson: data, schemaJson: schema };
                setChartConfig(updatedChartConfig);
            })
            .catch(error => {
                console.error('Error in Promise.all:', error);
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
                    events={events}
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

export default TimeSeries_ref;