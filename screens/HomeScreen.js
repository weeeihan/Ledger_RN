import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {

  //To hide navigation bar
  static navigationOptions = { title: 'Welcome', header: null };

  render() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Record')}>
          <Text style={{color: 'white'}}>../Records/</Text>
      </TouchableOpacity>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center',
  },
});