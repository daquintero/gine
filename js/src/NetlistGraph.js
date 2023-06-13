// import * from "force-graph"
import ForceGraph from "force-graph";

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/force-directed-graph
let create = function createForceGraph(dom,
                                       {
                                           nodes, // an iterable of node objects (typically [{id}, …])
                                           links // an iterable of link objects (typically [{source, target}, …])
                                       }, {
                                           // nodeClassName = node => node.className,
                                           // nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
                                           // nodeGroup, // given d in nodes, returns an (ordinal) value for color
                                           // nodeGroups, // an array of ordinal values representing the node groups
                                           // nodeHierarchy = node => node.hierarchy,
                                           // nodeTitle, // given d in nodes, a title string
                                           // nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
                                           // nodeStroke = "#fff", // node stroke color
                                           // nodeStrokeWidth = 1.5, // node stroke width, in pixels
                                           // nodeStrokeOpacity = 1, // node stroke opacity
                                           // nodeRadius = 5, // node radius, in pixels
                                           // nodeStrength,
                                           // linkHierarchy = link => link.hierarchy,
                                           // linkSource = ({source}) => source, // given d in links, returns a node identifier string
                                           // linkTarget = ({target}) => target, // given d in links, returns a node identifier string
                                           // linkStroke = "#999", // link stroke color
                                           // linkStrokeOpacity = 0.6, // link stroke opacity
                                           // linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
                                           // linkStrokeLinecap = "round", // link stroke linecap
                                           // linkStrength,
                                           // colors = d3.schemeTableau10, // an array of color strings, for the node groups
                                           // width = 640, // outer width, in pixels
                                           // height = 400, // outer height, in pixels
                                           // invalidation // when this promise resolves, stop the simulation
                                       } = {}) {
    // const svgElmt = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // svgElmt.setAttribute("width", "100%");
    // svgElmt.setAttribute('height', "100%");
    // append svg element to dom

    dom.el.setAttribute('class', 'jupyter-widget gine');
    dom.el.setAttribute("style", "max-width: 100%; height: auto; height: intrinsic;")
    // dom.el.appendChild(svgElmt);
    // const svg = d3.select(svgElmt);
    // svgElmt.attr("viewBox", [-width / 2, -height / 2, width, height])
    //        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    // // .attr('class', 'area');
    // window.svg = svgElmt;

    console.log("dom")
    console.log(dom.height)
    console.log(dom.width)
    let graph = ForceGraph()
    (dom.el)
        .width(dom.width)
        .height(dom.height)
        .graphData({nodes, links});

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