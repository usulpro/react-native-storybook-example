import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import {getStorybookUI} from '@kadira/react-native-storybook';

function getInitialState() {
  return {
    data: {
      code: '',
      port: '7007',
      host: 'localhost',
      usePort: true,
      secured: false,
    },
    showStorybook: false,
  };
}

function RadioButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[{
        height: 24,
        width: 24,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
      }, props.style]}>
        {
          props.selected ?
            <View style={{
                height: 12,
                width: 12,
                backgroundColor: '#000',
              }}/>
            : null
        }
      </View>
    </TouchableOpacity>
  );
}

export default class CodeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = getInitialState();
  }

  setStorage(value) {
    return AsyncStorage.setItem('@codeScreen:data', JSON.stringify(value)).catch(console.log);
  }

  getStorage() {
    return AsyncStorage.getItem('@codeScreen:data')
      .then(data => JSON.parse(data))
      .catch(console.error);
  }

  componentWillMount() {
    this.getStorage()
      .then(data => data && this.setState({data}));
  }

  onPressReset() {
    const state = {
      ...getInitialState(),
    };

    this.setStorage(state.data);
    this.setState(state);
  }

  onPressBack() {
    this.setState({
      showStorybook: false,
    })
  }

  startStorybook({code, host, port, secured, usePort}) {
    const StorybookUI = getStorybookUI({
      port: usePort ? port : false,
      host,
      query: 'pairedId=' + code,
      manualId: true,
      resetStorybook: true,
      secured,
    });

    this.storybook = StorybookUI;

    this.setState({
      showStorybook: true,
    });

  }

  setValue(name, value) {
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      }
    });
  }

  onPressStart() {
    this.setStorage(this.state.data);
    this.startStorybook(this.state.data);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', alignSelf: 'stretch'}}>
        {!this.state.showStorybook &&
        <View style={{ flex: 1, paddingTop: 200, paddingLeft: 10, paddingRight: 10}}>
          <Text>
            Host
          </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20}}
            onChangeText={(host) => this.setValue('host', host)}
            value={this.state.data.host}
            autoCapitalize={'none'}
            autoCorrect={false}
            autoFocus
          />
          <View style={{ height: 40}}>
            <RadioButton selected={this.state.data.usePort} onPress={() => this.setValue('usePort', !this.state.data.usePort)}/>
            <Text style={{ marginLeft: 28, marginTop: 3}}>Use port</Text>
          </View>
          { this.state.data.usePort &&
            <View>
              <Text>
                Port
              </Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20}}
                onChangeText={(port) => this.setValue('port', port)}
                value={this.state.data.port}
                autoCapitalize={'none'}
                autoCorrect={false}
                autoFocus
              />
            </View>
          }
          <Text>
            Code displayed in browser
          </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20}}
            onChangeText={(code) => this.setValue('code', code)}
            value={this.state.data.code}
            autoCapitalize={'none'}
            autoCorrect={false}
            autoFocus
          />
          <View>
            <RadioButton selected={this.state.data.secured} onPress={() => this.setValue('secured', !this.state.data.secured)}/>
            <Text style={{ marginLeft: 28, marginTop: 3}}>Secured (Use Https/Wss)</Text>
          </View>
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
