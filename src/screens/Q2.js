import {StyleSheet, Text, View, Dimensions, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import { useQuestionsContext } from "../contexts/questions";
import CheckIcon from "../components/CheckIcon";
import {Ionicons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import { ProgressBar, Button } from 'react-native-paper';
import i18n from '../i18n-config'
import {OverlayAlert, OverlayAlertHeight} from "../components/OverlayAlert";
import {checkValues} from "../helpers/checkValues";

const windowWidth = Dimensions.get('window').width;

export default function Q2({ navigation }) {
    const { answers, setAnswers } = useQuestionsContext();
    const [isDisabled, setIsDisabled] = useState(false);
    const [nav, setNav] = useState('Q3');
    const [posY0, setPosY0] = useState(0);
    const [posY1, setPosY1] = useState(0);
    const [posY2, setPosY2] = useState(0);
    const [posY3, setPosY3] = useState(0);
    const [displayAlert, setDisplayAlert] = useState(null)
    const [viewOffset, setViewOffset] = useState(0);
    const [viewScroll, setViewScroll] = useState(0);

    const selectAnswer = (key, value) => {
        setAnswers({ ...answers, [key]: value })
    }

    const clearErrorAnswer = () => {
        setAnswers({...answers,
            q5: { value: '', dl: false},
            q6: { value: '', dl: false},
            q7: { value: '', dl: false},
            q8: { value: '', dl: false}}
        )
    }

    const goBack = () => {
        clearErrorAnswer();
        navigation.replace('Q1')
    }

    useEffect(() => {

        setAnswers({ ...answers, prevNav: 'Q2' });

    }, [])

    useEffect(() => {

        if(answers){
            if(checkValues(answers)){
                setNav('PatientReject')
            }else{
                setNav('Q3')
            }

            setIsDisabled(!answers.q5?.value || !answers.q6?.value || !answers.q7?.value || !answers.q8?.value)
        }


    }, [answers])

    const hideAlert = () => {
        setDisplayAlert(null)
    }

    return (
        <SafeAreaView style={styles.container}>
            {answers.q5?.value === '>' && displayAlert === 1 &&
            <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY0 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}
            {answers.q6?.value === '>' && displayAlert === 2 &&
            <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY1 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}
            {answers.q7?.value === '>' && displayAlert === 3 &&
            <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY2 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}
            {answers.q8?.value === '>' && displayAlert === 4 &&
            <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY3 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}

            <View style={{flex: 1, marginBottom: 10}}>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>{i18n.t('questions')} 10-13 {i18n.t('of')} 54</Text>
                <ProgressBar progress={0.15} color="#3C69E7" style={{width: 300, height: 15}}/>
            </View>
            <View style={{flex:9}} onLayout={event => {setViewOffset(event.nativeEvent.layout.y);}}>
                <ScrollView onScroll={event => {setViewScroll(event.nativeEvent.contentOffset.y)}} showsVerticalScrollIndicator={false}>
                <Text style={styles.question}>{i18n.t('q2a')}</Text>
                <Text style={styles.question} >{i18n.t('lll')}</Text>
                <View style={styles.btnGroup} onLayout={event => {setPosY0(event.nativeEvent.layout.y);}}>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.q5?.value === '<=' ? '#3C69E7' : '#000'}}
                            color={answers.q5?.value === '<=' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('q5', { value: '<=', 'dl': false })
                                setDisplayAlert(null)
                            }}>
                        {answers.q5?.value === '<=' && <CheckIcon/>} &lt;= 6
                    </Button>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.q5?.value === '>' ? '#ff4d4f' : '#000'}}
                            color={answers.q5?.value === '>' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('q5', { value: '>', 'dl': true })
                                setDisplayAlert(1)
                            }}>
                        {answers.q5?.value === '>' && <CheckIcon/>} > 6
                    </Button>
                </View>
                <Text style={styles.question}>{i18n.t('rll')}</Text>
                <View style={styles.btnGroup} onLayout={event => {setPosY1(event.nativeEvent.layout.y);}}>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.q6?.value === '<=' ? '#3C69E7' : '#000'}}
                            color={answers.q6?.value === '<=' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('q6', { value: '<=', 'dl': false })
                                setDisplayAlert(null)
                            }}>
                        {answers.q6?.value === '<=' && <CheckIcon/>} &lt;= 6
                    </Button>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.q6?.value === '>' ? '#ff4d4f' : '#000'}}
                            color={answers.q6?.value === '>' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('q6', { value: '>', 'dl': true })
                                setDisplayAlert(2)
                            }}>
                        {answers.q6?.value === '>' && <CheckIcon/>} > 6
                    </Button>
                </View>
                <Text style={styles.question}>{i18n.t('q2b')}</Text>
                <Text style={styles.question}>{i18n.t('lll')}</Text>

                <View style={styles.btnGroup} onLayout={event => {setPosY2(event.nativeEvent.layout.y);}}>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.q7?.value === '<=' ? '#3C69E7' : '#000'}}
                            color={answers.q7?.value === '<=' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('q7', { value: '<=', 'dl': false })
                                setDisplayAlert(null)
                            }}>
                        {answers.q7?.value === '<=' && <CheckIcon/>} &lt;= 12
                    </Button>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.q7?.value === '>' ? '#ff4d4f' : '#000'}}
                            color={answers.q7?.value === '>' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('q7', { value: '>', 'dl': true })
                                setDisplayAlert(3)
                            }}>
                        {answers.q7?.value === '>' && <CheckIcon/>} > 12
                    </Button>
                </View>
                <Text style={styles.question}>{i18n.t('rll')}</Text>
                <View style={styles.btnGroup} onLayout={event => {setPosY3(event.nativeEvent.layout.y);}}>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.q8?.value === '<=' ? '#3C69E7' : '#000'}}
                            color={answers.q8?.value === '<=' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('q8', { value: '<=', 'dl': false })
                                setDisplayAlert(null)
                            }}>
                        {answers.q8?.value === '<=' && <CheckIcon/>} &lt;= 12
                    </Button>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.q8?.value === '>' ? '#ff4d4f' : '#000'}}
                            color={answers.q8?.value === '>' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => {
                                selectAnswer('q8', { value: '>', 'dl': true })
                                setDisplayAlert(4)
                            }}>
                        {answers.q8?.value === '>' && <CheckIcon/>} > 12
                    </Button>
                </View>
                </ScrollView>
            </View>
            <View style={{flex:1, marginTop: 15, marginBottom: 15}}>
                <View style={styles.buttonsDown}>
                    <TouchableOpacity style={{...styles.bottomBtn,
                        backgroundColor: '#fff',
                        borderColor: '#3C69E7'}}
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
        width: (windowWidth / 2) - 60,
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
    },
});
