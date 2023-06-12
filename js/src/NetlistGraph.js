import * as d3 from "d3"
// import {howto} from "@d3/example-components"
// import {Swatches} from "@d3/color-legend"

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/force-directed-graph
let create = function createForceGraph(dom,
                                       {
                        nodes, // an iterable of node objects (typically [{id}, …])
                        links // an iterable of link objects (typically [{source, target}, …])
                    }, {
                        nodeClassName = node => node.className,
                        nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
                        nodeGroup, // given d in nodes, returns an (ordinal) value for color
                        nodeGroups, // an array of ordinal values representing the node groups
                        nodeHierarchy = node => node.hierarchy,
                        nodeTitle, // given d in nodes, a title string
                        nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
                        nodeStroke = "#fff", // node stroke color
                        nodeStrokeWidth = 1.5, // node stroke width, in pixels
                        nodeStrokeOpacity = 1, // node stroke opacity
                        nodeRadius = 5, // node radius, in pixels
                        nodeStrength,
                        linkHierarchy = link => link.hierarchy,
                        linkSource = ({source}) => source, // given d in links, returns a node identifier string
                        linkTarget = ({target}) => target, // given d in links, returns a node identifier string
                        linkStroke = "#999", // link stroke color
                        linkStrokeOpacity = 0.6, // link stroke opacity
                        linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
                        linkStrokeLinecap = "round", // link stroke linecap
                        linkStrength,
                        colors = d3.schemeTableau10, // an array of color strings, for the node groups
                        width = 640, // outer width, in pixels
                        height = 400, // outer height, in pixels
                        invalidation // when this promise resolves, stop the simulation
                    } = {}) {
    // Compute values.
    console.log('Rendering force graph');
    const nodeHierarchyMap = d3.map(nodes, nodeHierarchy).map(intern);
    const nodeClassNameMap = d3.map(nodes, nodeClassName).map(intern);
    const linkHierarchyMap = d3.map(links, linkHierarchy).map(intern);
    console.log('hey force graph');
    const N = d3.map(nodes, nodeId).map(intern);
    const LS = d3.map(links, linkSource).map(intern);
    const LT = d3.map(links, linkTarget).map(intern);
    if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
    const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
    const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
    const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);
    const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);

    // Replace the input nodes and links with mutable objects for the simulation.
    nodes = d3.map(nodes, (_, i) => ({id: N[i], hierarchy: nodeHierarchyMap[i], className: nodeClassNameMap[i]}));
    links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i], hierarchy: linkHierarchyMap[i]}));

    // Compute default domains.
    if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

    // Construct the scales.
    const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

    // Construct the forces.
    const forceNode = d3.forceManyBody();
    const forceLink = d3.forceLink(links).id(({index: i}) => N[i]);
    if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
    if (linkStrength !== undefined) forceLink.strength(linkStrength);

    const simulation = d3.forceSimulation(nodes)
        .force("link", forceLink)
        .force("charge", forceNode)
        .force("center",  d3.forceCenter())
        .on("tick", ticked);

    const svgElmt = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgElmt.setAttribute('width', width);
    svgElmt.setAttribute('height', height);
    // append svg element to dom
    dom.el.appendChild(svgElmt);
    dom.el.setAttribute('class', 'jupyter-widget gine');
    const svg = d3.select(svgElmt);
    svg.attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
    // .attr('class', 'area');
    window.svg = svg;


    // Attributes
    // var margin = { right: 40, left: 40 };
    // var width = +svg.attr('width') - margin.left - margin.right;
    // var height = +svg.attr('height');


    const link = svg.append("g")
        .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
        .attr("stroke-opacity", linkStrokeOpacity)
        .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
        .attr("stroke-linecap", linkStrokeLinecap)
        .selectAll("line")
        .data(links)
        .join("line");

    const node = svg.append("g")
        .attr("fill", nodeFill)
        .attr("stroke", nodeStroke)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-width", nodeStrokeWidth)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius)
        .call(drag(simulation));

    const textElements = svg.append('g')
        .selectAll('text')
        .data(nodes)
        .enter().append('text')
        .text(node => node.className)
        .attr('font-size', 15)
        .attr('dx', 15)
        .attr('dy', 4)

    console.log(nodes);
    console.log(links);
    console.log(nodes);
    // console.log(links.filter(link => link.hierarchy == 0));

    if (W) link.attr("stroke-width", ({index: i}) => W[i]);
    if (L) link.attr("stroke", ({index: i}) => L[i]);
    if (G) node.attr("fill", ({index: i}) => color(G[i]));
    if (T) node.append("title").text(({index: i}) => T[i]);
    if (invalidation != null) invalidation.then(() => simulation.stop());

    function intern(value) {
        return value !== null && typeof value === "object" ? value.valueOf() : value;
    }

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        textElements
            .attr("x", node => node.x)
            .attr("y", node => node.y)
    }

    function drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    console.log('end create');
    return Object.assign(svg.node(), {scales: {color}});
}

// chart = createForceGraph(miserables, {
//     nodeId: d => d.id,
//     nodeGroup: d => d.group,
//     nodeTitle: d => `${d.id}\n${d.group}`,
//     linkStrokeWidth: l => Math.sqrt(l.value),
//     width,
//     height: 600,
//     invalidation // a promise to stop the simulation when the cell is re-run
// })

let value_changed = function (dom, netlistGraphData) {
    console.log("value changed");
    create(dom, netlistGraphData);
};

export let netlistGraph = {
    create: create,
    value_changed: value_changed,
}