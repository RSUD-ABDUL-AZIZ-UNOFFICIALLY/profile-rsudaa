import { UUID } from "crypto"

export class ActivityResponse {
    id?: Number
    activityId?: UUID
    title?: string
    desc?: string
    images?: []
    createdAt?: string
    updatedAt?: string
}