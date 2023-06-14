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
import sax
import jax
import jax.example_libraries.optimizers as opt
import jax.numpy as jnp
import gine

# Extract a component netlist:

mzi = gf.components.mzi2x2_2x2()

mzi

# Example conversion to a `gine` format

gdsfactory_netlist = mzi.get_netlist()
# gine.convert_gdsfactory_netlist(gdsfactory_netlist)

# +
def mmi2x2():
    S = {
        ("o1", "o3"): 0.5**0.5,
        ("o1", "o4"): 1j * 0.5**0.5,
        ("o2", "o3"): 1j * 0.5**0.5,
        ("o2", "o4"): 0.5**0.5,
    }
    return sax.reciprocal(S)
def straight(length=10.0, width=0.5):
    S = {("o1", "o2"): 1.0}  # we'll improve this model later!
    return sax.reciprocal(S)
def bend_euler(length=10.0, width=0.5, dy=10.0, radius_min=7, radius=10):
    return straight(length=length, width=width)  # stub with straight for now

models = {
    "mmi2x2": mmi2x2,
    "straight": straight,
    "bend_euler": bend_euler,
}
mzi_s_parameters, _ = sax.circuit(mzi.get_netlist_recursive(), models=models)
mzi_s_parameters()
# -

# ## Create Interactive Widget

gine.interactive_netlist_graph(gdsfactory_netlist)

# ## Example Multi-Component Netlist

example_component_lattice = [
    [gf.components.mzi2x2_2x2(), 0, gf.components.mzi2x2_2x2()],
    [0, gf.components.mzi2x2_2x2(), 0],
    [gf.components.mzi2x2_2x2(), 0, gf.components.mzi2x2_2x2()],
]
ecl = gf.components.generic_component_lattice(example_component_lattice)
ecl

gcl_netlist = ecl.get_netlist()
gine.interactive_netlist_graph(gcl_netlist)

# We can work out the s-parameters of this component through `sax` based on his [example models](https://flaport.github.io/sax/examples/07_layout_aware.html):

cnet = ecl.get_netlist_recursive()
# cnet["instances"].keys()
cnet["generic_component_latti_38562889"]["instances"].keys()

models = {
    "mmi2x2": mmi2x2,
    "straight": straight,
    "bend_euler": bend_euler,
    # "mzi": mzi_s_parameters(),
}
generic_component_lattice_s_parameters, _ = sax.circuit(ecl.get_netlist_recursive(), models=models)
generic_component_lattice_s_parameters()




