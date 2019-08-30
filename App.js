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
      data: [],
      Fposition: "",
      Tposition: "",
      init_color: ["#787171", "#787171", "#787171", "#787171", "#787171", "#787171", "#787171", "#787171", "#787171", "#787171", "#787171", "#787171"],
      edit_color: [],
      color_:[]
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

  //Add
  addColor = async () => {
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
      .then(
        selectedJsonString => {
          var selected = JSON.parse(selectedJsonString);
          //set key with this key
          selected['key'] = key;
          //set staate'
          this.setState(selected)
          this.setState({ edit_color : selected.color_ })
          this.changeColor(key, Fpos, Tpos, col)

        }
      )
      .catch(error => {
        console.log(error);
      })
  }

  changeColor(key, Fpos, Tpos, col) {
    var newColor = this.Looper(Fpos, Tpos, col)
    this.setState({ edit_color : newColor })
    this.updateColor(key)

  }

  Looper(Fpos, Tpos, col) {
    let F = parseInt(Fpos)
    let T = parseInt(Tpos)
    let newColor = this.state.edit_color
    for (i = F; i <= T; i++ ){
      newColor[i-1] = col
    }
    return newColor;
    
  }



  updateColor = async (key) => {

      var edited = {
        color_ : this.state.edit_color
      }
      await AsyncStorage.mergeItem(key, JSON.stringify(edited))
        .then(() => {
          this.getAllColor();
        })
        .catch(error => {
          console.log(error);
        })
    
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 20 }}>
          <Button
            onPress={() => {
              this.addColor();
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
          <View style = {{ flexDirection : "row"}}>
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
                this.getColor(this.state.key, this.state.F_position, this.state.T_position,"#0ACF83");
              }}
              color="#353535"
              title="Paid"
            />
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => {
              c_all = JSON.parse(item[1]);
              return (

                <TouchableOpacity
                  style={styles.numbers}
                  onPress={() => this.setState({ key: item[0].toString() })}>
                {/* <Text>Fucking delete me</Text> */}
                  <Text style={{ color: c_all.color_[0]  }} onPress={() => this.setState({ key: item[0].toString() })}> 1 </Text>
                  <TouchableOpacity style={styles.numbers}>
                    <Text style={{ color: c_all.color_[1] }} onPress={() => this.setState({ key: item[0].toString() })}> 2 </Text>
                    <TouchableOpacity style={styles.numbers}>
                      <Text style={{ color: c_all.color_[2] }} onPress={() => this.setState({ key: item[0].toString() })}> 3 </Text>
                      <TouchableOpacity style={styles.numbers}>
                        <Text style={{ color: c_all.color_[3] }} onPress={() => this.setState({ key: item[0].toString() })}> 4 </Text>
                        <TouchableOpacity style={styles.numbers}>
                          <Text style={{ color: c_all.color_[4] }} onPress={() => this.setState({ key: item[0].toString() })}> 5 </Text>
                            <TouchableOpacity style={styles.numbers}>
                              <Text style={{ color: c_all.color_[5] }} onPress={() => this.setState({ key: item[0].toString() })}> 6 </Text>
                              <TouchableOpacity style={styles.numbers} >
                              <Text style={{ color: c_all.color_[6] }} onPress={() => this.setState({ key: item[0].toString() })}> 7 </Text>
                              <TouchableOpacity style={styles.numbers} >
                              <Text style={{ color: c_all.color_[7] }} onPress={() => this.setState({ key: item[0].toString() })}> 8 </Text>
                              <TouchableOpacity style={styles.numbers}>
                              <Text style={{ color: c_all.color_[8] }} onPress={() => this.setState({ key: item[0].toString() })}> 9 </Text>
                              <TouchableOpacity style={styles.numbers}>
                              <Text style={{ color: c_all.color_[9] }} onPress={() => this.setState({ key: item[0].toString() })}> 10 </Text>
                              <TouchableOpacity style={styles.numbers}>
                              <Text style={{ color: c_all.color_[10] }} onPress={() => this.setState({ key: item[0].toString() })}> 11 </Text>
                              <TouchableOpacity style={styles.numbers}>
                              <Text style={{ color: c_all.color_[11] }} onPress={() => this.setState({ key: item[0].toString() })}> 12 </Text>
                          </TouchableOpacity>
                          </TouchableOpacity>
                          </TouchableOpacity>
                          </TouchableOpacity>
                          </TouchableOpacity>
                          </TouchableOpacity>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => item[0].toString()}
          />
          <Text style={{ color: "white" }}>{this.state.key} </Text>
          <Text style={{ color: "white" }}>{this.state.F_position} , {this.state.T_position} </Text>
        </View>
      </View>
    );
  }
}

class editStuff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color_: ["", "", "", "", ""]
    };
    var key;
  }

  passKey(gotkey, position) {
    key = gotkey;
    this.getUpdate(position, gotkey, "#0ACF83");
    this.updatecolor(gotkey);
  }

  getColor = async key => {
    await AsyncStorage.getItem(key)
      .then(c_allstring => {
        var c_all = JSON.parse(c_allstring);
        c_all["key"] = key;
        this.setState(c_all);
      })
      .catch(error => {
        console.log(error);
      });
  };


  updatecolor = async key => {
    var c_all = {
      color_: this.state.color_
    };
    await AsyncStorage.mergeItem(key, JSON.stringify(c_all));
  };
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
