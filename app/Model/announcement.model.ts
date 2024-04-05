import { UUID } from "crypto"

export class AnnoucementResponse {
    id?: Number
    AnnouncementId?: UUID
    title?: string
    desc?: string
    images?: []
    createdAt?: string
    updatedAt?: string
}