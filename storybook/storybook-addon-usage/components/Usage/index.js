import React, {Component, PropTypes} from "react";
import style from "./style";

export default class Usage extends Component {

  render() {
    let {storySource} = this.props;
    const lines = storySource.split('\n');
    return (<div style={style.wrapper}>
      {lines.map(function (item, idx) {
        let tab = idx > 0 ? style.tab : null;
        const lastTab = idx === lines.length - 1;
        const styles = {
          ...tab,
          ...(lastTab ? style.lastTab : {})
        };

        return (
          <span style={styles} key={idx}>
            {item} <br/>
          </span>
        )
      })}</div>)
  }
}
