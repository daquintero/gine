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
    # widget_width = traitlets.Integer().tag(sync=True)
    # widget_height = traitlets.Integer().tag(sync=True)
    netlist_graph_data = traitlets.Dict().tag(sync=True)
    value = netlist_graph_data
