export class FileModel{
    constructor(
        public sharedBy: string,
        public name: string,
        public url: string,
        public type: string,
        public size: number,
    ) { };

}