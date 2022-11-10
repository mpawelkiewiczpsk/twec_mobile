import {StyleSheet, Text, View, Dimensions, SafeAreaView, Platform, StatusBar, TouchableOpacity} from 'react-native';
import { ProgressBar, Button } from 'react-native-paper';
import {useQuestionsContext} from "../contexts/questions";
import CheckIcon from "../components/CheckIcon";
import {Ionicons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import i18n from '../i18n-config'

const windowWidth = Dimensions.get('window').width;

export default function Q7({ navigation }) {
    const { answers, setAnswers } = useQuestionsContext();
    const [isDisabled, setIsDisabled] = useState(false);

    const selectAnswer = (key, value) => {
        setAnswers({ ...answers, [key]: value })
    }

    useEffect(() => {

        setAnswers({ ...answers, prevNav: 'Q7' });

    }, [])

    useEffect(() => {

        setIsDisabled(!answers.q12 || !answers.gmfcs)

    }, [answers])


    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>{i18n.t('questions')} 23-24 {i18n.t('of')} 54</Text>
                <ProgressBar progress={0.42} color="#3C69E7" style={{width: 300, height: 15}}/>
            </View>
            <View style={{flex:9}}>
                <Text style={styles.question}>{i18n.t('q7a')}</Text>
                <View>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, width: windowWidth - 50, borderColor: answers.q12 === 'od pięty' ? '#3C69E7' : '#000'}}
                            color={answers.q12 === 'od pięty' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => selectAnswer('q12', 'od pięty')}>
                        {answers.q12 === 'od pięty' && <CheckIcon/>} {i18n.t('q7b')}
                    </Button>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, width: windowWidth - 50, borderColor: answers.q12 === 'inaczej' ? '#3C69E7' : '#000'}}
                            color={answers.q12 === 'inaczej' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => selectAnswer('q12', 'inaczej')}>
                        {answers.q12 === 'inaczej' && <CheckIcon/>} {i18n.t('q7c')}
                    </Button>
                </View>
                <Text style={styles.question}>{i18n.t('q7d')}</Text>
                <View style={styles.btnGroup}>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.q13 === 'tak' ? '#3C69E7' : '#000'}}
                            color={answers.q13 === 'tak' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => selectAnswer('q13', 'tak')}>
                        {answers.q13 === 'tak' && <CheckIcon/>} {i18n.t('yes')}
                    </Button>
                    <Button style={{marginBottom: 15}}
                            contentStyle={{...styles.buttonStyle, borderColor: answers.q13 === 'nie' ? '#3C69E7' : '#000'}}
                            color={answers.q13 === 'nie' ? "#3C69E7" : "#262626"}
                            mode="outlined"
                            onPress={() => selectAnswer('q13', 'nie')}>
                        {answers.q13 === 'nie' && <CheckIcon/>} {i18n.t('no')}
                    </Button>
                </View>

            </View>
            <View style={{flex:1, marginTop: 15, marginBottom: 15}}>
                <View style={styles.buttonsDown}>
                <TouchableOpacity style={{...styles.bottomBtn,
                            backgroundColor: '#fff'}}
                            onPress={() => navigation.replace('Q6')}>
                            <Text style={styles.btnPrev}><Ionicons name="md-arrow-back" size={16} color="#3C69E7" /> {i18n.t('prev')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.bottomBtn,
                            backgroundColor: isDisabled ? '#ccc' : '#3C69E7',
                            borderColor: isDisabled ? '#ccc' : '#3C69E7'}}
                            disabled={isDisabled}
                            onPress={() => navigation.replace('Q8')}>
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
    }
});
