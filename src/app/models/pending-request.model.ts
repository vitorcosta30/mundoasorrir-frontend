export class PendingRequest {
    constructor(
        public userEmail: string,
        public id: string,
        public userName: string,
        public startDate: string,
        public endDate: string,

    ) { };
}