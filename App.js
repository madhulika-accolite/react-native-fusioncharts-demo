import React from 'react';
import { StyleSheet, View } from 'react-native';
import TimeSeries from './Components/TimeSeries';
import SingleSeries from './Components/SingleSeries';
import TimeSeries_ref from './Components/Timeseries/Timeseries_ref';

const App = () => {
  return (
    <View style={styles.container}>
      <TimeSeries_ref/>
      {/* <TimeSeries /> */}
      {/* <SingleSeries /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  }
});

export default App;