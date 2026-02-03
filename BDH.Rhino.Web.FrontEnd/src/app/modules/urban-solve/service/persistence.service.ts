import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Point2d } from '@app/shared/models/Point2d';
import { environment } from '@env';
import { GeoJsonConvert } from '../../../shared/service/static/GeoJsonConvert';
import { UrbanSolveDataService } from './urban-solve-data.service';
import { UrbanSolveShellService } from './urban-solve-shell.service';
import { CatalogService } from '@app/data/service/catalog.service';
import { SolverService } from '@app/modules/concept-solve/service/solver.service';
import { BouwkostenBasisTypologieService } from '@app/data/service/bouwkosten-basis-typologie.service';
import { map } from 'rxjs';
import { Project } from '../models/Project';
import { ProjectVersion } from '../models/ProjectVersion';
import { SavedVersionResponse } from '../models/DataTransferObjects/SavedVersionResponse';
import { SaveVersionBody } from '../models/DataTransferObjects/SaveVersionBody';
import { SaveVersionGenericMass } from '../models/DataTransferObjects/SaveVersionGenericMass';
import { SaveVersionBuildingConceptCatalog } from '../models/DataTransferObjects/SaveVersionBuildingConceptCatalog';
import { IsPoint2d } from '@app/shared/models/IsPoint2d';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  baseUrl: string = environment.apiUrl + "/projecten";

  constructor(
    private httpClient: HttpClient,
    private typologySerivce: BouwkostenBasisTypologieService,
    private catalogService: CatalogService,
    private catalogSolver: SolverService) { }


  //CREATE
  createProject(name: string, basePolygon: IsPoint2d[]) {
    var url = this.baseUrl + "/create";

    var body = {
      Name: name,
      BasePolygon: GeoJsonConvert.toGeoJson(basePolygon)
    };

    return this.httpClient.post<Project>(url, body);
  }

  //READ
  fetchProjects() {
    return this.httpClient.get<Project[]>(this.baseUrl);
  }

  fetchProject(id: string) {
    var url = this.baseUrl + "/" + id;
    return this.httpClient.get<Project>(url);
  }

  fetchVersion(projectId: string, versionId: string) {
    var body =
    {
      ProjectId: projectId,
      VersionId: versionId
    }

    var url = this.baseUrl + "/version";

    return this.httpClient.post<SavedVersionResponse>(url, body);
  }

  setToShell(projectId: string, versionId: string, data: UrbanSolveDataService, shell: UrbanSolveShellService) {
    return this.fetchVersion(projectId, versionId)
      .pipe(map(res => {
        PersistenceService.restoreProjectFromResponse(res, data, shell, this.catalogService, this.catalogSolver, this.typologySerivce);
      }))
  }

  private static async restoreProjectFromResponse(response: SavedVersionResponse, data: UrbanSolveDataService, shell: UrbanSolveShellService, catalogService: CatalogService, catalogSolver: SolverService, typologyService: BouwkostenBasisTypologieService) {
    data.clear();
    shell.drawProjectToCanvas();

    catalogService.getForClientCompany().subscribe(
      {
        next: catalogs => {
          for (const c of response.catalogs) {
            try {
              var catalog = catalogs.find(catalog => catalog.id == c.buildingConceptCatalogId)!;
              var model = data.addCatalog(
                catalog,
                { x: c.startPointX, y: c.startPointY },
                { x: c.endPointX, y: c.endPointY });
              model.pinned = c.pinned;
              model.useSeed = c.usedSeed === undefined || c.usedSeed === null ? false : true;
              model.usedSeed = c.usedSeed;
              model.levelsFrom = c.levelsFrom,
                model.levelsTo = c.levelsTo
              catalogSolver.solveAgain(model);
            }
            catch (ex) {
              //so i can set a breakpoint
              var i = 0;
            }
          }

          shell.drawProjectToCanvas();
        }
      });

    for (const m of response.genericMasses) {
      try {
        data.addGenericMass(
          new Point2d(m.locationX, m.locationY),
          m.rotation,
          typologyService.getByNameCached(m.bouwkostenTypologie),
          m.width,
          m.height,
          m.depth);
      }
      catch
      {

      }
    }


    for (const w of response.ways) {
      try {
        var wayPoints = GeoJsonConvert.fromLineString(w);
        data.addWay(wayPoints, w.properties.diameter);
      }
      catch
      {

      }
    }

    shell.drawProjectToCanvas();

  }

  //UPDATE
  saveToServer(projectData: UrbanSolveDataService, projectId: string, name: string) {
    var url = this.baseUrl + "/save";

    var body: SaveVersionBody = {
      ProjectId: projectId,
      Name: name,
      BuildingConcepts: [],
      GenericMasses: [],
      Catalogs: [],
      Ways: []
    }

    projectData.getGenericMasses().forEach(m => {
      var mass: SaveVersionGenericMass = {
        bouwkostenTypologie: m.typology.name,
        LocationX: m.position.x,
        LocationY: m.position.y,
        Rotation: m.rotation,
        Width: m.width,
        Height: m.height,
        Depth: m.depth
      }

      body.GenericMasses.push(mass);
    })

    projectData.getCatalogs().forEach(c => {
      var model: SaveVersionBuildingConceptCatalog = {
        buildingConceptCatalogId: c.catalog.id,
        startPointX: c.startPoint.x,
        startPointY: c.startPoint.y,
        endPointX: c.endPoint.x,
        endPointY: c.endPoint.y,
        usedSeed: c.usedSeed ?? null,
        pinned: c.pinned,
        levelsFrom: c.levelsFrom,
        levelsTo: c.levelsTo
      };

      body.Catalogs.push(model);
    })

    projectData.getWays().forEach(w => {
      var lineString = GeoJsonConvert.toLineString(w.points, { Diameter: w.diameter });

      body.Ways.push(lineString);
    })

    return this.httpClient.post(url, body);
  }



  //DELETE
  deleteProject(id: string) {
    var url = this.baseUrl + "/delete";

    var body = {
      Id: id
    };

    var options = {
      body: body
    }

    return this.httpClient.delete(url, options);
  }

  deleteVersion(project: Project, version: ProjectVersion) {
    var url = this.baseUrl + "/version"

    var body = {
      ProjectId: project.id,
      VersionId: version.id
    };

    var options = {
      body: body
    }

    return this.httpClient.delete(url, options);
  }

  saveVersionReport(projectId: string, versionId: string, report: string) {
    var body =
    {
      ProjectId: projectId,
      VersionId: versionId,
      Report: report
    }

    var url = this.baseUrl + "/savereport";

    return this.httpClient.post(url, body);
  }

}


