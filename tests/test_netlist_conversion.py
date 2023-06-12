simple_gdsfactory_netlist = {
        "instances": {
            "lft": "coupler",
            "top": "waveguide",
            "rgt": "coupler",
        },
        "connections": {
            "lft,out0": "rgt,in0",
            "lft,out1": "top,in0",
            "top,out0": "rgt,in1",
        },
        "ports": {
            "in0": "lft,in0",
            "in1": "lft,in1",
            "out0": "rgt,out0",
            "out1": "rgt,out1",
        },
    }

def test_gds_factory_netlist_conversion(netlist=simple_gdsfactory_netlist):
    import gine
    simple_gine_netlist = gine.convert_gdsfactory_netlist(netlist)
    print(simple_gine_netlist)


if __name__ == "__main__":
    test_gds_factory_netlist_conversion()