export class CalendarEventDTO {
    constructor(
        public end: string,
        public start: string,
        public title: string,
        public id: number,
        public type: string
    ) { };
}