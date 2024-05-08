import React from 'react';
import { StyleSheet, View } from 'react-native';
import TimeSeries from './Components/TimeSeries';
import SingleSeries from './Components/SingleSeries';

const App = () => {
  return (
    <View style={styles.container}>
      <TimeSeries />
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