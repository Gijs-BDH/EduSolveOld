import { AfterContentInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cluster } from '@app/modules/edu-solve/models/Cluster';
import { ShapeDialogComponent } from '../shape-dialog/shape-dialog.component';
import * as d3 from 'd3'

interface link<TData>{
    source : TData;
    target : TData;
}

@Component({
    selector: 'app-connections-dialog',
    templateUrl: './connections-dialog.component.html',
    styleUrls: ['./connections-dialog.component.scss']
})
export class ConnectionsDialogComponent implements AfterContentInit {

    width = 500;
    height = 500;

    svg : d3.Selection<SVGSVGElement, unknown, HTMLElement, any> = null!;

    node : SVGSVGElement = null!;

    lastNodeId = 2;
    links : link<ClusterWrapper>[] = [];

    lastKeyDown = -1;

    nodes : ClusterWrapper[];

    // init D3 force layout
    force : d3.Simulation<d3.SimulationNodeDatum, any> = null!

    // init D3 drag support
    drag : any = null!;

    // line displayed when dragging new nodes
    dragLine : any = null!;

    // handles to link and node element groups
    path: any = null!;
    circle: any = null!;

    // mouse event vars
    selectedNode: any = null!;
    selectedLink: link<ClusterWrapper> | null = null;
    mousedownLink: any = null!;
    mousedownNode: any = null!;
    mouseupNode: any = null!;

    constructor(@Inject(MAT_DIALOG_DATA) public clusters: Cluster[], private dialog: MatDialogRef<ShapeDialogComponent>) {

        this.nodes = this.clusters.map(c => new ClusterWrapper(c));
        this.links= [];
        this.resetLinks();
    }

    private resetLinks(){
        this.links= [];
        for(var i = 0; i< this.nodes.length; i++){
            for(var j = 0; j < this.nodes[i].connections.length; j++){
                var target = this.nodes.find(c => c.name == this.nodes[i].connections[j]);
                if(target){
                    this.links.push({ source: this.nodes[i], target: target })
                }
            }
        }
    }

