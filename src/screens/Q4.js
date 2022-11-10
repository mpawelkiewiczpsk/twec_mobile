import {StyleSheet, Text, View, Dimensions, SafeAreaView, Platform, StatusBar, TouchableOpacity} from 'react-native';
import { ProgressBar, Button } from 'react-native-paper';
import {Ionicons} from "@expo/vector-icons";
import {useQuestionsContext} from "../contexts/questions";
import CheckIcon from "../components/CheckIcon";
import {useEffect, useState} from "react";
import i18n from '../i18n-config'
import {checkValues} from "../helpers/checkValues";
import {OverlayAlert, OverlayAlertHeight} from "../components/OverlayAlert";


const windowWidth = Dimensions.get('window').width;

export default function Q4({ navigation }) {
    const { answers, setAnswers } = useQuestionsContext();
    const [isDisabled, setIsDisabled] = useState(false);
    const [nav, setNav] = useState('Q5');
    const [viewOffset, setViewOffset] = useState(0);
    const [posY0, setPosY0] = useState(0);
    const [displayAlert, setDisplayAlert] = useState(null)

    const selectAnswer = (key, value) => {
        setAnswers({ ...answers, [key]: value })
    }

    const clearErrorAnswer = () => {
        setAnswers({...answers,
            mpd: { value: '', dl: false}}
        )
    }

    const goBack = () => {
        clearErrorAnswer();
        navigation.replace('Q3')
    }

    useEffect(() => {

        setAnswers({ ...answers, prevNav: 'Q4' });

    }, [])

    useEffect(() => {

        if(answers){
            if(checkValues(answers)){
                setNav('PatientReject')
            }else{
                setNav('Q5')
            }

            setIsDisabled(!answers.mpd?.value)
        }



    }, [answers])

    const hideAlert = () => {
        setDisplayAlert(null)
    }

    return (
        <SafeAreaView style={styles.container}>
            {answers.mpd?.value === 'brak' && displayAlert === 1 &&
            <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset + posY0 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}

            <View style={{flex: 1}}>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>{i18n.t('questions')} 17 {i18n.t('of')} 54</Text>
                <ProgressBar progress={0.25} color="#3C69E7" style={{width: 300, height: 15}}/>
            </View>
            <View style={{flex:9}} onLayout={event => {setViewOffset(event.nativeEvent.layout.y);}}>
                <Text style={styles.question}>{i18n.t('q4a')}</Text>
                <Button style={{marginBottom: 15}}
                        contentStyle={{...styles.buttonStyle, borderColor: answers.mpd?.value === 'hemiparetyczna' ? '#3C69E7' : '#000'}}
                        color={answers.mpd?.value === 'hemiparetyczna' ? "#3C69E7" : "#262626"}
                        mode="outlined"
                        onPress={() => {
                            selectAnswer('mpd', { value: 'hemiparetyczna', 'dl': false })
                            setDisplayAlert(null)
                        }}>
                    {answers.mpd?.value === 'hemiparetyczna' && <CheckIcon/>} {i18n.t('q4b')}
                </Button>
                <Button style={{marginBottom: 15}}
                        contentStyle={{...styles.buttonStyle, borderColor: answers.mpd?.value === 'diplegia' ? '#3C69E7' : '#000'}}
                        color={answers.mpd?.value === 'diplegia' ? "#3C69E7" : "#262626"}
                        mode="outlined"
                        onPress={() => {
                            selectAnswer('mpd', { value: 'diplegia', 'dl': false })
                            setDisplayAlert(null)
                        }}>
                    {answers.mpd?.value === 'diplegia' && <CheckIcon/>} {i18n.t('q4c')}
                </Button>

                <Button style={{marginBottom: 15}}
                        contentStyle={{...styles.buttonStyle, borderColor: answers.mpd?.value === 'tetraplegia' ? '#3C69E7' : '#000'}}
                        color={answers.mpd?.value === 'tetraplegia' ? "#3C69E7" : "#262626"}
                        mode="outlined"
                        onPress={() => {
                            selectAnswer('mpd', { value: 'tetraplegia', 'dl': false })
                            setDisplayAlert(null)
                        }}>
                    {answers.mpd?.value === 'tetraplegia' && <CheckIcon/>} {i18n.t('q4d')}
                </Button>
                <Button style={{marginBottom: 15}}
                        contentStyle={{...styles.buttonStyle, borderColor: answers.mpd?.value === 'inna' ? '#3C69E7' : '#000'}}
                        color={answers.mpd?.value === 'inna' ? "#3C69E7" : "#262626"}
                        mode="outlined"
                        onPress={() => {
                            selectAnswer('mpd', { value: 'inna', 'dl': false })
                            setDisplayAlert(null)
                        }}>
                    {answers.mpd?.value === 'inna' && <CheckIcon/>} {i18n.t('q4e')}
                </Button>

                <View onLayout={event => {setPosY0(event.nativeEvent.layout.y);}}>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.mpd?.value === 'brak' ? '#ff4d4f' : '#000'}}
                            color={answers.mpd?.value === 'brak' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('mpd', { value: 'brak', 'dl': true })
                                setDisplayAlert(1)
                            }}>
                        {answers.mpd?.value === 'brak' && <CheckIcon/>} {i18n.t('q4f')}
                    </Button>
                </View>


            </View>
            <View style={{flex:1, marginTop: 15, marginBottom: 15}}>
                <View style={styles.buttonsDown}>
                <TouchableOpacity style={{...styles.bottomBtn,
                            backgroundColor: '#fff'}}
                            onPress={() => goBack()}>
                            <Text style={styles.btnPrev}><Ionicons name="md-arrow-back" size={16} color="#3C69E7" /> {i18n.t('prev')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.bottomBtn,
                            backgroundColor: isDisabled ? '#ccc' : '#3C69E7',
                            borderColor: isDisabled ? '#ccc' : '#3C69E7'}}
                            disabled={isDisabled}
                            onPress={() => navigation.replace(nav)}>
                            <Text style={styles.btnNext}>{i18n.t('next')} <Ionicons name="md-arrow-forward" size={16} color="#fff" /></Text>
                </TouchableOpacity>
                </View>
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
        height: 50,
        lineHeight: 50,
        borderWidth: 2,
        display: 'flex',
        justifyContent: 'center',
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        width: windowWidth - 80
    },
    buttonsDown: {
        display: 'flex',
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    btnGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnNext:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    btnPrev:{
        color: '#3C69E7',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    bottomBtn:{
        width: (windowWidth / 2) - 40,
        height: 50,
        lineHeight: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3C69E7',
        color: '#3C69E7',
        display: 'flex',
        justifyContent: 'center',
    }
});
