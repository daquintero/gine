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


# We can work out the s-parameters of this component through `sax` based on his [example models](https://flaport.github.io/sax/examples/07_layout_aware.html):

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


# + active=""
# c.get_netlist()
# -

models = {
    "mmi2x2": mmi2x2,
    "straight": straight,
    "bend_euler": bend_euler,
}
generic_component_lattice_s_parameters, _ = sax.circuit(gf.components.generic_component_lattice(example_component_lattice).get_netlist_recursive(), models=models)
generic_component_lattice_s_parameters


@gf.cell
def simple_mzi():
    c = gf.Component()

    # instances
    mmi_in = gf.components.mmi1x2()
    mmi_out = gf.components.mmi2x2()
    bend = gf.components.bend_euler()
    half_delay_straight = gf.components.straight(length=10.0)

    # references (sax convention: vars ending in underscore are references)
    mmi_in_ = c << mmi_in
    mmi_out_ = c << mmi_out
    straight_top1_ = c << half_delay_straight
    straight_top2_ = c << half_delay_straight
    bend_top1_ = c << bend
    bend_top2_ = (c << bend).mirror()
    bend_top3_ = (c << bend).mirror()
    bend_top4_ = c << bend
    bend_btm1_ = (c << bend).mirror()
    bend_btm2_ = c << bend
    bend_btm3_ = c << bend
    bend_btm4_ = (c << bend).mirror()

    # connections
    bend_top1_.connect("o1", mmi_in_.ports["o2"])
    straight_top1_.connect("o1", bend_top1_.ports["o2"])
    bend_top2_.connect("o1", straight_top1_.ports["o2"])
    bend_top3_.connect("o1", bend_top2_.ports["o2"])
    straight_top2_.connect("o1", bend_top3_.ports["o2"])
    bend_top4_.connect("o1", straight_top2_.ports["o2"])

    bend_btm1_.connect("o1", mmi_in_.ports["o3"])
    bend_btm2_.connect("o1", bend_btm1_.ports["o2"])
    bend_btm3_.connect("o1", bend_btm2_.ports["o2"])
    bend_btm4_.connect("o1", bend_btm3_.ports["o2"])

    mmi_out_.connect("o1", bend_btm4_.ports["o2"])

    # ports
    c.add_port(
        "o1",
        port=mmi_in_.ports["o1"],
    )
    c.add_port("o2", port=mmi_out_.ports["o3"])
    c.add_port("o3", port=mmi_out_.ports["o4"])
    return c
mzi = simple_mzi()
mzi.get_netlist_recursive()


