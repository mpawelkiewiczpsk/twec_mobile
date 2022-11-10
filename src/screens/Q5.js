import {StyleSheet, Text, View, Dimensions, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import { ProgressBar, Button } from 'react-native-paper';
import CheckIcon from "../components/CheckIcon";
import {Ionicons} from "@expo/vector-icons";
import {useQuestionsContext} from "../contexts/questions";
import {useEffect, useState} from "react";
import i18n from '../i18n-config'
import {checkValues} from "../helpers/checkValues";
import {OverlayAlert, OverlayAlertHeight} from "../components/OverlayAlert";

const windowWidth = Dimensions.get('window').width;

export default function Q5({ navigation }) {
    const { answers, setAnswers } = useQuestionsContext();
    const [isDisabled, setIsDisabled] = useState(false);
    const [nav, setNav] = useState('Q6');
    const [viewOffset, setViewOffset] = useState(0);
    const [viewScroll, setViewScroll] = useState(0);
    const [displayAlert, setDisplayAlert] = useState(null)
    const [posY0, setPosY0] = useState(0);
    const [posY1, setPosY1] = useState(0);

    const selectAnswer = (key, value) => {
        setAnswers({ ...answers, [key]: value })
    }

    const clearErrorAnswer = () => {
        setAnswers({...answers,
            kind: { value: '', dl: false},
            gmfcs: { value: '', dl: false}}
        )
    }

    const goBack = () => {
        clearErrorAnswer();
        navigation.replace('Q4')
    }

    useEffect(() => {

        setAnswers({ ...answers, prevNav: 'Q5' });

    }, [])

    useEffect(() => {

        if(answers){
            if(checkValues(answers)){
                setNav('PatientReject')
            }else{
                setNav('Q6')
            }

            setIsDisabled(!answers.kind?.value || !answers.gmfcs?.value)
        }



    }, [answers])

    const hideAlert = () => {
        setDisplayAlert(null)
    }

    return (
        <SafeAreaView style={styles.container}>
            {answers.kind?.value === 'brak' && displayAlert === 1 &&
            <OverlayAlert onClick={() => hideAlert()} arrowLeft="true" style={{top: viewOffset - viewScroll + posY0 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}

            {answers.gmfcs?.value === 'V' && displayAlert === 2 &&
            <OverlayAlert onClick={() => hideAlert()} arrowLeft="true" style={{top: viewOffset - viewScroll + posY1 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}

            <View style={{flex: 1}}>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>{i18n.t('questions')} 18-19 {i18n.t('of')} 54</Text>
                <ProgressBar progress={0.35} color="#3C69E7" style={{width: 300, height: 15}}/>
            </View>
            <View style={{flex:9}} onLayout={event => {setViewOffset(event.nativeEvent.layout.y)}}>
                <ScrollView onScroll={event => {setViewScroll(event.nativeEvent.contentOffset.y)}} showsVerticalScrollIndicator={false}>
                <Text style={styles.question}>{i18n.t('q5a')}</Text>
                <View style={styles.btnGroup2}>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle2, borderColor: answers.kind?.value === 'spastyczna' ? '#3C69E7' : '#000'}}
                            color={answers.kind?.value === 'spastyczna' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('kind', { value: 'spastyczna', 'dl': false });
                                setDisplayAlert(null)
                            }}>
                        {answers.kind?.value === 'spastyczna' && <CheckIcon/>} {i18n.t('q5b')}
                    </Button>

                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle2, borderColor: answers.kind?.value === 'mieszana' ? '#3C69E7' : '#000'}}
                            color={answers.kind?.value === 'mieszana' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('kind', { value: 'mieszana', 'dl': false });
                                setDisplayAlert(null)
                            }}>
                        {answers.kind?.value === 'mieszana' && <CheckIcon/>} {i18n.t('q5c')}
                    </Button>

                </View>
                <View style={styles.btnGroup2} onLayout={event => {setPosY0(event.nativeEvent.layout.y);}}>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle2, borderColor: answers.kind?.value === 'brak' ? '#ff4d4f' : '#000'}}
                            color={answers.kind?.value === 'brak' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('kind', { value: 'brak', 'dl': true });
                                setDisplayAlert(1)
                            }}>
                        {answers.kind?.value === 'brak' && <CheckIcon/>} {i18n.t('q5d')}
                    </Button>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle2, borderColor: answers.kind?.value === 'inna' ? '#3C69E7' : '#000'}}
                            color={answers.kind?.value === 'inna' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('kind', { value: 'inna', 'dl': false })
                                setDisplayAlert(null)
                            }}>
                        {answers.kind?.value === 'inna' && <CheckIcon/>} {i18n.t('q5e')}
                    </Button>
                </View>

                <Text style={styles.question}>{i18n.t('q5f')}</Text>
                <View style={styles.btnGroup}>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.gmfcs?.value === 'I' ? '#3C69E7' : '#000'}}
                            color={answers.gmfcs?.value === 'I' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('gmfcs', { value: 'I', 'dl': false })
                                setDisplayAlert(null)
                            }}>
                        {answers.gmfcs?.value === 'I' && <CheckIcon/>} I
                    </Button>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.gmfcs?.value === 'II' ? '#3C69E7' : '#000'}}
                            color={answers.gmfcs?.value === 'II' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('gmfcs', { value: 'II', 'dl': false })
                                setDisplayAlert(null)
                            }}>
                        {answers.gmfcs?.value === 'II' && <CheckIcon/>} II
                    </Button>
                </View>
                <View style={styles.btnGroup}>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.gmfcs?.value === 'III' ? '#3C69E7' : '#000'}}
                            color={answers.gmfcs?.value === 'III' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('gmfcs', { value: 'III', 'dl': false })
                                setDisplayAlert(null)
                            }}>
                        {answers.gmfcs?.value === 'III' && <CheckIcon/>} III
                    </Button>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.gmfcs?.value === 'IV' ? '#3C69E7' : '#000'}}
                            color={answers.gmfcs?.value === 'IV' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('gmfcs', { value: 'IV', 'dl': false })
                                setDisplayAlert(null)
                            }}>
                        {answers.gmfcs?.value === 'IV' && <CheckIcon/>} IV
                    </Button>
                </View>
                <View onLayout={event => {setPosY1(event.nativeEvent.layout.y);}}>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, width: windowWidth - 50, borderColor: answers.gmfcs?.value === 'V' ? '#ff4d4f' : '#000'}}
                            color={answers.gmfcs?.value === 'V' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('gmfcs', { value: 'V', 'dl': true })
                                setDisplayAlert(2)
                            }}>
                        {answers.gmfcs?.value === 'V' && <CheckIcon/>} V
                    </Button>
                </View>
                    </ScrollView>
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
        width: (windowWidth / 2) - 40,
        height: 50,
        lineHeight: 50,
        borderWidth: 2,
        display: 'flex',
        justifyContent: 'center',
    },
    buttonStyle2: {
        width: windowWidth - 50,
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
    btnGroup2: {
        display: 'flex',
        flexDirection: 'column'
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
