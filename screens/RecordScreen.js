import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Button, 
         FlatList, 
         StyleSheet, 
         Text, 
         View, 
         Alert, 
         TouchableOpacity, 
         TextInput,
         AsyncStorage } from 'react-native';

export default class RecordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    }
    
    getUsers = async() => {

        await AsyncStorage.getAllKeys()
        .then(keys => {
            return AsyncStorage.multiGet(keys)
                .then(result => { 
                    this.setState({
                        data: result.sort()
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        })
        .catch(error => {
            console.log(error);
        })
    }

    componentWillMount() {
        const { navigation } = this.props;
        navigation.addListener("willFocus",()=>{
            this.getUsers();
        })
    }


    static navigationOptions = { title: 'Welcome', header: null };

    render() {
      return (
        <View style={styles.recordstyle}>
          <View style={{marginTop: 100}}>
          <Text style={{color: 'white'}}>Records Screen</Text>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={{color: 'white'}}>BackHome</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddNew')}>
                    <Text style={{color:'white'}}>Add</Text>
            </TouchableOpacity> 
            <FlatList
                data={this.state.data}
                renderItem = {({item}) => {
                    user = JSON.parse(item[1]);
                    return(
                        <Text style={{color: 'white'}}>
                            Name: {user.name} {"\n"}  
                            Category: {user.category} {"\n"}  
                            Duration: {user.duration}

                        </Text>
                    )
                }}
                keyExtractor= { (item, index) =>
                    item[0].toString()
                }/>
                </View>

        </View>
      );
    }
}

  const styles = StyleSheet.create({
    recordstyle: {
     
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#353535',
     
    },
  });
  