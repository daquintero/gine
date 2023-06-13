# ---
# jupyter:
#   jupytext:
#     text_representation:
#       extension: .py
#       format_name: light
#       format_version: '1.5'
#       jupytext_version: 1.14.5
#   kernelspec:
#     display_name: Python 3 (ipykernel)
#     language: python
#     name: python3
# ---

# # Get Started with `gine`

# ## GDSFactory Integration

import gdsfactory as gf
import gine

# Extract a component netlist:

mzi = gf.components.mzi2x2_2x2()

mzi

# Example conversion to a `gine` format

gdsfactory_netlist = mzi.get_netlist()
# gine.convert_gdsfactory_netlist(gdsfactory_netlist)

# ## Create Interactive Widget

gine.interactive_netlist_graph(gdsfactory_netlist)

# ## Example Multi-Component Netlist

example_component_lattice = [
    [gf.components.mzi2x2_2x2(), 0, gf.components.mzi2x2_2x2()],
    [0, gf.components.mzi2x2_2x2(), 0],
    [gf.components.mzi2x2_2x2(), 0, gf.components.mzi2x2_2x2()],
]
c = gf.components.generic_component_lattice(example_component_lattice)
c

gcl_netlist = c.get_netlist()
gine.interactive_netlist_graph(gcl_netlist)


