export class AppErro extends Error {
    code: number;

    constructor(statusCode: number, message: string){
        super(message)
        this.code = statusCode;
    }
}