export class WebResponse<T> {
    status?: Number
    success?: Boolean
    message?: string
    data?: T
    errors?: any
}