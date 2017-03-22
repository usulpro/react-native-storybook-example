import {Usage} from 'storybook-addon-usage';
import docs from 'react-storybook-addon-docgen';
import {withKnobs} from '@kadira/storybook-addon-knobs';
import {addDecorator} from '@kadira/react-native-storybook';
//The order is IMPORTANT, docs must be first!!!
addDecorator(docs);
addDecorator(Usage);
addDecorator(withKnobs);
