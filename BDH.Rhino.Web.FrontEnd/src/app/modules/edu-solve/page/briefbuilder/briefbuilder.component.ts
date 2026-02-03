import { Component, OnInit } from '@angular/core';
import { EduSolveDataService } from '../../service/edu-solve-data.service';
import { BriefBuilderService } from '../../../../data/service/briefbuilder.service';
import { BriefBuilderProject } from '../../../../data/schema/responses/BriefBuilderProject';
import { MatSelectChange } from '@angular/material/select';

import { Cluster } from "../../models/Cluster";


@Component({
  selector: 'app-briefbuilder',
  templateUrl: './briefbuilder.component.html',
  styleUrls: ['./briefbuilder.component.scss']
})
export class BriefbuilderComponent implements OnInit {

  public AvailableProjects: BriefBuilderProject[] = [];

  public SelectedProject: BriefBuilderProject | undefined;

  constructor(private dataService: BriefBuilderService, public eduSolveDataService: EduSolveDataService) {

  }

  ngOnInit(): void {
    this.dataService.getList().subscribe(data => {
      this.AvailableProjects = data;
    });
  }

  public projectChanged(event: MatSelectChange) {
    this.SelectedProject = event.value;

    if (this.SelectedProject == undefined) {
      // Reset clusters
      this.eduSolveDataService.clusters = [];
      this.eduSolveDataService.clusters.push(Cluster.createDefault("Onderbouw", "#F33900", 600, 0, 0, 1));
      this.eduSolveDataService.clusters.push(Cluster.createDefault("Kinderdagverblijf", "#D80767", 400, 0, 0, 1));
      this.eduSolveDataService.clusters.push(Cluster.createDefault("Middenbouw", "#571282", 500, 0, 1, 1));
      this.eduSolveDataService.clusters.push(Cluster.createDefault("Aula", "#01C0E5", 500, 0, 0, 2));
      this.eduSolveDataService.clusters.push(Cluster.createDefault("Kantoor", "#40B81D", 200, 1, 2, 1));
      this.eduSolveDataService.clusters.push(Cluster.createDefault("Bovenbouw", "#E3DA1D", 800, 1, 3, 1));

      return;
    }

    this.eduSolveDataService.clusters = [];
    for (var i = 0; i < this.SelectedProject!.buildingGroups.length; i++) {
      var connections: string[] = [];

      for (var j = 0; j < this.SelectedProject!.connections.length; j++) {
        if (this.SelectedProject!.connections[j].group1 == this.SelectedProject!.buildingGroups[i].name) {
          connections.push(this.SelectedProject!.connections[j].group2);
        }
      }

      this.eduSolveDataService.clusters.push(new Cluster(
        this.SelectedProject!.buildingGroups[i].name,
        this.SelectedProject!.buildingGroups[i].color,
        this.SelectedProject!.buildingGroups[i].bvo,
        this.SelectedProject!.buildingGroups[i].lowestLevel,
        this.SelectedProject!.buildingGroups[i].highestLevel,
        this.SelectedProject!.buildingGroups[i].levelHeight,
        [false],
        1,
        connections
      ));
    }
  }

  public SelectedBVOFactor(): string {
    if (this.SelectedProject == undefined) {
      return "-";
    };

    return this.SelectedProject.bvoFactor;
  }
}
