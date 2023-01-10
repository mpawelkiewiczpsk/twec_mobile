export const checkValues = (answers) => {

    let dsc = {
        dl: false,
        de: false,
        dp: false,
        db: false
    }
    Object.keys(answers).forEach(key => {
        if(answers[key]?.dl) dsc.dl = true;
        if(answers[key]?.de) dsc.de = true;
        if(answers[key]?.dp) dsc.dp = true;
        if(answers[key]?.db) dsc.db = true;
    })

    return dsc.dl || (dsc.de && dsc.dp && dsc.db)
}

export const checkValuesForTherapy = (answers) => {

    let dsc = {
        de: false,
        dp: false,
        db: false
    }
    Object.keys(answers).forEach(key => {
        if(answers[key]?.de) dsc.de = true;
        if(answers[key]?.dp) dsc.dp = true;
        if(answers[key]?.db) dsc.db = true;
    })

    return dsc
}

