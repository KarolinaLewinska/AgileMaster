import { MemberData } from "./member-data";
import { ProjectData } from "./project-data";

export interface TeamData {
    name: string;
    description: string;
    project: ProjectData[];
    members: MemberData[]
}