import React from 'react';
import { Text } from 'react-native';
import { storiesOf } from '@kadira/react-native-storybook';
import { text, object } from '@kadira/storybook-addon-knobs';
import Welcome from './Welcome';
import Button from './Button';

const label = 'Styles';
const defaultValue = {
  backgroundColor: 'red'
};

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome/>
  ));

storiesOf('Test', module)
  .add('to asdasdasd', () => (
    <Button style={object('style', {})}/>
  ));
