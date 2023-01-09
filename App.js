import {useEffect, useState} from "react";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from "./src/Stack";
import { Provider as PaperProvider } from 'react-native-paper';
import { QuestionsContext } from "./src/contexts/questions";
import i18n from './src/i18n-config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from "@react-native-community/netinfo";
import {registerId, login} from "./src/api";


const initialAnswers = {
    prevNav: '',
    gender: '',
    id: '',
    age: {
        value: null,
        text: '',
        dl: false
    },
    height: {
        value: '',
        de: false
    },
    weight: {
        value: '',
        de: false,
        dp: false
    },
    bmi: '',
    q1: {
        value: '',
        dl: false
    },
    q2: {
        value: '',
        dl: false
    },
    q3: {
        value: '',
        dl: false
    },
    q4: {
        value: '',
        dl: false
    },
    q5: {
        value: '',
        dl: false
    },
    q6: {
        value: '',
        dl: false
    },
    q7: {
        value: '',
        dl: false
    },
    q8: {
        value: '',
        dl: false
    },
    q9: {
        value: '',
        de: false
    },
    q10: {
        value: '',
        db: false
    },
    q11: {
        value: '',
        dp: false
    },
    mpd: {
        value: '',
        dl: false
    },
    kind: {
        value: '',
        dl: false
    },
    gmfcs: {
        value: '',
        dl: false
    },
    gmfm: {
        value: '',
        error: false
    },
    gdi: {
        value: '',
        error: false
    },
    test6m: {
        value: '',
        error: false
    },
    kontaktStopa: '',
    toksynaBotulinowa: '',
    zebrisPref: {
        value: '',
        error: false
    },
    zebrisMax: {
        value: '',
        error: false
    },
    gammaLeft: {
        value: '',
        error: false
    },
    gammaRight: {
        value: '',
        error: false
    },
    alfaOO: {
        value: '',
        error: false
    },
    alfaOZ: {
        value: '',
        error: false
    },
    alfaDyn: {
        value: '',
        error: false
    },
    silaLovettZginaczBiodroLKD: '',
    silaLovettZginaczBiodroPKD: '',
    silaLovettZginaczKolanoLKD: '',
    silaLovettZginaczKolanoPKD: '',
    silaLovettProstownikBiodroLKD: '',
    silaLovettProstownikBiodroPKD: '',
    silaLovettProstownikKolanoLKD: '',
    silaLovettProstownikKolanoPKD: '',
    selektywnoscZginaczBiodroLKD: '',
    selektywnoscZginaczBiodroPKD: '',
    selektywnoscZginaczKolanoLKD: '',
    selektywnoscZginaczKolanoPKD: '',
    selektywnoscProstownikBiodroLKD: '',
    selektywnoscProstownikBiodroPKD: '',
    selektywnoscProstownikKolanoLKD: '',
    selektywnoscProstownikKolanoPKD: '',
    spastycznoscZginaczBiodroLKD: '',
    spastycznoscZginaczBiodroPKD: '',
    spastycznoscZginaczKolanoLKD: '',
    spastycznoscZginaczKolanoPKD: '',
    spastycznoscProstownikBiodroLKD: '',
    spastycznoscProstownikBiodroPKD: '',
    spastycznoscProstownikKolanoLKD: '',
    spastycznoscProstownikKolanoPKD: '',
    dl: false,  // dyskwalifikacja z procesu leczenia
    de: false,  // dyskwalifikacja z terapii, w skład których wchodzi egzoszkielet
    dp: false,  // dyskwalifikacja z terapii, w skład których wchodzą platformy
    db: false,  // dyskwalifikacja z terapii, w skład których wchodzi bieżnia,

}

function generateId(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export default function App() {
    const [idDevice, setIdDevice] = useState(null);
    const [registered, setRegistered] = useState(null);
    const [renderView, setRenderView] = useState(false);
    const [token, setToken] = useState(null);
    const netInfo = useNetInfo();

    const getData = async (name) => {
        try {
            const value = await AsyncStorage.getItem(name)
            if(value !== null) {
                return value
            }else{
                return null
            }
        } catch(e) {
            return null
        }
    }


    useEffect(() => {

        if(netInfo.isConnected){
            console.log('Połączono z internetem')
        }else{
            console.log('Brak połączenia z internetem')
        }

    }, [netInfo])


    const getDataFromDevice = async () => {

        await getData('lang').then(value => {
            if(value !== null) {
                i18n.locale = value
            }else{
                i18n.locale = 'pl'
            }
            setRenderView(true)
        }).catch(() => {
            i18n.locale = 'pl'
            setRenderView(true)
        })

        await getData('id_device').then(async value => {
            if(value !== null){
                setIdDevice(value);
            }else{
                const id = generateId(32);
                await AsyncStorage.setItem('id_device', id)
                setIdDevice(id);
            }
        }).catch((err) => {
            console.log(err)
        })

        await getData('registered').then(value => {
            if(value !== null){
                setRegistered(1);
            }else{
                setRegistered(0);
            }
        }).catch((err) => {
            console.log(err)
        })


    }


    useEffect(() => {

        const getDataFromDeviceEffect = () => getDataFromDevice();

        getDataFromDeviceEffect();

    }, [])


    const getRegisterinfo = async () => {

        if(idDevice){
            if(registered === 0){
                await registerId(idDevice).then(async () => {
                    await AsyncStorage.setItem('registered', 'yes')
                })
            }
            if(registered === 1){
                await login(idDevice).then(resp => {
                    setToken(resp)
                })
            }

        }

    };


    useEffect(() => {

        const getRegisterInfoEffect = () => getRegisterinfo();

        getRegisterInfoEffect()

    }, [idDevice, registered])

  const [answers, setAnswers] = useState(initialAnswers)

  const removeAllAnswers = () => {
        setAnswers(initialAnswers)
  }

  return (
      renderView ? <>
          <QuestionsContext.Provider value={{ answers, setAnswers, removeAllAnswers }}>
              <PaperProvider>
                  <NavigationContainer>
                      <StackNavigation />
                  </NavigationContainer>
              </PaperProvider>
          </QuestionsContext.Provider>
      </> : null
  );
}


