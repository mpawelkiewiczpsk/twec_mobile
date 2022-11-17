import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    SafeAreaView,
    Platform,
    StatusBar,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import React, {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {useQuestionsContext} from "../contexts/questions";
import i18n from '../i18n-config'
import {OverlayAlert, OverlayAlertHeight} from "../components/OverlayAlert";

const windowWidth = Dimensions.get('screen').width;

export default function Q9({ navigation }) {
    const { answers, setAnswers } = useQuestionsContext();
    const [isDisabled, setIsDisabled] = useState(false);
    const [displayAlert, setDisplayAlert] = useState(null)
    const [posY0, setPosY0] = useState(0);
    const [posY1, setPosY1] = useState(0);
    const [posY2, setPosY2] = useState(0);
    const [posY3, setPosY3] = useState(0);
    const [viewOffset, setViewOffset] = useState(0);
    const [viewScroll, setViewScroll] = useState(0);

    const selectAnswer = (key, value) => {
        setAnswers({ ...answers, [key]: value })
    }

    useEffect(() => {

        setIsDisabled(answers.gammaRight?.error || answers.gammaLeft?.error || answers.alfaOO?.error || answers.alfaOZ?.error || answers.alfaDyn?.error)

    }, [answers])

    useEffect(() => {

        setAnswers({ ...answers, prevNav: 'Q9' });


    }, [])

    useEffect(() => {

        if(answers.gammaLeft?.value){
            let right = parseInt(answers.gammaLeft?.value);

            if(right >= 0 && right <= 100){
                setAnswers({ ...answers, gammaRight: { ...answers.gammaRight, value: (100 - right).toString() } })
            }else{
                setAnswers({ ...answers, gammaRight: { ...answers.gammaRight, value: '' } })
            }
        }else{
            setAnswers({ ...answers, gammaRight: { ...answers.gammaRight, value: '' } })
        }


    },[answers.gammaLeft?.value])

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

                {answers.gammaLeft?.error && displayAlert === 1 &&
                    <OverlayAlert onClick={() => hideAlert()}
                                  style={{top: viewOffset - viewScroll + posY0 - 3*OverlayAlertHeight/4}}
                                  message={i18n.t('range-0-100')}
                                  arrowLeft={true}
                    />}
                {answers.gammaRight?.error && displayAlert === 2 &&
                    <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY0 - 3*OverlayAlertHeight/4}} message={i18n.t('range-0-100')}/>}
                {answers.alfaOO?.error && displayAlert === 3 &&
                    <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY1 - 3*OverlayAlertHeight/4}} message={i18n.t('range-min')}/>}
                {answers.alfaOZ?.error && displayAlert === 4 &&
                    <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY2 - 3*OverlayAlertHeight/4}} message={i18n.t('range-min')}/>}
                {answers.alfaDyn?.error && displayAlert === 5 &&
                    <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY3 - 3*OverlayAlertHeight/4}} message={i18n.t('range-min')}/>}

                <View style={{flex: 1, marginBottom: 20}}>
                    <Text style={{marginBottom: 10, textAlign: 'center'}}>
                        {i18n.t('questions')} 27-30 {i18n.t('of')} 54
                    </Text>
                    <ProgressBar progress={0.5} color="#3C69E7" style={{width: 300, height: 15}}/>
                </View>
                <View style={{flex:9}} onLayout={event => {setViewOffset(event.nativeEvent.layout.y);}}>
                    <ScrollView
                        onScroll={event => {setViewScroll(event.nativeEvent.contentOffset.y)}}
                        showsVerticalScrollIndicator={false}
                    >
                        <Text style={styles.question}>{i18n.t('q9a')}</Text>
                        <Text style={styles.label}>{i18n.t('q9b')}</Text>

                        <View style={styles.btnGroup} onLayout={event => {setPosY0(event.nativeEvent.layout.y);}}>
                            <View>
                                <Text style={{...styles.label2, marginTop: 0}}>{i18n.t('q9c')} </Text>
                                <TextInput
                                    style={{
                                        ...styles.input,
                                        borderColor: answers.gammaLeft?.error ? '#ff4d4f' : '#D1D5E1',
                                        width: (windowWidth / 2) - 40
                                    }}
                                    keyboardType='numeric'
                                    onChangeText={
                                        (value) => {

                                            selectAnswer('gammaLeft', {
                                                value: value,
                                                error: parseInt(value) < 0 || parseInt(value) > 100
                                            })

                                            setDisplayAlert(1);

                                        }}
                                    value={answers.gammaLeft?.value}
                                />
                            </View>
                            <View style={{marginLeft: 20}}>
                                <Text style={{...styles.label2,
                                    borderColor: answers.gammaRight?.error ? '#ff4d4f' : '#D1D5E1',
                                    marginTop: 0}}>{i18n.t('q9d')} </Text>
                                <TextInput
                                    style={{...styles.input, width: (windowWidth / 2) - 40}}
                                    keyboardType='numeric'
                                    editable={false}
                                    onChangeText={(value) => {
                                        selectAnswer('gammaRight', {
                                            value: value,
                                            error: parseInt(value) < 0 || parseInt(value) > 100
                                        })

                                        setDisplayAlert(2)
                                    }}
                                    value={answers.gammaRight?.value}
                                />
                            </View>
                        </View>

                        <View onLayout={event => {setPosY1(event.nativeEvent.layout.y);}}>
                            <Text style={styles.label}>{i18n.t('q9e')}</Text>
                            <TextInput
                                style={{ ...styles.input, borderColor: answers.alfaOO?.error ? '#ff4d4f' : '#D1D5E1'}}
                                keyboardType='numeric'
                                onChangeText={(value) => {
                                    selectAnswer('alfaOO', {
                                        value: value,
                                        error: parseInt(value) < 0
                                    })

                                    setDisplayAlert(3)
                                }}
                                value={answers.alfaOO?.value}
                            />
                        </View>
                        <View onLayout={event => {setPosY2(event.nativeEvent.layout.y);}}>
                            <Text style={styles.label}>
                                {i18n.t('q9f')}
                            </Text>
                            <TextInput
                                style={{ ...styles.input, borderColor: answers.alfaOZ?.error ? '#ff4d4f' : '#D1D5E1' }}
                                keyboardType='numeric'
                                onChangeText={(value) => {
                                    selectAnswer('alfaOZ', {
                                        value: value,
                                        error: parseInt(value) < 0
                                    })

                                    setDisplayAlert(4)
                                }}
                                value={answers.alfaOZ?.value}
                            />
                        </View>
                        <View onLayout={event => {setPosY3(event.nativeEvent.layout.y);}}>
                            <Text style={styles.label}>
                                {i18n.t('q9g')}
                            </Text>
                            <TextInput
                                style={{ ...styles.input, borderColor: answers.alfaDyn?.error ? '#ff4d4f' : '#D1D5E1' }}
                                keyboardType='numeric'
                                onChangeText={(value) => {
                                    selectAnswer('alfaDyn', {
                                        value: value,
                                        error: parseInt(value) < 0
                                    })

                                    setDisplayAlert(5)
                                }}
                                value={answers.alfaDyn?.value}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={{flex:1, marginBottom: 15, marginTop: 15}}>
                    <View style={styles.buttonsDown}>
                        <TouchableOpacity style={{...styles.bottomBtn,
                                backgroundColor: '#fff'}}
                                onPress={() => navigation.replace('Q8')}>
                                <Text style={styles.btnPrev}>
                                    <Ionicons name="md-arrow-back" size={16} color="#3C69E7" />
                                    {i18n.t('prev')}
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...styles.bottomBtn,
                                backgroundColor: isDisabled ? '#ccc' : '#3C69E7',
                                borderColor: isDisabled ? '#ccc' : '#3C69E7'}}
                                disabled={isDisabled}
                                onPress={() => navigation.replace('Q10')}>
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
        marginTop: 20,
        width: windowWidth - 40,
        flex: 1,
        flexWrap: 'wrap'
    },
    label2: {
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
