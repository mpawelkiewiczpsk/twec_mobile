import {StyleSheet, Text, View, Dimensions, SafeAreaView, Platform, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useQuestionsContext } from "../contexts/questions";
import {Ionicons} from "@expo/vector-icons";
import CheckIcon from "../components/CheckIcon";
import {useEffect, useState} from "react";
import i18n from '../i18n-config'
import { checkValues } from "../helpers/checkValues";
import {OverlayAlert, OverlayAlertHeight} from "../components/OverlayAlert";

const windowWidth = Dimensions.get('screen').width;

export default function Q1({ navigation }) {
    const { answers, setAnswers } = useQuestionsContext();
    const [isDisabled, setIsDisabled] = useState(false);
    const [nav, setNav] = useState('Q2');
    // Pozycje Y każdego wiersza z przyciskami:
    const [posY0, setPosY0] = useState(0);
    const [posY1, setPosY1] = useState(0);
    const [posY2, setPosY2] = useState(0);
    const [posY3, setPosY3] = useState(0);
    const [displayAlert, setDisplayAlert] = useState(null)
    const [viewOffset, setViewOffset] = useState(0);
    const [viewScroll, setViewScroll] = useState(0);

    const selectAnswer = (key, value) => {

        setAnswers({...answers, [key]: value})
    }

    const clearErrorAnswer = () => {
        setAnswers({...answers,
            q1: { value: '', dl: false},
            q2: { value: '', dl: false},
            q3: { value: '', dl: false},
            q4: { value: '', dl: false}}
        )
    }

    const goBack = () => {
        clearErrorAnswer();
        navigation.replace('PatientData')
    }

    useEffect(() => {

        setAnswers({ ...answers, prevNav: 'Q1' });

    }, [])



    useEffect(() => {

        if(answers){
            if(checkValues(answers)){
                setNav('PatientReject')
            }else{
                setNav('Q2')
            }

            setIsDisabled(!answers.q1?.value || !answers.q2?.value || !answers.q3?.value || !answers.q4?.value)
        }


    }, [answers])

    const hideAlert = () => {
        setDisplayAlert(null)
    }

    return (
        <SafeAreaView style={styles.container}>
            {answers.q1?.value === 'nie' && displayAlert === 1 &&
                <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY0 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}
            {answers.q2?.value === 'obecna' && displayAlert === 2 &&
                <OverlayAlert onClick={() => hideAlert()} arrowLeft="true" style={{top: viewOffset - viewScroll + posY1 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}
            {answers.q3?.value === 'tak' && displayAlert === 3 &&
                <OverlayAlert onClick={() => hideAlert()} arrowLeft="true" style={{top: viewOffset - viewScroll + posY2 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}
            {answers.q4?.value === 'tak' && displayAlert === 4 &&
                <OverlayAlert onClick={() => hideAlert()} arrowLeft="true" style={{top: viewOffset - viewScroll + posY3 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}

            <View style={{flex: 1, marginBottom: 10}}>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>{i18n.t('questions')} 6-9 {i18n.t('of')} 54</Text>
                <ProgressBar progress={0.1} color="#3C69E7" style={{width: 300, height: 15}}/>
            </View>

            <View style={{flex:9}}  onLayout={event => {setViewOffset(event.nativeEvent.layout.y)}}>
                <ScrollView onScroll={event => {setViewScroll(event.nativeEvent.contentOffset.y)}} showsVerticalScrollIndicator={false}>
                <Text style={styles.question}>{i18n.t('q1a')}</Text>
                <View style={{...styles.btnGroup, marginBottom: 15 }} onLayout={event => {setPosY0(event.nativeEvent.layout.y)}}>

                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q1?.value === 'tak' ? '#3C69E7' : '#000'
                    }} onPress={() => {
                        selectAnswer('q1', { value: 'tak', 'dl': false })
                        setDisplayAlert(null)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q1?.value === 'tak' ? "#3C69E7" : "#262626" }}>
                            {answers.q1?.value === 'tak' && <CheckIcon/>} {i18n.t('yes')}
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q1?.value === 'nie' ? '#ff4d4f' : '#000'
                    }} onPress={() => {
                        selectAnswer('q1', { value: 'nie', 'dl': true })
                        setDisplayAlert(1)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q1?.value === 'nie' ? "#3C69E7" : "#262626" }}>
                            {answers.q1?.value === 'nie' && <CheckIcon/>} {i18n.t('no')}
                        </Text>
                    </TouchableOpacity>

                </View>
                <Text style={styles.question}>{i18n.t('q1b')}</Text>
                <View style={{...styles.btnGroup, marginBottom: 15}} onLayout={event => {setPosY1(event.nativeEvent.layout.y)}}>
                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q2?.value === 'obecna' ? '#ff4d4f' : '#000'
                    }} onPress={() => {
                        selectAnswer('q2', { value: 'obecna', 'dl': true })
                        setDisplayAlert(2)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q2?.value === 'obecna' ? "#3C69E7" : "#262626" }}>
                            {answers.q2?.value === 'obecna' && <CheckIcon/>} {i18n.t('present')}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q2?.value === 'brak' ? '#3C69E7' : '#000'
                    }} onPress={() => {
                        selectAnswer('q2', { value: 'brak', 'dl': false })
                        setDisplayAlert(null)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q2?.value === 'brak' ? "#3C69E7" : "#262626" }}>
                            {answers.q2?.value === 'brak' && <CheckIcon/>} {i18n.t('lack')}
                        </Text>
                    </TouchableOpacity>

                </View>
                <Text style={styles.question}>{i18n.t('q1c')}</Text>
                <View style={{...styles.btnGroup, marginBottom: 15 }} onLayout={event => {setPosY2(event.nativeEvent.layout.y)}}>

                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q3?.value === 'tak' ? '#ff4d4f' : '#000'
                    }} onPress={() => {
                        selectAnswer('q3', { value: 'tak', 'dl': true })
                        setDisplayAlert(3)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q3?.value === 'tak' ? "#3C69E7" : "#262626" }}>
                            {answers.q3?.value === 'tak' && <CheckIcon/>} {i18n.t('yes')}
                        </Text>
                    </TouchableOpacity>



                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q3?.value === 'nie' ? '#3C69E7' : '#000'
                    }} onPress={() => {
                        selectAnswer('q3', { value: 'nie', 'dl': false })
                        setDisplayAlert(null)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q3?.value === 'nie' ? "#3C69E7" : "#262626" }}>
                            {answers.q3?.value === 'nie' && <CheckIcon/>} {i18n.t('no')}
                        </Text>
                    </TouchableOpacity>

                </View>
                <Text style={styles.question}>{i18n.t('q1d')}</Text>
                <View style={styles.btnGroup} onLayout={event => {setPosY3(event.nativeEvent.layout.y)}}>


                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q4?.value === 'tak' ? '#ff4d4f' : '#000'
                    }} onPress={() => {
                        selectAnswer('q4', { value: 'tak', 'dl': true })
                        setDisplayAlert(4)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q4?.value === 'tak' ? "#3C69E7" : "#262626" }}>
                            {answers.q4?.value === 'tak' && <CheckIcon/>} {i18n.t('yes')}
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q4?.value === 'nie' ? '#3C69E7' : '#000'
                    }} onPress={() => {
                        selectAnswer('q4', { value: 'nie', 'dl': false })
                        setDisplayAlert(null)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q4?.value === 'nie' ? "#3C69E7" : "#262626" }}>
                            {answers.q4?.value === 'nie' && <CheckIcon/>} {i18n.t('no')}
                        </Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            </View>
            <View style={{flex:1, marginBottom: 15, marginTop: 15}}>
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
        width: (windowWidth / 2) - 60,
        height: 50,
        lineHeight: 50,
        borderWidth: 2,
        display: 'flex',
        justifyContent: 'center',
    },
    buttonTextStyle: {
        textAlign: 'center',
        textTransform: 'uppercase'
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
