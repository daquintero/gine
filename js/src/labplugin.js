import {HelloModel, HelloView, NetlistGraphModel, NetlistGraphView, version} from './index';
import {IJupyterWidgetRegistry} from '@jupyter-widgets/base';

export const ginePlugin = {
  id: 'gine:plugin',
  requires: [IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'gine',
          version: version,
          exports: { 
            HelloModel,
            HelloView,
            NetlistGraphModel,
            NetlistGraphView 
          }
      });
  },
  autoStart: true
};

export default ginePlugin;
