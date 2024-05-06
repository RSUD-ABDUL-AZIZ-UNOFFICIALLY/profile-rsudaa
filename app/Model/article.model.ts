import { UUID } from "crypto"

export class ArticleResponse {
    id?: Number
    articleID?: string
    title?: string
    desc?: string
    images?: []
    createdAt?: string
    updatedAt?: string
}