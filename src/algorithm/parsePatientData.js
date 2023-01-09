const getMpdValue = (mpd) => {
    if(mpd === 'hemiparetyczna' || mpd === 'hemiplegia') return 3
    if(mpd === 'diplegia') return 2
    if(mpd === 'tetraplegia') return 1

    return 0
}

const getKindMpdValue = (kind) => {
    if(kind === 'spastyczna') return 1
    if(kind === 'mieszana') return 2
    if(kind === 'inna') return 3

    return 0
}

const getGmfcsValue = (gmfcs) => {
    if(gmfcs === 'I') return 0
    if(gmfcs === 'II') return 1
    if(gmfcs === 'III') return 2
    if(gmfcs === 'IV') return 3
    if(gmfcs === 'V') return 4

    return 0
}


export const patientData = (answers) => ({
    gender: answers.gender === "female" ? 0 : 1,
    age: answers.age?.value,
    height: answers.height?.value,
    weight: answers.weight?.value,
    bmi: answers.bmi,
    mpd: getMpdValue(answers.mpd?.value),
    kind: getKindMpdValue(answers.kind?.value),
    gmfcs: getGmfcsValue(answers.gmfcs?.value),
    gmfm: answers.gmfm?.value,
    gdi: answers.gdi?.value,
    test6m: answers.test6m?.value,
    kontaktStopa: answers.kontaktStopa === 'od pięty' ? 2 : 1,
    zebrisPref: answers.zebrisPref?.value,
    zebrisMax: answers.zebrisMax?.value,
    gammaRight: answers.gammaRight?.value || 0,
    gammaLeft: answers.gammaLeft?.value || 0,
    alfaOO: answers.alfaOO?.value || 0,
    alfaOZ: answers.alfaOZ?.value || 0,
    alfaDyn: answers.alfaDyn?.value || 0,
    silaLovettZginaczBiodroPKD: answers.silaLovettZginaczBiodroPKD,
    silaLovettZginaczBiodroLKD: answers.silaLovettZginaczBiodroLKD,
    silaLovettZginaczKolanoPKD: answers.silaLovettZginaczKolanoPKD,
    silaLovettZginaczKolanoLKD: answers.silaLovettZginaczKolanoLKD,
    silaLovettProstownikBiodroPKD: answers.silaLovettProstownikBiodroPKD,
    silaLovettProstownikBiodroLKD: answers.silaLovettProstownikBiodroLKD,
    silaLovettProstownikKolanoPKD: answers.silaLovettProstownikKolanoPKD,
    silaLovettProstownikKolanoLKD: answers.silaLovettProstownikKolanoLKD,
    selektywnoscZginaczBiodroPKD: answers.selektywnoscZginaczBiodroPKD,
    selektywnoscZginaczBiodroLKD: answers.selektywnoscZginaczBiodroLKD,
    selektywnoscZginaczKolanoPKD: answers.selektywnoscZginaczKolanoPKD,
    selektywnoscZginaczKolanoLKD: answers.selektywnoscZginaczKolanoLKD,
    selektywnoscProstownikBiodroPKD: answers.selektywnoscProstownikBiodroPKD,
    selektywnoscProstownikBiodroLKD: answers.selektywnoscProstownikBiodroLKD,
    selektywnoscProstownikKolanoPKD: answers.selektywnoscProstownikKolanoPKD,
    selektywnoscProstownikKolanoLKD: answers.selektywnoscProstownikKolanoLKD,
    spastycznoscZginaczBiodroPKD: answers.spastycznoscZginaczBiodroPKD === '1+' ? 1.5 : answers.spastycznoscZginaczBiodroPKD,
    spastycznoscZginaczBiodroLKD: answers.spastycznoscZginaczBiodroLKD === '1+' ? 1.5 : answers.spastycznoscZginaczBiodroLKD,
    spastycznoscZginaczKolanoPKD: answers.spastycznoscZginaczKolanoPKD === '1+' ? 1.5 : answers.spastycznoscZginaczKolanoPKD,
    spastycznoscZginaczKolanoLKD: answers.spastycznoscZginaczKolanoLKD === '1+' ? 1.5 : answers.spastycznoscZginaczKolanoLKD,
    spastycznoscProstownikBiodroPKD: answers.spastycznoscProstownikBiodroPKD === '1+' ? 1.5 : answers.spastycznoscProstownikBiodroPKD,
    spastycznoscProstownikBiodroLKD: answers.spastycznoscProstownikBiodroLKD === '1+' ? 1.5 : answers.spastycznoscProstownikBiodroLKD,
    spastycznoscProstownikKolanoPKD: answers.spastycznoscProstownikKolanoPKD === '1+' ? 1.5 : answers.spastycznoscProstownikKolanoPKD,
    spastycznoscProstownikKolanoLKD: answers.spastycznoscProstownikKolanoLKD === '1+' ? 1.5 : answers.spastycznoscProstownikKolanoLKD,
    toksynaBotulinowa: answers.toksynaBotulinowa === 'tak' ? 1 : 2
})
