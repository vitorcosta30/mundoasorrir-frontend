import { Project } from "./project.model";

export class User {
    constructor(
        public email: string,
        public id: string,
        public username: string,
        public role: string,
        public active: boolean,
        public currentProject: Project
    ) { };
}