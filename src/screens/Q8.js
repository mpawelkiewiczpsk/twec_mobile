import {StyleSheet,
    Text,
    View,
    Dimensions,
    SafeAreaView,
    Platform,
    StatusBar,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import React, {useState, useEffect} from "react";
import {Ionicons} from "@expo/vector-icons";
import {useQuestionsContext} from "../contexts/questions";
import i18n from '../i18n-config'
import {OverlayAlert, OverlayAlertHeight} from "../components/OverlayAlert";

const windowWidth = Dimensions.get('window').width;

export default function Q8({ navigation }) {
    const { answers, setAnswers } = useQuestionsContext();
    const [isDisabled, setIsDisabled] = useState(false);

    const [posY0, setPosY0] = useState(0);
    const [posY1, setPosY1] = useState(0);
    const [displayAlert, setDisplayAlert] = useState(null)
    const [viewOffset, setViewOffset] = useState(0);
    const [viewScroll, setViewScroll] = useState(0);
    const [errorPref, setErrorPref] = useState(false);

    const selectAnswer = (key, value) => {
        setAnswers({ ...answers, [key]: value })
    }

    useEffect(() => {

        setAnswers({ ...answers, prevNav: 'Q8' });


    }, [])

    useEffect(() => {

        setIsDisabled(errorPref || !answers.zebrisPref.value || !answers.zebrisMax.value || answers.zebrisMax.error || answers.zebrisPref.error)

        checkErrors()


    }, [answers, errorPref])

    const hideAlert = () => {
        setDisplayAlert(null)
    }

    const checkErrors = () => {

        if(answers.zebrisPref.value && answers.zebrisMax.value){

            const formatValuePref = answers.zebrisPref.value && answers.zebrisPref.value.toString().replace(',', '.')
            const formatValueMax = answers.zebrisMax.value && answers.zebrisMax.value.toString().replace(',', '.')

            if(parseFloat(formatValuePref) > parseFloat(formatValueMax)){
                setErrorPref(true)
                setDisplayAlert(3)
            }else{
                setErrorPref(false)
            }


        }else{
            setErrorPref(false)
        }

    }


    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
            behavior= {(Platform.OS === 'ios') ? "padding" : null}
        >
            <SafeAreaView style={styles.container}>
                {answers.zebrisPref?.error && displayAlert === 1 &&
                    <OverlayAlert
                        onClick={() => hideAlert()}
                        style={{top: viewOffset - viewScroll + posY0 - OverlayAlertHeight}}
                        message={i18n.t('q8d')}
                    />}
                {answers.zebrisMax?.error && displayAlert === 2 &&
                    <OverlayAlert
                        onClick={() => hideAlert()}
                        style={{top: viewOffset - viewScroll + posY1 - OverlayAlertHeight}}
                        message={i18n.t('q8e')}/>}
                {errorPref && displayAlert === 3 &&
                    <OverlayAlert
                        onClick={() => hideAlert()}
                        style={{top: viewOffset - viewScroll + posY0 - OverlayAlertHeight}}
                        message={i18n.t('q8f')}/>}


                <View style={{flex: 1, marginBottom: 20}}>
                    <Text style={{marginBottom: 10, textAlign: 'center'}}>{i18n.t('questions')} 25-26 {i18n.t('of')} 54</Text>
                    <ProgressBar progress={0.45} color="#3C69E7" style={{width: 300, height: 15}}/>
                </View>
                <View style={{flex:9}} onLayout={event => {setViewOffset(event.nativeEvent.layout.y);}}>
                    <ScrollView onScroll={event => {setViewScroll(event.nativeEvent.contentOffset.y)}} showsVerticalScrollIndicator={false}>
                    <Text style={styles.question}>{i18n.t('q8a')}</Text>
                    <Text style={styles.label}>{i18n.t('q8b')}</Text>

                    <View onLayout={event => {setPosY0(event.nativeEvent.layout.y);}}>
                    <TextInput
                            style={{...styles.input, borderColor: answers.zebrisPref?.error || errorPref ? '#ff4d4f' : '#D1D5E1'}}
                            keyboardType='numeric'
                            onChangeText={(value) => {

                                const formatValue = value && value.toString().replace(',', '.')
                                selectAnswer('zebrisPref', {
                                    value: value,
                                    error: parseFloat(formatValue) < 0.05 || parseFloat(formatValue) > 2.0
                                })

                                parseFloat(formatValue) < 0.05 || parseFloat(formatValue) > 2.0 ? setDisplayAlert(1) : null

                            }}
                            value={answers.zebrisPref.value}
                        />
                    </View>

                    <Text style={styles.label}>{i18n.t('q8c')}</Text>
                    <View onLayout={event => {setPosY1(event.nativeEvent.layout.y);}}>
                    <TextInput
                            style={{...styles.input, borderColor: answers.zebrisMax?.error || errorPref ? '#ff4d4f' : '#D1D5E1'}}
                            keyboardType='numeric'
                            onChangeText={(value) => {

                                const formatValue = value && value.toString().replace(',', '.')

                                selectAnswer('zebrisMax', {
                                    value: value,
                                    error: parseFloat(formatValue) < 0.05 || parseFloat(formatValue) > 3.0
                                })

                                parseFloat(formatValue) < 0.05 || parseFloat(formatValue) ? setDisplayAlert(2) : null

                            }}
                            value={answers.zebrisMax.value}
                        />
                    </View>
                </ScrollView>
            </View>
                <View style={{flex:1, marginBottom: 15, marginTop: 15}}>
                    <View style={styles.buttonsDown}>
                    <TouchableOpacity style={{...styles.bottomBtn,
                            backgroundColor: '#fff'}}
                            onPress={() => navigation.replace('Q7')}>
                            <Text style={styles.btnPrev}>
                                <Ionicons name="md-arrow-back" size={16} color="#3C69E7" />
                                {i18n.t('prev')}
                            </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.bottomBtn,
                            backgroundColor: isDisabled ? '#ccc' : '#3C69E7',
                            borderColor: isDisabled ? '#ccc' : '#3C69E7'}}
                            disabled={isDisabled}
                            onPress={() => navigation.replace('Q9')}>
                            <Text style={styles.btnNext}>
                                {i18n.t('next')}
                                <Ionicons name="md-arrow-forward" size={16} color="#fff" />
                            </Text>
                </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
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
        width: (windowWidth / 2) - 50,
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
    label: {
        color: '#262626',
        fontSize: 16,
        marginBottom: 5,
        marginTop: 20
    },
    input: {
        height: 40,
        width: windowWidth - 40,
        borderWidth: 1,
        paddingLeft: 10,
        borderColor: '#D1D5E1',
        color: '#000'
    },
});
