export class EventModel{
    constructor(
        public end: string,
        public start: string,
        public description: string,
        public place: string,
        public groups: string[],
        public users: string[],
    ) { };

}