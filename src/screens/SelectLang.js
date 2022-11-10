import {StyleSheet, Text, View, Dimensions, SafeAreaView, Platform, StatusBar, Image, TouchableOpacity} from 'react-native';
import CheckIcon from "../components/CheckIcon";
import {useEffect, useState} from "react";
import i18n from '../i18n-config'
import {Ionicons} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForceUpdate } from "../hooks/useForceUpdate";


const windowWidth = Dimensions.get('window').width;



export default function SelectLang({ navigation }) {
    const [selectedLang, setSelectedLang] = useState('');
    const forceUpdate = useForceUpdate();
    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('lang', value)
        } catch (e) {
            console.log(e)
        }
    }

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('lang')
            if(value !== null) {
                setSelectedLang(value);
            }else{
                setSelectedLang('pl');
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const selectLang = () => {
        navigation.replace('Home', {
            lang: selectedLang
        })
    }


    useEffect(() => {

        i18n.locale = selectedLang
        forceUpdate();

        storeData(selectedLang)

    }, [selectedLang])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.langList}>
                <Text style={styles.title}>{i18n.t('selectLang')} </Text>
                <TouchableOpacity style={{...styles.buttonStyle, borderColor: selectedLang === 'pl' ? '#3C69E7' : '#D1D5E1', marginBottom: 15}}
                        color={selectedLang === 'pl' ? "#3C69E7" : "#262626"}
                        mode="outlined"
                        onPress={() => setSelectedLang('pl')}>
                    <View style={styles.langStyle}>
                        <View style={styles.lang}>
                            <Image width={52} height={35} source={require("./../img/flags/pl.png")}/>
                            <Text style={{color: '#262626', marginLeft: 15}}>Polski</Text>
                        </View>
                        <View>
                            {selectedLang === 'pl' ? <CheckIcon/> : <View style={{width:18}}/>}
                        </View>

                    </View>


                </TouchableOpacity>
                <TouchableOpacity style={{...styles.buttonStyle, borderColor: selectedLang === 'en' ? '#3C69E7' : '#D1D5E1',marginBottom: 15}}
                        color={selectedLang === 'en' ? "#3C69E7" : "#D1D5E1"}
                        mode="outlined"
                        onPress={() => setSelectedLang('en')}>
                    <View style={styles.langStyle}>
                        <View style={styles.lang}>
                            <Image width={52} height={35} source={require("./../img/flags/uk.png")}/>
                            <Text style={{color: '#262626', marginLeft: 15}}>English</Text>
                        </View>
                        <View>
                            {selectedLang === 'en' ? <CheckIcon/> : <View style={{width:18}}/>}
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
            <View style={{flex:1}}>
                <TouchableOpacity style={{...styles.bottomBtn, backgroundColor: '#3C69E7'}}
                        icon="arrow-right"
                        mode="contained"
                        onPress={selectLang}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                        {i18n.t('next')}
                        <Ionicons name="md-arrow-forward" size={16} color="#fff" />
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        width: windowWidth - 60,
        height: 70,
        borderWidth: 2,
        padding: 15
    },
    lang: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: '#262626',
        fontSize: 16
    },
    langStyle: {
      flex: 1,
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
    },
    btnGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomBtn:{
        width: windowWidth - 40,
        height: 50,
        lineHeight: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3C69E7',
        color: '#3C69E7',
        display: 'flex',
        justifyContent: 'center',
    },
    langList: {
        flex:9,
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        color: '#262626',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 35,
    }
});
