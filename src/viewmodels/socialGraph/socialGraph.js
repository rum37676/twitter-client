import {inject} from 'aurelia-framework';
import TwitterService from '../../services/twitter-service';
import {Router} from 'aurelia-router';
import * as d3 from 'd3';

@inject(TwitterService, Router)
export class socialGraph {

  static inject() { return [Router]; }

  // Sample implementation from https://bl.ocks.org/mbostock/4600693

  nodes = [];
  links = [];

  constructor(ts, router) {
    this.twitterService = ts;
    this.router = router;
    this.calculateGraph();
  }

  calculateGraph() {
    for (let user of this.twitterService.users) {
      let node = { 'id': user.username, 'userId': user._id, 'group': 1, 'reference': this};
      //console.log(node);
      this.nodes.push(node);

      for (let follower of user.followers) {
        let link = { 'source': follower.username, 'target': user.username, 'value': 1, 'distance': 40 };
        //console.log(link);
        this.links.push(link);
      }
    }
  }

  attached() {
    let svg = d3.select('svg'),
      width = +svg.attr('width'),
      height = +svg.attr('height');

    let color = d3.scaleOrdinal(d3.schemeCategory20);

    let simulation = d3.forceSimulation()
      .force('link', d3.forceLink().distance(10).strength(0.5))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    let nodes = this.nodes,
      nodeById = d3.map(nodes, function(d) { return d.id; }),
      links = this.links,
      bilinks = [];

    links.forEach(function(link) {
      let s = link.source = nodeById.get(link.source),
        t = link.target = nodeById.get(link.target),
        i = {}; // intermediate node
      nodes.push(i);
      links.push({source: s, target: i}, {source: i, target: t});
      bilinks.push([s, i, t]);
    });

    let link = svg.selectAll('.link')
      .data(bilinks)
      .enter().append('path')
      .attr('class', 'link');

    let node = svg.selectAll('.node')
      .data(nodes.filter(function(d) { return d.id; }))
      .enter().append('circle')
      .attr('class', 'node')
      .attr('r', 7)
      .attr('fill', function(d) { return color(d.group); })
      .on('click', navigateToUser)
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    node.append('title')
      .attr('font-size', '1em')
      .text(function(d) { return d.id; });

    simulation
      .nodes(nodes)
      .on('tick', ticked);

    simulation.force('link')
      .links(links);

    function ticked() {
      link.attr('d', positionLink);
      node.attr('transform', positionNode);
    }

    function positionLink(d) {
      return 'M' + d[0].x + ',' + d[0].y
        + 'S' + d[1].x + ',' + d[1].y
        + ' ' + d[2].x + ',' + d[2].y;
    }

    function positionNode(d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x, d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x, d.fy = d3.event.y;
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null, d.fy = null;
    }

    function navigateToUser(d) {
      d.reference.router.navigate('userTimeline/' + d.userId);
    }
  }
}

