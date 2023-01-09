import coefficients from './coefficients.json'


const calculateMoreOrLessThan5Percent = (ascendingOrder, percentageChange) => {

    let result;
    if (ascendingOrder) {
        if (percentageChange > 5.0)
            result = 1;
        else if (percentageChange < -5.0)
            result = -1;
        else
            result = 0;
    } else {
        if (percentageChange > 5.0)
            result = -1;
        else if (percentageChange < -5.0)
            result = 1;
        else
            result = 0;
    }
    return result;

}


export const calculateStratificationForPerTherapy = (therapyName, patientData) => {

    let gdi = calculateStratificationForGDI(coefficients.filter(item => item.terapia === therapyName), patientData);
    let alfa = calculateStratificationForAlfa(coefficients.filter(item => item.terapia === therapyName), patientData);
    let test6m = calculateStratificationForTest6m(coefficients.filter(item => item.terapia === therapyName), patientData);
    let speed = calculateStratificationForSpeed(coefficients.filter(item => item.terapia === therapyName), patientData);
    let lovett = calculateStratificationForLovett(coefficients.filter(item => item.terapia === therapyName), patientData);


    let therapyStratification = gdi + alfa + test6m + speed + lovett;

    if(therapyStratification < 0) therapyStratification = 0;

    therapyStratification =  therapyStratification * 20;

    return therapyStratification;

}

const calculateStratificationForGDI = (coefficientsByTherapy, patientData) => {

    const coefficientByGDI = coefficientsByTherapy.find(item => item.target === 'gdi')

    let prediction = parseFloat(coefficientByGDI.intercept);

    for (const [key, value] of Object.entries(patientData)) {
        prediction += parseFloat(value) * parseFloat(coefficientByGDI[key])
    }


    let percentageChange = 100 * (prediction - patientData.gdi) / patientData.gdi

    return calculateMoreOrLessThan5Percent(true, percentageChange)

}

const calculateStratificationForAlfa = (coefficientsByTherapy, patientData) => {

    const coefficientByAlfaOO = coefficientsByTherapy.find(item => item.target === 'alfaOO')
    const coefficientByAlfaOZ = coefficientsByTherapy.find(item => item.target === 'alfaOZ')
    const coefficientByAlfaDyn = coefficientsByTherapy.find(item => item.target === 'alfaDyn')

    let predictionAlfaOO = parseFloat(coefficientByAlfaOO.intercept);
    let predictionAlfaOZ = parseFloat(coefficientByAlfaOZ.intercept);
    let predictionAlfaDyn = parseFloat(coefficientByAlfaDyn.intercept);

    for (const [key, value] of Object.entries(patientData)) {
        predictionAlfaOO += parseFloat(value) * parseFloat(coefficientByAlfaOO[key])
        predictionAlfaOZ += parseFloat(value) * parseFloat(coefficientByAlfaOZ[key])
        predictionAlfaDyn += parseFloat(value) * parseFloat(coefficientByAlfaDyn[key])
    }



    let percentageChangeAlfaOO = 100 * (predictionAlfaOO - patientData.alfaOO) / patientData.alfaOO
    let percentageChangeAlfaOZ = 100 * (predictionAlfaOZ - patientData.alfaOZ) / patientData.alfaOZ
    let percentageChangeAlfaDyn = 100 * (predictionAlfaDyn - patientData.alfaDyn) / patientData.alfaDyn

    let result =
        calculateMoreOrLessThan5Percent(false, percentageChangeAlfaOO) +
        calculateMoreOrLessThan5Percent(false, percentageChangeAlfaOZ) +
        calculateMoreOrLessThan5Percent(false, percentageChangeAlfaDyn)

    result = Math.round(result / 3);

    return result

}

const calculateStratificationForTest6m = (coefficientsByTherapy, patientData) => {

    const coefficientByTest6m = coefficientsByTherapy.find(item => item.target === 'test6m')

    let prediction = parseFloat(coefficientByTest6m.intercept);

    for (const [key, value] of Object.entries(patientData)) {
        prediction += parseFloat(value) * parseFloat(coefficientByTest6m[key])
    }

    let percentageChange = 100 * (prediction - patientData.test6m) / patientData.test6m

    return calculateMoreOrLessThan5Percent(true, percentageChange)

}

