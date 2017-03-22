require('es6-symbol/implement');
global.STORYBOOK_REACT_CLASSES = {};

import {AppRegistry} from 'react-native';
import {configure, getStorybookUI} from '@kadira/react-native-storybook';

import '../add-decorators';


// import stories
configure(() => {
  require('../../stories/index');
}, module);

const StorybookUI = getStorybookUI({port: 7007, host: 'localhost'});
AppRegistry.registerComponent('ReactNativeStorybookExample', () => StorybookUI);
