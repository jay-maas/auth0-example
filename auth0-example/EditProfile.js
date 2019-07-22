import React from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import { editProfile } from "./store";

class EditProfile extends React.Component {
  static navigationOptions = {
    title: "Edit Your Profile",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  state = {
    orgName: this.props.orgName,
    orgLocation: '',
    orgEmail: ''
  }

  handleChange = (type, value) => {
    this.setState({
      [type]: value
    })
  }

  handleSubmit = () => {
    editProfile(this.state, this.props.navigation)
  }

  render() {
    console.log(this.props.error)
    return (
      <View style={styles.container}>
        <View style={styles.headerTextContainer}>
          <Text>Hello {this.props.orgName}</Text>
          <View style={{width: '80%', flexDirection: 'row'}}>{this.props.error !== null && <Text style={{flexWrap: 'wrap'}}>{this.props.error}</Text>}</View>
        </View>
        <View style={styles.inputFormContainer}>
          <View style={styles.inputForm}>
            <TextInput
              enablesReturnKeyAutomatically
              onChangeText={value => this.handleChange('orgName', value)}
              returnKeyType='next'
              autoCorrect={false}
              style={{ height: 40 }}
              placeholder="Enter Name"
              value={this.state.orgName}
              onSubmitEditing={() => this.locationInput.focus()}
            />
          </View>
          <View style={styles.inputForm}>
            <TextInput
              enablesReturnKeyAutomatically
              onChangeText={value => this.handleChange('orgLocation', value)}
              returnKeyType='next'
              autoCorrect={false}
              style={{ height: 40 }}
              placeholder="Enter Location"
              onSubmitEditing={() => this.emailInput.focus()}
              ref={input => this.locationInput = input}
            />
          </View>
          <View style={styles.inputForm}>
            <TextInput
              enablesReturnKeyAutomatically
              onChangeText={value => this.handleChange('orgEmail', value)}
              style={{ height: 40 }}
              autoCorrect={false}
              placeholder="Enter email"
              returnKeyType='go'
              ref={input => this.emailInput = input}
            />
          </View>
          </View>
        <TouchableOpacity
          onPress={this.handleSubmit}
          title="Login"
          style={styles.touchable}
        >
          <View style={styles.touchableButton}>
            <Text>Update Profile</Text>
          </View>
        </TouchableOpacity>
        <View  style={styles.keyboardSpace} />
      </View>
    );
  }
}

const mapState = state => ({
  orgName: state.orgName,
  error: state.error
})

export default connect(mapState)(EditProfile)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(189, 195, 199, 1)",
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFormContainer: {
    flex: 2,
    width: '75%',
  },
  inputForm: {
    backgroundColor: 'white',
    height: 25,
    margin: '5%',
    justifyContent: 'center'
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButton: {
    backgroundColor: "#f4511e",
    width: 100,
    height: 50,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardSpace: {
    flex: 3
  }
});