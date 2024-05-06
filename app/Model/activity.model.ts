import { UUID } from "crypto"

export class ActivityResponse {
    id?: Number
    activityID?: string
    title?: string
    desc?: string
    images?: []
    createdAt?: string
    updatedAt?: string
}