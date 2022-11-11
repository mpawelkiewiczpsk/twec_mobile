import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, Dimensions, SafeAreaView, Platform, StatusBar, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import {Ionicons} from "@expo/vector-icons";
import {useQuestionsContext} from "../contexts/questions";
import i18n from '../i18n-config'
import {OverlayAlert, OverlayAlertHeight} from "../components/OverlayAlert";

const windowWidth = Dimensions.get('window').width;

export default function Q5({ navigation }) {
    const { answers, setAnswers } = useQuestionsContext();
    const [isDisabled, setIsDisabled] = useState(false);

    // OverlayAlert:
    const [posY0, setPosY0] = useState(0);
    const [posY1, setPosY1] = useState(0);
    const [posY2, setPosY2] = useState(0);
    const [displayAlert, setDisplayAlert] = useState(null)
    const [viewOffset, setViewOffset] = useState(0);
    const [viewScroll, setViewScroll] = useState(0);

    const selectAnswer = (key, value) => {
        setAnswers({ ...answers, [key]: value })
    }

    useEffect(() => {

        setAnswers({ ...answers, prevNav: 'Q6' });

    }, [])

    useEffect(() => {

        setIsDisabled(!answers.gmfm.value || answers.gmfm.error || !answers.test6m.value || answers.test6m.error || answers.gdi.error)

    }, [answers])


    const hideAlert = () => {
        setDisplayAlert(null)
    }


    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
            behavior= {(Platform.OS === 'ios') ? "padding" : null}
        >
        <SafeAreaView style={styles.container}>
            {answers.gmfm?.error && displayAlert === 1 &&
                <OverlayAlert onClick={() => hideAlert()} arrowLeft="true" style={{top: viewOffset - viewScroll + posY0 - OverlayAlertHeight}} message={i18n.t('range-0-100')}/>}
            {answers.gdi?.error && displayAlert === 2 &&
                <OverlayAlert onClick={() => hideAlert()} arrowLeft="true" style={{top: viewOffset - viewScroll + posY1 - OverlayAlertHeight}} message={i18n.t('range-0-100')}/>}
            {answers.test6m?.error && displayAlert === 3 &&
                <OverlayAlert onClick={() => hideAlert()} arrowLeft="true" style={{top: viewOffset - viewScroll + posY2 - OverlayAlertHeight}} message={i18n.t('range-0-1000')}/>}

            <View style={{flex: 1, marginBottom: 20}}>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>{i18n.t('questions')} 20-22 {i18n.t('of')} 54</Text>
                <ProgressBar progress={0.35} color="#3C69E7" style={{width: 300, height: 15}}/>
            </View>

            <View style={{flex:9}} onLayout={event => {setViewOffset(event.nativeEvent.layout.y)}}>
                <ScrollView showsVerticalScrollIndicator={false} onScroll={event => {setViewScroll(event.nativeEvent.contentOffset.y)}}>
                    <Text style={styles.question}>{i18n.t('q6d')}</Text>
                    <Text style={styles.label}>{i18n.t('q6a')}</Text>
                <View onLayout={event => {setPosY0(event.nativeEvent.layout.y);}}>
                    <TextInput
                        style={{...styles.input, borderColor: answers.gmfm?.error ? '#ff4d4f' : '#D1D5E1'}}
                        keyboardType='numeric'
                        onChangeText={(value) => {

                            selectAnswer('gmfm', {
                                value: value,
                                error: parseInt(value) < 0 || parseInt(value) > 100
                            })

                            parseInt(value) < 0 || parseInt(value) > 100 ? setDisplayAlert(1) : null

                        }}
                        value={answers.gmfm.value}
                    />
                </View>

                <Text style={styles.label}>{i18n.t('q6b')}</Text>
                <View onLayout={event => {setPosY1(event.nativeEvent.layout.y);}}>
                    <TextInput
                        style={{...styles.input, borderColor: answers.gdi?.error ? '#ff4d4f' : '#D1D5E1'}}
                        keyboardType='numeric'
                        onChangeText={(value) => {

                            selectAnswer('gdi', {
                                value: value,
                                error: parseInt(value) < 0 || parseInt(value) > 120
                            })

                            parseInt(value) < 0 || parseInt(value) > 120 ? setDisplayAlert(2) : null

                        }}
                        value={answers.gdi.value}
                    />
                </View>

                <Text style={styles.label}>{i18n.t('q6c')}</Text>
                <View onLayout={event => {setPosY2(event.nativeEvent.layout.y);}}>
                    <TextInput
                        style={{...styles.input, borderColor: answers.test6m?.error ? '#ff4d4f' : '#D1D5E1'}}
                        keyboardType='numeric'
                        onChangeText={(value) => {

                            selectAnswer('test6m', {
                                value: value,
                                error: parseInt(value) < 0 || parseInt(value) > 1000
                            })

                            parseInt(value) < 0 || parseInt(value) > 1000 ? setDisplayAlert(3) : null

                        }}
                        value={answers.test6m.value}
                    />
                </View>
                </ScrollView>
            </View>

            <View style={{flex:1, marginBottom: 15, marginTop: 15}}>
                <View style={styles.buttonsDown}>
                <TouchableOpacity style={{...styles.bottomBtn,
                            backgroundColor: '#fff'}}
                            onPress={() => navigation.replace('Q5')}>
                            <Text style={styles.btnPrev}><Ionicons name="md-arrow-back" size={16} color="#3C69E7" /> {i18n.t('prev')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.bottomBtn,
                            backgroundColor: isDisabled ? '#ccc' : '#3C69E7',
                            borderColor: isDisabled ? '#ccc' : '#3C69E7'}}
                            disabled={isDisabled}
                            onPress={() => navigation.replace('Q7')}>
                            <Text style={styles.btnNext}>{i18n.t('next')} <Ionicons name="md-arrow-forward" size={16} color="#fff" /></Text>
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
        width: windowWidth - 60,
        height: 70,
        lineHeight: 70,
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
