export class MagangResponse {
    id?: string
    name?: string
    desc?: string
    dateStart?: string
    dateEnd?: string
    createdAt?: string
    updatedAt?: string
    applicationMagang?: ApplyMagangResponse[]
}

export class ApplyMagangResponse {
    id?: string
    nik?: number
    no_wa?: string
    email?: string
    fullName?: string
    tanggalLahir?: string
    magang?: MagangResponse
    MagangId?: string
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