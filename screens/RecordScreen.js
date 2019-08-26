import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
import Modal from "react-native-modal";

export default class RecordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      data: []
    };
  }

  getAllUsers = async () => {
    await AsyncStorage.getAllKeys()
      .then(keys => {
        return AsyncStorage.multiGet(keys)
          .then(result => {
            this.setState({
              data: result
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentWillMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.getAllUsers();
    });
  }

  static navigationOptions = { title: "Welcome", header: null };

  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  toggleDelete = deleteKey => {
    this.setState({ key: deleteKey });
    this.toggleModal();
  };


  deleteEntry = key => {
    Alert.alert("Delete?", ``, [
      {
        text: "Confirm",
        onPress: async () => {
          await AsyncStorage.removeItem(key)
            .then(() => {
              this.toggleModal();
              this.getAllUsers();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    ]);
  };

  render() {
    return (
      <View style={styles.recordstyle}>
        <View style={{ marginTop: 100 }}>
          <Text style={{ color: "white" }}>Records Screen</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={{ color: "white" }}>BackHome</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("AddNew")}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </TouchableOpacity>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => {
              user = JSON.parse(item[1]);
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.toggleDelete(item[0].toString());
                  }}
                >
                  <Text style={{ color: "white" }}>
                    Name: {user.name} {"\n"}
                    Category: {user.category} {"\n"}
                    Duration: {user.duration}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => item[0].toString()}
          />
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{  alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <TouchableOpacity onPress={this.toggleModal}>
                <Text style={{color: 'white'}}>Hide</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.deleteEntry(this.state.key);}}>
                <Text style={{color: 'white'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recordstyle: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#353535"
  }
});
