import {HelloModel, HelloView, version} from './index';
import {IJupyterWidgetRegistry} from '@jupyter-widgets/base';

export const helloWidgetPlugin = {
  id: 'gine:plugin',
  requires: [IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'gine',
          version: version,
          exports: { HelloModel, HelloView }
      });
  },
  autoStart: true
};

export default helloWidgetPlugin;
