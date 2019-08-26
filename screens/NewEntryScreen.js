import React from 'react';
import { StyleSheet, 
         Text, 
         View,
         AsyncStorage, 
         Keyboard,
         KeyboardAvoidingView,
         Alert, 
         ScrollView, 
         TextInput,
         TouchableWithoutFeedback,
         TouchableOpacity } from 'react-native';

export default class NewEntryScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            category: "",
            duration: ""
        };
    }

    saveData = async () => {
        if (this.state.name !== "" && 
            this.state.duration !== "" &&
            this.state.category !== "" 
            ) {
            
            var user = {
                name: this.state.name,
                duration: this.state.duration,
                category: this.state.category
            };

        await AsyncStorage.setItem(Date.now().toString(),JSON.stringify(user))
            .then(() => {
                this.props.navigation.goBack();
            })
            .catch(error => {
                console.log(error);
            });
        }
        else {
            Alert.alert('Cannot be blank');
        }
    }

static navigationOptions = { title: 'Welcome', header: null };
 
render() {
    return (
        
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss;
            }}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <View style={styles.container}>
                <Text style={{color: 'white', fontSize: 20}}>Please key in name</Text>
                <TextInput
                    style = {{ color: 'white'}}
                    placeholder = "..." 
                    onChangeText = {name => this.setState({ name })} />
                <Text style={{color: 'white', fontSize: 20}}>Please key in category</Text>
                <TextInput
                    style = {{ color: 'white'}}
                    placeholder = "..." 
                    onChangeText = {category => this.setState({ category })} />
                <Text style={{color: 'white', fontSize: 20}}>Please key in duration</Text>
                <TextInput
                    style = {{ color: 'white'}}
                    placeholder = "..."
                    onChangeText = {duration => this.setState({ duration })}/>
                <TouchableOpacity
                    onPress={() => {this.saveData();}}>
                    <Text style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>Save!</Text>
                </TouchableOpacity>
            </View>
            </KeyboardAvoidingView>
        
        </TouchableWithoutFeedback>
       
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