export class LokerResponse {
    id?: string
    name?: string
    desc?: string
    dateStart?: string
    dateEnd?: string
    createdAt?: string
    updatedAt?: string
    applicationLoker?: ApplyLokerResponse[]
}

export class ApplyLokerResponse {
    id?: string
    nik?: number
    no_wa?: string
    email?: string
    fullName?: string
    tanggalLahir?: string
    loker?: LokerResponse
    lokerId?: string
    sekolah?: string
    jurusan?: string
    jenjang?: string
    address?: string
    fileResume?: string
    fileApply?: string
    fileOther?: string
    createdAt?: string
    updatedAt?: string
}