const calculateStratificationForSpeed = (coefficientsByTherapy, patientData) => {

    const coefficientByZebrisPref = coefficientsByTherapy.find(item => item.target === 'zebrisPref')
    const coefficientByZebrisMax = coefficientsByTherapy.find(item => item.target === 'zebrisMax')

    let predictionZebrisPref = parseFloat(coefficientByZebrisPref.intercept);
    let predictionZebrisMax = parseFloat(coefficientByZebrisMax.intercept);


    for (const [key, value] of Object.entries(patientData)) {
        predictionZebrisPref += parseFloat(value) * parseFloat(coefficientByZebrisPref[key])
        predictionZebrisMax += parseFloat(value) * parseFloat(coefficientByZebrisMax[key])
    }



    let percentageChangeZebrisPref = 100 * (predictionZebrisPref - patientData.zebrisPref) / patientData.zebrisPref
    let percentageChangeZebrisMax = 100 * (predictionZebrisMax - patientData.zebrisMax) / patientData.zebrisMax

    let result =
        calculateMoreOrLessThan5Percent(true, percentageChangeZebrisPref) +
        calculateMoreOrLessThan5Percent(true, percentageChangeZebrisMax)

    result = Math.round(result / 2);

    return result

}


const calculateStratificationForLovett = (coefficientsByTherapy, patientData) => {

    const coefficientBySilaLovettZginaczBiodroPKD = coefficientsByTherapy.find(item => item.target === 'silaLovettZginaczBiodroPKD')
    const coefficientBySilaLovettZginaczBiodroLKD = coefficientsByTherapy.find(item => item.target === 'silaLovettZginaczBiodroLKD')
    const coefficientBySilaLovettZginaczKolanoPKD = coefficientsByTherapy.find(item => item.target === 'silaLovettZginaczKolanoPKD')
    const coefficientBySilaLovettZginaczKolanoLKD = coefficientsByTherapy.find(item => item.target === 'silaLovettZginaczKolanoLKD')
    const coefficientBySilaLovettProstownikBiodroPKD = coefficientsByTherapy.find(item => item.target === 'silaLovettProstownikBiodroPKD')
    const coefficientBySilaLovettProstownikBiodroLKD = coefficientsByTherapy.find(item => item.target === 'silaLovettProstownikBiodroLKD')
    const coefficientBySilaLovettProstownikKolanoPKD = coefficientsByTherapy.find(item => item.target === 'silaLovettProstownikKolanoPKD')
    const coefficientBySilaLovettProstownikKolanoLKD = coefficientsByTherapy.find(item => item.target === 'silaLovettProstownikKolanoLKD')




    let predictionSilaLovettZginaczBiodroPKD = parseFloat(coefficientBySilaLovettZginaczBiodroPKD.intercept);
    let predictionSilaLovettZginaczBiodroLKD = parseFloat(coefficientBySilaLovettZginaczBiodroLKD.intercept);
    let predictionSilaLovettZginaczKolanoPKD = parseFloat(coefficientBySilaLovettZginaczKolanoPKD.intercept);
    let predictionSilaLovettZginaczKolanoLKD = parseFloat(coefficientBySilaLovettZginaczKolanoLKD.intercept);
    let predictionSilaLovettProstownikBiodroPKD = parseFloat(coefficientBySilaLovettProstownikBiodroPKD.intercept);
    let predictionSilaLovettProstownikBiodroLKD = parseFloat(coefficientBySilaLovettProstownikBiodroLKD.intercept);
    let predictionSilaLovettProstownikKolanoPKD = parseFloat(coefficientBySilaLovettProstownikKolanoPKD.intercept);
    let predictionSilaLovettProstownikKolanoLKD = parseFloat(coefficientBySilaLovettProstownikKolanoLKD.intercept);

    for (const [key, value] of Object.entries(patientData)) {
        predictionSilaLovettZginaczBiodroPKD += parseFloat(value) * parseFloat(coefficientBySilaLovettZginaczBiodroPKD[key])
        predictionSilaLovettZginaczBiodroLKD += parseFloat(value) * parseFloat(coefficientBySilaLovettZginaczBiodroLKD[key])
        predictionSilaLovettZginaczKolanoPKD += parseFloat(value) * parseFloat(coefficientBySilaLovettZginaczKolanoPKD[key])
        predictionSilaLovettZginaczKolanoLKD += parseFloat(value) * parseFloat(coefficientBySilaLovettZginaczKolanoLKD[key])
        predictionSilaLovettProstownikBiodroPKD += parseFloat(value) * parseFloat(coefficientBySilaLovettProstownikBiodroPKD[key])
        predictionSilaLovettProstownikBiodroLKD += parseFloat(value) * parseFloat(coefficientBySilaLovettProstownikBiodroLKD[key])
        predictionSilaLovettProstownikKolanoPKD += parseFloat(value) * parseFloat(coefficientBySilaLovettProstownikKolanoPKD[key])
        predictionSilaLovettProstownikKolanoLKD += parseFloat(value) * parseFloat(coefficientBySilaLovettProstownikKolanoLKD[key])
    }


    let percentageChangeSilaLovettZginaczBiodroPKD = 100 * (predictionSilaLovettZginaczBiodroPKD - patientData.silaLovettZginaczBiodroPKD) / patientData.silaLovettZginaczBiodroPKD
    let percentageChangeSilaLovettZginaczBiodroLKD = 100 * (predictionSilaLovettZginaczBiodroLKD - patientData.silaLovettZginaczBiodroLKD) / patientData.silaLovettZginaczBiodroLKD
    let percentageChangeSilaLovettZginaczKolanoPKD = 100 * (predictionSilaLovettZginaczKolanoPKD - patientData.silaLovettZginaczKolanoPKD) / patientData.silaLovettZginaczKolanoPKD
    let percentageChangeSilaLovettZginaczKolanoLKD = 100 * (predictionSilaLovettZginaczKolanoLKD - patientData.silaLovettZginaczKolanoLKD) / patientData.silaLovettZginaczKolanoLKD
    let percentageChangeSilaLovettProstownikBiodroPKD = 100 * (predictionSilaLovettProstownikBiodroPKD - patientData.silaLovettProstownikBiodroPKD) / patientData.silaLovettProstownikBiodroPKD
    let percentageChangeSilaLovettProstownikBiodroLKD = 100 * (predictionSilaLovettProstownikBiodroLKD - patientData.silaLovettProstownikBiodroLKD) / patientData.silaLovettProstownikBiodroLKD
    let percentageChangeSilaLovettProstownikKolanoPKD = 100 * (predictionSilaLovettProstownikKolanoPKD - patientData.silaLovettProstownikKolanoPKD) / patientData.silaLovettProstownikKolanoPKD
    let percentageChangeSilaLovettProstownikKolanoLKD = 100 * (predictionSilaLovettProstownikKolanoLKD - patientData.silaLovettProstownikKolanoLKD) / patientData.silaLovettProstownikKolanoLKD

    let result =
        calculateMoreOrLessThan5Percent(true, percentageChangeSilaLovettZginaczBiodroPKD) +
        calculateMoreOrLessThan5Percent(true, percentageChangeSilaLovettZginaczBiodroLKD) +
        calculateMoreOrLessThan5Percent(true, percentageChangeSilaLovettZginaczKolanoPKD) +
        calculateMoreOrLessThan5Percent(true, percentageChangeSilaLovettZginaczKolanoLKD) +
        calculateMoreOrLessThan5Percent(true, percentageChangeSilaLovettProstownikBiodroPKD) +
        calculateMoreOrLessThan5Percent(true, percentageChangeSilaLovettProstownikBiodroLKD) +
        calculateMoreOrLessThan5Percent(true, percentageChangeSilaLovettProstownikKolanoPKD) +
        calculateMoreOrLessThan5Percent(true, percentageChangeSilaLovettProstownikKolanoLKD)


    result = Math.round(result / 8);

    return result

}
