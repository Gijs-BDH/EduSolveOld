import { Component, OnInit } from '@angular/core';
import { EduSolveDataService } from '../../service/edu-solve-data.service';
import { Cluster } from "../../models/Cluster";
import { EduSolveShellService } from '../../service/edu-solve-shell.service';
import { GridConfigurationService } from '../../service/grid-configuration.service';
import { MatDialog } from '@angular/material/dialog';
import { ShapeDialogComponent } from './shape-dialog/shape-dialog.component';
import { ConnectionsDialogComponent } from './connections-dialog/connections-dialog.component';


interface ClusterPreset{
    name : string,
    clusters: Cluster[]
}

@Component({
  selector: 'app-clusters',
  templateUrl: './clusters.component.html',
  styleUrls: ['./clusters.component.scss']
})
export class ClustersComponent implements OnInit{
    public get clusters() : Cluster[]{
        return this.data.clusters;
    }

    

    public clusterTemplates : ClusterPreset[] = [
        {
            name: "Gemengde school (3000m2)",
            clusters: [
                Cluster.createDefault("Onderbouw", "#F33900", 600, 0, 0, 1),
                Cluster.createDefault("Kinderdagverblijf", "#D80767", 400, 0, 0, 1),
                Cluster.createDefault("Middenbouw", "#571282", 500, 0, 1, 1),
                Cluster.createDefault("Aula", "#01C0E5", 500,  0, 0, 2),
                Cluster.createDefault("Kantoor", "#40B81D", 200, 1, 2, 1),
                Cluster.createDefault("Bovenbouw", "#E3DA1D", 800, 1, 3, 1)
            ]
        },
        {
            name: "Middelbare school (2000m2)",
            clusters: [
                Cluster.createDefault("Onderbouw", "#F33900", 500, 0, 0, 1),
                Cluster.createDefault("Aula", "#01C0E5", 500,  0, 0, 2),
                Cluster.createDefault("Kantoor", "#40B81D", 200, 1, 2, 1),
                Cluster.createDefault("Bovenbouw", "#E3DA1D", 800, 1, 3, 1)
            ]
        },
        {
            name: "Gymansium (1500m2)",
            clusters: [
                Cluster.createDefault("Aula", "#01C0E5", 500,  0, 0, 2),
                Cluster.createDefault("Kantoor", "#40B81D", 200, 1, 2, 1),
                Cluster.createDefault("Kantine", "#571282", 200, 1, 2, 1),
                Cluster.createDefault("Bovenbouw", "#E3DA1D", 600, 1, 3, 1)
            ]
        }
        
    ]

    public math : Math = window.Math;

    constructor(
        private shell : EduSolveShellService, 
        public grid : GridConfigurationService,
        public data : EduSolveDataService,
        private dialog : MatDialog){

        
    }
    ngOnInit(): void {
        if(!this.shell.projectActive || !this.data.clusters){
            this.data.clusters = this.clusterTemplates[0].clusters;
        }
    }

    add(){
        var name = window.prompt("Hoe heet het cluster?");
        if(!name){
            return;
        }

        this.clusters.push(Cluster.createDefault(name, RandomColor(), 500, 0, 2, 1));
    }

    remove(event : Event, cluster : Cluster){
        event.stopPropagation();

        if(!window.confirm(`Wilt u ${cluster.name} verwijderen?`)){
            return;
        }

        var index = this.clusters.indexOf(cluster);
        if(index == -1){
            return;
        }

        this.clusters.splice(index, 1);
    }

    toggleVisible(event : Event, cluster : Cluster){
        event.stopPropagation();

        cluster.visible = !cluster.visible;
        this.shell.drawProjectToCanvas();
    }

    colorClick(event : Event){
        event.stopPropagation();
    }

    addFixedPoint(cluster : Cluster){
        this.shell.addFixedPoint(cluster);
    }
    
    drawShape(cluster : Cluster){
        var config = {
            width: "500px",
            minHeight: "500px",
            maxHeight: "85vh",
            data: cluster,
            disableClose: true
        }
        this.dialog.open(ShapeDialogComponent, config);
    }

    rebuild(){
        this.shell.drawProjectToCanvas();
    }

    setPreset(preset : ClusterPreset){
        this.data.clusters = preset.clusters;
    }

    connections(){
        var config = {
            width: "500px",
            minHeight: "500px",
            maxHeight: "85vh",
            data: this.clusters,
            disableClose: false
        }
        this.dialog.open(ConnectionsDialogComponent, config);
    }

    compareFn(left : string, right: string){
        return left == right;
    }
}


function RandomColor() : string{
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}



