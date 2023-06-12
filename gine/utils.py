def convert_gdsfactory_netlist(gdsfactory_netlist : dict):
    """
    Converts between gdsfactory inherent netlist to `gine`-compatible netlists.

    GDSFactory netlist format:
    ```
    netlist={
        "instances": {
            "lft": coupler,
            "top": waveguide,
            "rgt": coupler,
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
    ```

    `gine` netlist format:
    ```
    netlist = {
        nodes: [
            {id: "heyhey", someproperty: "beer"},
            {id: "oioi", someproperty: "ale"},
        ],
        links: [
            {"source": "heyhey", "target": "oioi", "value": 1},
        ],
    }
    ```

    Part of the objective is to retain information of the ports, but I am trying to see how to do this in a force-graph implementation. Personally I am less interested in ports but it would be good for future compatibility. The problem is that I would have to make each port an element. I can save it as a property for now.
    """
    
    nodes = gdsfactory_netlist["instances"].items()
    # Create nodes
    nodes = []
    for instance in gdsfactory_netlist["instances"].items():
        node = {}
        node["id"] = instance[0]
        node["properties"] = instance[1]
        nodes.append(node)

    # Create links
    links = []
    for connection in gdsfactory_netlist["connections"].items():
        link = {}
        link["source"] = connection[0].split(",")[0]
        link["target"] = connection[1].split(",")[0]
        link["properties"] = connection[0] + "_" + connection[1]
        links.append(link)
        
    gine_netlist = {
        "nodes": nodes,
        "links": links,
    }
    return gine_netlist
