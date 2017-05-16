import {Usage} from 'storybook-usage';
import docs from 'react-storybook-addon-docgen';
import {withKnobsOptions} from '@kadira/storybook-addon-knobs';
import {addDecorator} from '@kadira/react-native-storybook';
import {withSmartKnobs} from 'storybook-addon-smart-knobs';
//The order is IMPORTANT, docs must be first!!!
addDecorator(docs);
addDecorator(withSmartKnobs);
addDecorator(Usage);
addDecorator(withKnobsOptions({
  debounce: {wait: 200, leading: true},
  timestamps: true,
}));
