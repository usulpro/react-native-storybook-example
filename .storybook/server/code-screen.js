import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import {getStorybookUI} from '@kadira/react-native-storybook';

export default class CodeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      code: '',
      showStorybook: false,
    };
  }

  setStorage(code) {
    return AsyncStorage.setItem('@codeScreen:code', code).catch(console.log);
  }

  getStorage() {
    return AsyncStorage.getItem('@codeScreen:code')
      .catch(console.error);
  }

  componentWillMount() {
    this.getStorage()
      .then(code => code && this.setState({code}, this.startStorybook(code)));
  }

  onPressReset() {
    this.setStorage('');
    this.setState({code: '', showStorybook: false});
  }

  onPressBack() {
    this.setState({
      showStorybook: false,
    })
  }

  startStorybook(code) {
    const StorybookUI = getStorybookUI({
      port: 48160,
      host: 'stark-citadel-31812.herokuapp.com',
      query: 'pairedId=' + code,
      manualId: true,
      resetStorybook: true,
      secured: true,
    });

    this.storybook = StorybookUI;

    this.setState({
      showStorybook: true,
    });

  }

  onPressStart() {
    this.setStorage(this.state.code);
    this.startStorybook(this.state.code);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', alignSelf: 'stretch'}}>
        {!this.state.showStorybook &&
        <View style={{ flex: 1, paddingTop: 200, paddingLeft: 10, paddingRight: 10}}>
          <Text>
            Insert code displayed in browser
          </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(code) => this.setState({code})}
            value={this.state.code}
            autoCapitalize={'none'}
            autoCorrect={false}
            autoFocus
          />
          <View
            style={{flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'stretch', justifyContent: 'space-between'}}>
            <TouchableOpacity style={{marginRight: 20}} onPress={() => this.onPressReset()}>
              <Text style={{fontSize: 20}}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.onPressStart()}>
              <Text style={{fontSize: 20}}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
        }
        { this.state.showStorybook &&
          <View display={{flex: 1}}>
            <TouchableOpacity onPress={() => this.onPressBack()}>
              <Text style={{fontSize: 20, marginTop: 20, position: 'absolute', right: 0}}>Back</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 40 }}>
              {this.storybook()}
            </View>
          </View>
        }
      </View>
    );
  }
}
