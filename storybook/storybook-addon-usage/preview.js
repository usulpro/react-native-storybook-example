import React from 'react';
import addons from "@kadira/storybook-addons";
import {EVENT_ID} from "./";
import _ from "lodash";

const getSpaces = depth => _.repeat('\u00a0', depth * 4);

function getStringRepresentation(story, depth=1) {

  const name = story.type.name || story.type.displayName;


  const props = _.toPairs(story.props).filter(prop => {
    return story.type.defaultProps[prop[0]] !== prop[1]
  });

  if (props.length === 0) {
    return `${getSpaces(depth-1)}<${name}/>\n`;
  }

  let first = `${getSpaces(depth-1)}<${name}`;

  if (props.length === 1 && props[0][0] === 'children') {
    first += '>\n';
  } else {
    first += `\n`;
  }

  props.forEach((p) => {
    let value;

    if (p[0] === 'children') {
      //do nothing
    } else {
      if (typeof p[1] === 'function') {
        value = p[1].name ? `{${p[1].name}}` : '{anonymous}';
      } else if (typeof p[1] === 'string') {
        value = `${JSON.stringify(p[1])}`;
      }
      else if (_.isObject(p[1]) && !_.isArray(p[1])) {
        value = `{${objToString(p[1])}}`;
      }
      else {
        value = `{${JSON.stringify(p[1])}}`;
      }

      first += `${_.repeat('\u00a0', depth * 4)}${p[0]}=${value}\n`;
    }
  });

  if (story.props.children) {
    if (story.props.length > 1) {
      first += `${getSpaces(depth-1)}>\n`;
    }

    React.Children.map(story.props.children, story => {
      console.log(story);
      first += _.isObject(story)
        ? getStringRepresentation(story, depth + 1)
        : getSpaces(depth) + story + '\n';
    });

    first += `${getSpaces(depth-1)}</${name}>\n`;
  } else {
    first += getSpaces(depth-1) + "/>\n";
  }

  return first;
}

export function Usage(fn) {
  let story = fn();
  const first = getStringRepresentation(story, 1);
  const channel = addons.getChannel();
  channel.emit(EVENT_ID, {storybook: first});
  return fn();
}

function objToString(obj) {

  var str = '{';
  for(let p in obj){
    if (obj.hasOwnProperty(p)) {
      let value;
      if(_.isObject(obj[p]) && !_.isArray(obj[p])) {
        value = objToString(obj[p]);
      }else{
        value = JSON.stringify(obj[p]);
      }
      str += p + ': ' + value;
    }
  }
  str += '}';
  return str;
}
