import { DOMWidgetModel, DOMWidgetView } from '@jupyter-widgets/base';
import {netlistGraph} from "./NetlistGraph";

// See example.py for the kernel counterpart to this file.

// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be serialized.

console.log("NetworkLattice example file");

export class NetlistGraphModel extends DOMWidgetModel {
    defaults() {
      return {
        ...super.defaults(),
        _model_name : 'NetlistGraphModel',
        _view_name : 'NetlistGraphView',
        _model_module : 'gine',
        _view_module : 'gine',
        _model_module_version : "0.0.8",
        _view_module_version : "0.0.8",
        value : {"nodes": [], "links": []},
        netlist_graph_data : {"nodes": [], "links": []}
      };
    }
  }

export class NetlistGraphView extends DOMWidgetView {
    /*
    This class controls the functions that generate the view in the Jupyter notebook. It handles for example the refresh of the cell view, how the graph handles changing the python data, and the initial rendering.
     */
    render() {
        console.log("Rendering network lattice");
        console.log(this.model.get("netlist_graph_data"))
        console.log(this.model.get("value"))

        let netlistGraphData = this.model.get("netlist_graph_data");

        // Create SVG of the D3 Graph Element
        netlistGraph.create(this, netlistGraphData);

        this.model.on("change:netlist_graph_data", this.value_changed, this);

        window.dom = this.el;
        // Observe and act on future changes to the value attribute
        // this.model.on('change:value', this.value_changed, this);
        console.log("Built network lattice");
    }

    value_changed() {
        let netlistGraphData = this.model.get("netlist_graph_data");
        netlistGraph.value_changed(this, netlistGraphData);
        console.log("Changed network lattice");
    }
}

// module.exports = {
//     NetlistGraphModel: NetlistGraphModel,
//     NetlistGraphView: NetlistGraphView
// }