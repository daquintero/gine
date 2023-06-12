import ipywidgets as widgets
import traitlets
from ._version import NPM_PACKAGE_RANGE
from .utils import convert_gdsfactory_netlist


@widgets.register
class NetlistGraph(widgets.DOMWidget):
    """
    Widget element that contains the javascript interactive netlist.
    """

    _view_name = traitlets.Unicode("NetlistGraphView").tag(sync=True)
    _model_name = traitlets.Unicode("NetlistGraphModel").tag(sync=True)
    _view_module = traitlets.Unicode("gine").tag(sync=True)
    _model_module = traitlets.Unicode("gine").tag(sync=True)
    _view_module_version = traitlets.Unicode(NPM_PACKAGE_RANGE).tag(sync=True)
    _model_module_version = traitlets.Unicode(NPM_PACKAGE_RANGE).tag(sync=True)

    # Widget specific property.
    # Widget properties are defined as traitlets. Any property tagged with `sync=True`
    # is automatically synced to the frontend *any* time it changes in Python.
    # It is synced back to Python from the frontend *any* time the model is touched.
    netlist_graph_data = traitlets.Dict().tag(sync=True)
    value = netlist_graph_data


def interactive_netlist_graph(gdsfactory_netlist: dict):
    """
    This function converts a GDSFactory netlist into a `gine` netlist, and then returns an interactive netlist widget.
    """
    netlist_graph_data = convert_gdsfactory_netlist(gdsfactory_netlist)
    netlist_graph_widget = NetlistGraph(netlist_graph_data=netlist_graph_data)
    return netlist_graph_widget
