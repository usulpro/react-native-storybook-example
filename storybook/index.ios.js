require('es6-symbol/implement');

global.STORYBOOK_REACT_CLASSES = {};
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@kadira/react-native-storybook';
import {Usage} from 'storybook-addon-usage';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import docs from './react-storybook-addon-docgen';

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

