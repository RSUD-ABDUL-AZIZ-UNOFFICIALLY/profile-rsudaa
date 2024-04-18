import { UUID } from "crypto"

export class ArticleResponse {
    id?: Number
    articleID?: UUID
    title?: string
    desc?: string
    images?: []
    createdAt?: string
    updatedAt?: string
}