export class CalendarEventDTO {
    constructor(
        public end: string,
        public start: string,
        public description: string,
        public place: string,

        public id: number,
        public type: string
    ) { };
}