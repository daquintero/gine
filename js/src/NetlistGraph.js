// import * from "force-graph"


let create = function createForceGraph(dom,
                                       {
                                           nodes, // an iterable of node objects (typically [{id}, …])
                                           links // an iterable of link objects (typically [{source, target}, …])
                                       }, {
                                        width,
                                        height,
                                       } = {}) {

    dom.el.setAttribute('class', 'jupyter-widget gine');


    // let graph = ForceGraph()
    // (dom.el)
    //     .graphData({nodes, links});
    console.log("width");
    console.log(width);
    console.log(height);

    // return do
}

let value_changed = function (dom, netlistGraphData) {
    console.log("value changed");
    create(dom, netlistGraphData);
};

export let netlistGraph = {
    create: create,
    value_changed: value_changed,
}