import { BriefBuilderBuildingGroup } from "./BriefBuilderBuildingGroup";
import { BriefBuilderBuildingGroupConnection } from "./BriefBuilderBuildingGroupConnection";

export interface BriefBuilderProject {
  id: string,
  name: string,
  bvoFactor: string,

  buildingGroups: BriefBuilderBuildingGroup[],
  connections: BriefBuilderBuildingGroupConnection[]
}
