// //import all screen
// import HomeScreen from './screens/HomeScreen';
// import RecordScreen from './screens/RecordScreen';
// import NewEntryScreen from './screens/NewEntryScreen';

// import {createAppContainer,createStackNavigator} from 'react-navigation';

// const MainNavigator = createStackNavigator(
//   {
//     Home : {screen: HomeScreen},
//     Record : {screen: RecordScreen},
//     AddNew : {screen: NewEntryScreen},
//   },
//   {
//       initialRouteName: "Home"
//   }
// )

// const App = createAppContainer(MainNavigator);

// export default App;

//FROM HEREON ITS CRAP--------------------------------------------------------------------------------------=========================================================--------------------
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Button,
  AsyncStorage,
  Alert,
  TextInput
} from "react-native";
import Constants from "expo-constants";

export default class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      user_list: [],
      year_list: [],
      Fposition: "",
      Tposition: "",
      init_color: [
        "#787171",
        "#787171",
        "#787171",
        "#787171",
        "#787171",
        "#787171",
        "#787171",
        "#787171",
        "#787171",
        "#787171",
        "#787171",
        "#787171"
      ],
      edit_color: [],
      years_: [],
      color_: [],
      display_list: [],
      year_: 2019
    };
  }

  componentWillMount() {
    this.getAllColor();
  }

  //Read
  getAllColor = async () => {
    await AsyncStorage.getAllKeys()
      .then(keys => {
        return AsyncStorage.multiGet(keys)
          .then(result => {
            this.setState({
              user_list: result
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

  //Accessed all saved data to get all keys
  addNewYear() {
    var stringed_data = JSON.stringify(this.state.user_list);
    var parsed_data = JSON.parse(stringed_data);
    this.addAll(parsed_data);
  }

  addAll(keys) {
    var lengthOfData = keys.length - 1;
    for (var i = 0; i <= lengthOfData; i++) {
      var key = keys[i][0];
      this.addIndividually(key);
    }
    this.getAllColor();
    
  }

   addIndividually = async (key) => {
    await AsyncStorage.getItem(key)
      .then(selectedJsonString => {
        var selected = JSON.parse(selectedJsonString);
        //set key with this key
        selected["key"] = key;
        //set state'
        this.setState(selected);
        this.setState({ edit_color : selected.color_ });   
        var added = this.state.edit_color.concat(this.state.init_color);
        this.setState({ edit_color : added })
        this.updateColor(key);
      })
      .catch(error => {
        console.log(error);
      });
  };


  addUser = async () => {
    var c_all = {
      color_: this.state.init_color
    };
    await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(c_all));
    this.getAllColor();
  };

  //delete
  deleteColor = key => {
    Alert.alert("Delete?", ``, [
      {
        text: "Confirm",
        onPress: async () => {
          await AsyncStorage.removeItem(key)
            .then(() => {
              this.getAllColor();
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    ]);
  };

  getColor = async (key, Fpos, Tpos, col) => {
    await AsyncStorage.getItem(key)
      .then(selectedJsonString => {
        var selected = JSON.parse(selectedJsonString);
        //set key with this key
        selected["key"] = key;
        //set state'
        this.setState(selected);
        this.setState({ edit_color: selected.color_ });
        this.changeColor(key, Fpos, Tpos, col);
        console.log('done')
      })
      .catch(error => {
        console.log(error);
      });
  };

  changeColor(key, Fpos, Tpos, col) {
    var newColor = this.Looper(Fpos, Tpos, col);
    this.setState({ edit_color: newColor });
    this.updateColor(key);
  }

  Looper(Fpos, Tpos, col) {
    let F = parseInt(Fpos);
    let T = parseInt(Tpos);
    let newColor = this.state.edit_color;
    for (i = F; i <= T; i++) {
      newColor[i - 1] = col;
    }
    return newColor;
  }

  updateColor = async key => {
    var edited = {
      color_: this.state.edit_color
    };
    await AsyncStorage.mergeItem(key, JSON.stringify(edited))
      .then(() => {
        this.getAllColor();
      })
      .catch(error => {
        console.log(error);
      });
  };

  changeYear(chg) {
    let chgYear = this.state.year_;
    if (chg == "add") {
      chgYear += 1;
    }
    if (chg == "sub") {
      chgYear -= 1;
    }
    this.setState({ year_: chgYear });
  }

  clearData = async () => {
    AsyncStorage.clear();
    this.getAllColor();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 20 }}>
          <Button
            onPress={() => {
              this.addUser();
            }}
            color="#353535"
            title="Add"
          />
          <Button
            onPress={() => {
              this.deleteColor(this.state.key);
            }}
            color="#353535"
            title="Delete"
          />
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{ color: "white" }}
              placeholder="...from..."
              onChangeText={F_position => this.setState({ F_position })}
            />
            <TextInput
              style={{ color: "white" }}
              placeholder="...to..."
              onChangeText={T_position => this.setState({ T_position })}
            />
          </View>
          <Button
            onPress={() => {
              this.getColor(
                this.state.key,
                this.state.F_position,
                this.state.T_position,
                "#0ACF83"
              );
            }}
            color="#353535"
            title="Paid"
          />

          <FlatList
            data={this.state.user_list}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.setState({key : item[0].toString()})}>
                  <Text style={{ color: "white" }}> {item} </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => item[0].toString()}
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => this.changeYear("sub")}>
              <Text style={{ color: "white" }}> prev </Text>
            </TouchableOpacity>
            <Text style={{ color: "white" }}> {this.state.year_} </Text>
            <TouchableOpacity onPress={() => this.changeYear("add")}>
              <Text style={{ color: "white" }}> next </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.clearData()}>
              <Text style={{ color: "white" }}> clear </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.addNewYear()}>
              <Text style={{ color: "white" }}> Add new year </Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: "white" }}>{this.state.key} </Text>
          <Text style={{ color: "white" }}>
            {this.state.F_position} , {this.state.T_position}{" "}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#353535"
  },
  numbers: {
    flexDirection: "row"
  }
});
