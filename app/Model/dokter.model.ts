export class dokterResponse {
    jadwalPraktek?: JadwalDokterResponse[]
    jk?: string
    kd_dokter?: string
    nm_dokter?: string
    no_ijn_praktek?: string
    no_ktp?: string
    photo?: string
    poliklinik?: string
    spesialis?: string
}

export class JadwalDokterResponse {
    hari_kerja?: string
    jam_mulai?: string
    jam_selesai?: string
}