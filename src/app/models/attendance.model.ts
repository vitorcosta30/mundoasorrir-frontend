import { User } from "./user.model";

export class Attendance {
    constructor(
        public user: User,
        public status: string,
    ) { };
}