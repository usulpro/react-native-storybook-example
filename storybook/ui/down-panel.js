import React, { Component } from 'react';
import style from './style';

class DownPanel extends Component {
  renderPanel(name) {
    const panel = this.props.panels[name];
    return <div key={name} style={{ flex: 1, display: 'flex' }}>{panel.render()}</div>;
  }

  renderEmpty() {
    return (
      <div style={style.empty}>
        no panels available
      </div>
    );
  }

  render() {

    if (!this.props.panels || !Object.keys(this.props.panels).length) {
      return this.renderEmpty();
    }

    return (
      <div style={style.wrapper}>
          <div>
            <div style={style.content}>{this.renderPanel('storybook-addon-docgen/doc-panel')}</div>
          </div>
            <div style={{ display: 'flex', border: '1px solid #f7f7f7'}}></div>
          <div>
            <div style={style.content}>{this.renderPanel('kadirahq/storybook-addon-knobs')}</div>
            <div style={style.content}>{this.renderPanel('storybook-addon-usage/usage-panel')}</div>
          </div>
      </div>
    );
  }
}

DownPanel.propTypes = {
  panels: React.PropTypes.object,
  onPanelSelect: React.PropTypes.func,
  selectedPanel: React.PropTypes.string,
};

export default DownPanel;
