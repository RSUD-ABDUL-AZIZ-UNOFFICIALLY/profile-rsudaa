import { UUID } from "crypto"

export class AnnoucementResponse {
    id?: Number
    announcementID?: string
    title?: string
    desc?: string
    images?: string
    createdAt?: string
    updatedAt?: string
}