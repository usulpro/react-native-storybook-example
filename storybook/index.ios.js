require('es6-symbol/implement');

global.STORYBOOK_REACT_CLASSES = {};

import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@kadira/react-native-storybook';
import {Usage} from './addons/storybook-addon-usage';
import docs from './addons/react-storybook-addon-docgen';
import {withKnobs} from '@kadira/storybook-addon-knobs';

//The order is IMPORTANT, docs must be first!!!
addDecorator(docs);
addDecorator(Usage);
addDecorator(withKnobs);

// import stories
configure(() => {
  require('./stories');
}, module);

const StorybookUI = getStorybookUI({port: 7007, host: 'localhost'});
AppRegistry.registerComponent('ReactNativeStorybookExample', () => StorybookUI);

