export class BangsalDTO {
    kd_bangsal?: string
    nm_bangsal?: string
    kamars?: kamarDTO[]
}

export class kamarDTO {
    kd_kamar?: string
    kd_bangsal?: string
    trf_kamar?: number
    status?: string
    kelas?: string
}