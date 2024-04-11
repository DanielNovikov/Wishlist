export class CurrentUserEditRequest {
    public name!: string;
    public email: string | undefined;
    public password: string | undefined;
    public avatarPath: string | undefined;
}
