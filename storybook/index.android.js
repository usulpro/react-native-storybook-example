require('es6-symbol/implement');

global.STORYBOOK_REACT_CLASSES = {};

import {configure, addDecorator} from '@kadira/react-native-storybook';
import {Usage} from 'storybook-addon-usage';
import docs from 'react-storybook-addon-docgen';
import {withKnobs} from '@kadira/storybook-addon-knobs';

//The order is IMPORTANT, docs must be first!!!
addDecorator(docs);
addDecorator(Usage);
addDecorator(withKnobs);

// import stories
configure(() => {
  require('./stories/index');
}, module);

import {AppRegistry} from 'react-native';
import {getStorybookUI} from '@kadira/react-native-storybook';

const StorybookUI = getStorybookUI({port: 7007, host: 'localhost'});
AppRegistry.registerComponent('ReactNativeStorybookExample', () => StorybookUI);
