export class ChangeMyPassword {
    constructor(
        public oldPassword: string,
        public newPassword: string,
        public reNewPassword: string,
    ) { };
}