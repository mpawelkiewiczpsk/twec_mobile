import {StyleSheet, Text, View, Dimensions, SafeAreaView, Platform, StatusBar, TouchableOpacity} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useQuestionsContext } from "../contexts/questions";
import {Ionicons} from "@expo/vector-icons";
import CheckIcon from "../components/CheckIcon";
import {useEffect, useState} from "react";
import i18n from '../i18n-config'
import {OverlayAlert, OverlayAlertHeight} from "../components/OverlayAlert";
import {checkValues} from "../helpers/checkValues";

const windowWidth = Dimensions.get('window').width;

export default function Q3({ navigation }) {
    const { answers, setAnswers } = useQuestionsContext();
    const [isDisabled, setIsDisabled] = useState(false);
    const [nav, setNav] = useState('Q4');
    const [posY0, setPosY0] = useState(0);
    const [posY1, setPosY1] = useState(0);
    const [posY2, setPosY2] = useState(0);
    const [displayAlert, setDisplayAlert] = useState(null)
    const [viewOffset, setViewOffset] = useState(0);

    const selectAnswer = (key, value) => {
        setAnswers({ ...answers, [key]: value })
    }

    const clearErrorAnswer = () => {
        setAnswers({...answers,
            q9: { value: '', de: false},
            q10: { value: '', db: false},
            q11: { value: '', dp: false}}
        )
    }

    const goBack = () => {
        clearErrorAnswer();
        navigation.replace('Q2')
    }

    useEffect(() => {

        setAnswers({ ...answers, prevNav: 'Q3' });

    }, [])

    useEffect(() => {

        if(answers){
            if(checkValues(answers)){
                setNav('PatientReject')
            }else{
                setNav('Q4')
            }

            setIsDisabled(!answers.q9?.value || !answers.q10?.value || !answers.q11?.value)
        }



    }, [answers])


    const hideAlert = () => {
        setDisplayAlert(null)
    }

    return (
        <SafeAreaView style={styles.container}>

            {answers.q9?.value === 'nie' && displayAlert === 1 &&
            <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset + posY0 - OverlayAlertHeight}} message={i18n.t('patientRejectExo')}/>}
            {answers.q10?.value === 'nie' && displayAlert === 2 &&
            <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset + posY1 - OverlayAlertHeight}} message={i18n.t('patientRejectBieznia')}/>}
            {answers.q11?.value === 'nie' && displayAlert === 3 &&
            <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset + posY2 - OverlayAlertHeight}} message={i18n.t('patientRejectPlatform')}/>}


            <View style={{flex: 1}}>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>{i18n.t('questions')} 14-16 {i18n.t('of')} 54</Text>
                <ProgressBar progress={0.2} color="#3C69E7" style={{width: 300, height: 15}}/>
            </View>
            <View style={{flex:9}} onLayout={event => {setViewOffset(event.nativeEvent.layout.y);}}>
                <Text style={styles.question}>{i18n.t('q3a')}</Text>
                <Text style={styles.question}>{i18n.t('q3b')}</Text>
                <View style={{...styles.btnGroup, marginBottom: 15}} onLayout={event => {setPosY0(event.nativeEvent.layout.y);}}>


                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q9?.value === 'tak' ? '#3C69E7' : '#000'
                    }} onPress={() => {
                        selectAnswer('q9', { value: 'tak', 'de': false })
                        setDisplayAlert(null)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q9?.value === 'tak' ? "#3C69E7" : "#262626" }}>
                            {answers.q9?.value === 'tak' && <CheckIcon/>} {i18n.t('yes')}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q9?.value === 'nie' ? '#ff4d4f' : '#000'
                    }} onPress={() => {
                        selectAnswer('q9', { value: 'nie', 'de': true })
                        setDisplayAlert(1)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q9?.value === 'nie' ? "#3C69E7" : "#262626" }}>
                            {answers.q9?.value === 'nie' && <CheckIcon/>} {i18n.t('no')}
                        </Text>
                    </TouchableOpacity>


                </View>
                <Text style={styles.question}>{i18n.t('q3c')}</Text>
                <View style={{...styles.btnGroup, marginBottom: 15}} onLayout={event => {setPosY1(event.nativeEvent.layout.y);}}>

                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q10?.value === 'tak' ? '#3C69E7' : '#000'
                    }} onPress={() => {
                        selectAnswer('q10', { value: 'tak', 'db': false })
                        setDisplayAlert(null)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q10?.value === 'tak' ? "#3C69E7" : "#262626" }}>
                            {answers.q10?.value === 'tak' && <CheckIcon/>} {i18n.t('yes')}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q10?.value === 'nie' ? '#ff4d4f' : '#000'
                    }} onPress={() => {
                        selectAnswer('q10', { value: 'nie', 'db': true })
                        setDisplayAlert(2)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q10?.value === 'nie' ? "#3C69E7" : "#262626" }}>
                            {answers.q10?.value === 'nie' && <CheckIcon/>} {i18n.t('no')}
                        </Text>
                    </TouchableOpacity>


                </View>
                <Text style={styles.question}>{i18n.t('q3d')}</Text>
                <View style={{...styles.btnGroup, marginBottom: 15}} onLayout={event => {setPosY2(event.nativeEvent.layout.y);}}>

                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q11?.value === 'tak' ? '#3C69E7' : '#000'
                    }} onPress={() => {
                        selectAnswer('q11', { value: 'tak', 'dp': false })
                        setDisplayAlert(null)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q11?.value === 'tak' ? "#3C69E7" : "#262626" }}>
                            {answers.q11?.value === 'tak' && <CheckIcon/>} {i18n.t('yes')}
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{
                        ...styles.buttonStyle,
                        borderColor: answers.q11?.value === 'nie' ? '#ff4d4f' : '#000'
                    }} onPress={() => {
                        selectAnswer('q11', { value: 'nie', 'dp': true })
                        setDisplayAlert(3)
                    }}>
                        <Text style={{ ...styles.buttonTextStyle, color: answers.q11?.value === 'nie' ? "#3C69E7" : "#262626" }}>
                            {answers.q11?.value === 'nie' && <CheckIcon/>} {i18n.t('no')}
                        </Text>
                    </TouchableOpacity>
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
