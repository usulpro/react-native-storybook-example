import React from 'react';
import { Text } from 'react-native';
import { storiesOf, action, linkTo } from '@kadira/react-native-storybook';
import { WithNotes } from '@kadira/storybook-addon-notes';
import { text, boolean, number, object } from '@kadira/storybook-addon-knobs';
import Welcome from './Welcome';
import Button from './Button';

const label = 'Styles';
const defaultValue = {
  backgroundColor: 'red'
};

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome wee={text('wee text', '')} style={object(label, defaultValue)}/>
  ));

storiesOf('Test', module)
  .add('to asdasdasd', () => (
    <Button/>
  ));
