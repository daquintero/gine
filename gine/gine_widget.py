import ipywidgets as widgets
import typing
import traitlets
from ipywidgets import AppLayout, Layout, Button
from .netlist_graph import NetlistGraph
from .utils import convert_gdsfactory_netlist


def create_expanded_button(description, button_style):
    return Button(
        description=description,
        button_style=button_style,
        layout=Layout(height="auto", width="auto"),
    )


header_button = create_expanded_button("Header", "success")
left_button = create_expanded_button("Left", "info")
center_button = create_expanded_button("Center", "warning")
right_button = create_expanded_button("Right", "info")
footer_button = create_expanded_button("Footer", "success")


def gine_widget(
    center: widgets.Widget = None,
    footer: typing.Optional[widgets.Widget] = None,
    header: typing.Optional[widgets.Widget] = None,
    left_sidebar: typing.Optional[widgets.Widget] = None,
    right_sidebar: typing.Optional[widgets.Widget] = None,
):
    """
    This widget provides interactive control and layout control for netlist visualisation.

    It includes all the buttons, layout window resizer, and visualising tools in which the netlist graph is shown.
    """
    widget = AppLayout(
        header=header,
        left_sidebar=left_sidebar,
        center=center,
        right_sidebar=right_sidebar,
        footer=footer,
    )
    return widget


def interactive_netlist_graph(gdsfactory_netlist: dict):
    """
    This function converts a GDSFactory netlist into a `gine` netlist, and then returns an interactive netlist widget.
    """
    netlist_graph_data = convert_gdsfactory_netlist(gdsfactory_netlist)
    netlist_graph_widget = NetlistGraph(
        netlist_graph_data=netlist_graph_data,
        layout=Layout(width="auto", height="auto"),
    )
    widget = gine_widget(
        center=netlist_graph_widget,
    )
    return widget