    ngAfterContentInit(): void {

        this.svg = d3.select('#connection_container')
            .append('svg')
            .on('contextmenu', () => { d3.event.preventDefault(); })
            .attr('width', this.width)
            .attr('height', this.height);

        this.node = this.svg.node()!

        this.path = this.svg.append('svg:g').selectAll('path');
        this.circle = this.svg.append('svg:g').selectAll('g');
        this.dragLine = this.svg.append('svg:path')
            .attr('class', 'link dragline hidden')
            .attr('d', 'M0,0L0,0');;

        this.svg.append('svg:defs').append('svg:marker')
            .attr('id', 'end-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 6)
            .attr('markerWidth', 3)
            .attr('markerHeight', 3)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('fill', '#000');

        this.svg.append('svg:defs').append('svg:marker')
            .attr('id', 'start-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 4)
            .attr('markerWidth', 3)
            .attr('markerHeight', 3)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M10,-5L0,0L10,5')
            .attr('fill', '#000');

        this.svg.on('mousedown', this.mousedown.bind(this))
            .on('mousemove', this.mousemove.bind(this))
            .on('mouseup', this.mouseup.bind(this));

        d3.select(window)
            .on('keydown', this.keydown.bind(this))
            .on('keyup', this.keyup.bind(this));
            
        this.force = d3.forceSimulation()
            .force('link', d3.forceLink().id((d: any) => d.id).distance(150))
            .force('charge', d3.forceManyBody().strength(-500))
            .force('x', d3.forceX(this.width / 2))
            .force('y', d3.forceY(this.height / 2))
            .on('tick', this.tick.bind(this));

        this.drag = d3.drag()
            // Mac Firefox doesn't distinguish between left/right click when Ctrl is held... 
            .filter(() => d3.event.button === 0 || d3.event.button === 2)
            .on('start', (d: any) => {
                if (!d3.event.active) this.force.alphaTarget(0.3).restart();

                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (d: any) => {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            })
            .on('end', (d: any) => {
                if (!d3.event.active) this.force.alphaTarget(0);

                d.fx = null;
                d.fy = null;
            });
     

        this.restart();
    }

    private resetMouseVars() {
        this.mousedownNode = null!;
        this.mouseupNode = null!;
        this.mousedownLink = null!;
    }

    // update force layout (called automatically each iteration)
    private tick() {
        // draw directed edges with proper padding from node centers
        this.path.attr('d', (d: any) => {
            const deltaX = d.target.x - d.source.x;
            const deltaY = d.target.y - d.source.y;
            const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const normX = deltaX / dist;
            const normY = deltaY / dist;
            const sourcePadding = d.left ? 17 : 12;
            const targetPadding = d.right ? 17 : 12;
            const sourceX = d.source.x + (sourcePadding * normX);
            const sourceY = d.source.y + (sourcePadding * normY);
            const targetX = d.target.x - (targetPadding * normX);
            const targetY = d.target.y - (targetPadding * normY);

            return `M${sourceX},${sourceY}L${targetX},${targetY}`;
        });

        this.circle.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    }

    // update graph (called when needed)
    private restart() {

        // path (link) group
        this.path = this.path.data(this.links);

        // update existing links
        this.path.classed('selected', (d: any) => d === this.selectedLink)
            .style('marker-end', () => 'url(#end-arrow)');

        // remove old links
        this.path.exit().remove();

        // add new links
        this.path = this.path.enter().append('svg:path')
            .attr('class', 'link')
            .classed('selected', (d: any) => d === this.selectedLink)
            .style('marker-end', () => 'url(#end-arrow)')
            .on('mousedown', (d: any) => {
                if (d3.event.ctrlKey) return;

                // select link
                this.mousedownLink = d;
                this.selectedLink = (this.mousedownLink === this.selectedLink) ? null : this.mousedownLink;
                this.selectedNode = null;
                this.restart();
            })
            .merge(this.path);

        // circle (node) group
        // NB: the function arg is crucial here! nodes are known by id, not by index!
        this.circle = this.circle.data(this.nodes, (d: ClusterWrapper) => d.id);

        // update existing nodes (reflexive & selected visual states)
        this.circle.selectAll('circle')
            .style('fill', (d: ClusterWrapper) => (d === this.selectedNode) ? d3.rgb(d.color).brighter().toString() : d.color)
            .classed('reflexive', (d: any) => d.reflexive);

        // remove old nodes
        this.circle.exit().remove();

        // add new nodes
        const g = this.circle.enter().append('svg:g');

        g.append('svg:circle')
            .attr('class', 'node')
            .attr('r', 12)
            .style('fill', (d: ClusterWrapper) => (d === this.selectedNode) ? d3.rgb(d.color).brighter().toString() : d.color)
            .style('stroke', (d: ClusterWrapper) => d3.rgb(d.color).darker().toString())
            .classed('reflexive', (d: any) => d.reflexive)
            .on('mousedown', (d : any) => {
                if (d3.event.ctrlKey) return;

                // select node
                this.mousedownNode = d;
                this.selectedNode = (this.mousedownNode === this.selectedNode) ? null : this.mousedownNode;
                this.selectedLink = null;

                // reposition drag line
                this.dragLine
                    .style('marker-end', 'url(#end-arrow)')
                    .classed('hidden', false)
                    .attr('d', `M${this.mousedownNode.x},${this.mousedownNode.y}L${this.mousedownNode.x},${this.mousedownNode.y}`);

                    this.restart();
            })
            .on('mouseup', (d: any) => {
                if (!this.mousedownNode) return;

                // needed by FF
                this.dragLine
                    .classed('hidden', true)
                    .style('marker-end', '');

                // check for drag-to-self
                this.mouseupNode = d;
                if (this.mouseupNode === this.mousedownNode) {
                    this.resetMouseVars();
                    return;
                }

                // add link to graph (update if exists)
                // NB: links are strictly source < target; arrows separately specified by booleans
                const source = this.mousedownNode;
                const target = this.mouseupNode;
                const link = this.links.filter((l) => l.source === source && l.target === target)[0];

                if (!link) {
                    this.connect(source, target);
                }

                // select new link
                this.selectedLink = link;
                this.selectedNode = null;
                this.restart();
            });

        // show node IDs
        g.append('svg:text')
            .attr('x', 0)
            .attr('y', 4)
            .attr('class', 'id')
            .text((d: any) => d.id);

            this.circle = g.merge(this.circle);

        // set the graph in motion
        this.force!
            .nodes(this.nodes)
            .force<d3.ForceLink<any, any>>('link')!
            .links(this.links);

        this.force.alphaTarget(0.3).restart();
    }

    private connect(source : ClusterWrapper, target : ClusterWrapper){
        if(source.connections.find(c => c === target.name)){
            return;
        }

        source.connections = source.connections.concat(target.name);
        this.resetLinks();
    }

    private  mousedown() {
        // because :active only works in WebKit?
        this.svg.classed('active', true);

        if (d3.event.ctrlKey || this.mousedownNode || this.mousedownLink) return;

        this.restart();
    }

    private  mousemove() {
        if (!this.mousedownNode) return;

        // update drag line
        this.dragLine.attr('d', `M${this.mousedownNode.x},${this.mousedownNode.y}L${d3.mouse(this.node)[0]},${d3.mouse(this.node)[1]}`);
    }

    private  mouseup() {
        if (this.mousedownNode) {
            // hide drag line
            this.dragLine
                .classed('hidden', true)
                .style('marker-end', '');
        }

        // because :active only works in WebKit?
        this.svg.classed('active', false);

        // clear mouse event vars
        this.resetMouseVars();
    }

    private  keydown() {
        d3.event.preventDefault();

        if (this.lastKeyDown !== -1) return;
        this.lastKeyDown = d3.event.keyCode;

        // ctrl
        if (d3.event.keyCode === 17) {
            this.circle.call(this.drag);
            this.svg.classed('ctrl', true);
            return;
        }

        if (!this.selectedNode && !this.selectedLink) return;

        switch (d3.event.keyCode) {
            case 8: // backspace
            case 46: // delete
                if (this.selectedLink) {
                    var index = this.selectedLink.source.connections.indexOf(this.selectedLink.target.name);
                    this.selectedLink.source.connections.splice(index, 1);
                    ///make sure angular updates....
                    this.selectedLink.source.connections = [...this.selectedLink.source.connections];
                    this.resetLinks();
                }
                this.selectedLink = null;
                this.selectedNode = null;
                this.restart();
                break;
        }
    }

    private keyup() {
        this.lastKeyDown = -1;

        // ctrl
        if (d3.event.keyCode === 17) {
            this.circle.on('.drag', null);
            this.svg.classed('ctrl', false);
        }
    }
}



class ClusterWrapper{

    public x : number = 0;
    public y : number = 0;
    public reflexive = false;

    public get connections() {
        return this.cluster.connections;
    }

    public set connections(value) {
        this.cluster.connections = value;
    }

    public get name(){
        return this.cluster.name;
    }

    public get id () {
        return this.name;
    }

    public get color(){
        return this.cluster.color;
    }

    constructor(private cluster : Cluster){

    }
}
