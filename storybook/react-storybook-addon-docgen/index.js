import React from 'react';
import addons from "@kadira/storybook-addons";
import {EVENT_ID} from './register';

export default (fn) => {
  let story = fn();

  console.log(story);
  console.log(story.type);
  console.log(story.type.__docgenInfo);
  const channel = addons.getChannel();
  channel.emit(EVENT_ID, {docgen: story.type.__docgenInfo});
  return fn();
}

//
//export class DocDecorator extends React.Component {
//
//  componentWillMount() {
//    let story = fn();
//
//    this.props.channel.emit('story-change', this.props.story().type.__docgenInfo);
//  }
//
//  componentWillReceiveProps(nextProps) {
//    if (nextProps.story !== this.props.story) {
//      this.props.channel.emit('story-change', nextProps.story().type.__docgenInfo);
//    }
//  }
//
//  render() {
//    let story = fn();
//
//    return this.props.story();
//  }
//}
//
//export default DocDecorator;
