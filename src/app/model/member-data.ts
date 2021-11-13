import { TeamData } from "./team-data";
import { ProjectData } from "./project-data";

export class MemberData {
    nameAndSurname: string;
    organizationRole: string;
    email: string;
    phone: string;
    room: string;
    team: TeamData[];
    project: ProjectData[];
}