// import * from "force-graph"
import ForceGraph from "force-graph";

let create = function createForceGraph(dom,
                                       {
                                           nodes, // an iterable of node objects (typically [{id}, …])
                                           links // an iterable of link objects (typically [{source, target}, …])
                                       }, {
                                        // width,
                                        // height,
                                       } = {}) {

    dom.el.setAttribute('class', 'jupyter-widget gine');
    // dom.el.setAttribute("style", "max-width: 100%; height: auto; height: intrinsic;");

/*    let width = dom.el.width;
    let height = dom.el.height;*/


    let graph = ForceGraph()
    (dom.el)
        // .width(width)
        // .height(height)
        .graphData({nodes, links});

    // dom.el.addEventListener('resize', function(event) {
    //     graph(dom.el).width(dom.el.width).height(dom.el.height);
    // }, true);

    return dom;
}

let value_changed = function (dom, netlistGraphData) {
    console.log("value changed");
    create(dom, netlistGraphData);
};

export let netlistGraph = {
    create: create,
    value_changed: value_changed,
}