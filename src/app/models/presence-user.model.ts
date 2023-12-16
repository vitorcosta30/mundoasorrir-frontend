import { User } from "./user.model";

export class PresenceUser {
    constructor(
        public user: User,
        public status: string,
        public date: string,

    ) { };
}