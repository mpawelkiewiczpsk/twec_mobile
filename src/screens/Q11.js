import {StyleSheet, Text, View, Dimensions, SafeAreaView, Platform, StatusBar, TouchableOpacity} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import {Ionicons} from "@expo/vector-icons";
import {useQuestionsContext} from "../contexts/questions";
import {useEffect, useState} from "react";
import i18n from '../i18n-config'

const windowWidth = Dimensions.get('window').width;

const selectValues = [
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
]

const allValues = ['0', '1', '2', '3', '4', '5']

const placeholder = {
    label: '',
    value: null,
    color: '#9EA0A4',
};

export default function Q11({ navigation }) {
    const { answers, setAnswers } = useQuestionsContext();
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {

        setIsDisabled(!allValues.includes(answers.silaLovettProstownikBiodroLKD) ||
            !allValues.includes(answers.silaLovettProstownikBiodroPKD) ||
            !allValues.includes(answers.silaLovettProstownikKolanoLKD) ||
            !allValues.includes(answers.silaLovettProstownikKolanoPKD))

    }, [answers])

    useEffect(() => {

        setAnswers({ ...answers, prevNav: 'Q11' });

    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>{i18n.t('questions')} 35-38 {i18n.t('of')} 54</Text>
                <ProgressBar progress={0.65} color="#3C69E7" style={{width: 300, height: 15}}/>
            </View>
            <View style={{flex:9}}>

                <Text style={styles.question}>{i18n.t('q11a')} </Text>

                <View style={styles.btnGroup}>
                    <View style={{width: (windowWidth / 2) - 40}}>
                        <Text style={styles.question}>{i18n.t('lll')}</Text>
                        <View style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10}}>
                            <RNPickerSelect
                                onValueChange={(value) => setAnswers({ ...answers, silaLovettProstownikBiodroLKD: value  })}
                                value={answers.silaLovettProstownikBiodroLKD}
                                placeholder={placeholder}
                                items={selectValues}
                                style={pickerSelectStyles}
                            />
                        </View>
                    </View>
                    <View style={{width: (windowWidth / 2) - 40, marginLeft: 20}}>
                        <Text style={styles.question}>{i18n.t('rll')}</Text>
                        <View style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10}}>
                            <RNPickerSelect
                                onValueChange={(value) => setAnswers({ ...answers, silaLovettProstownikBiodroPKD: value  })}
                                value={answers.silaLovettProstownikBiodroPKD}
                                placeholder={placeholder}
                                items={selectValues}
                                style={pickerSelectStyles}
                            />
                        </View>
                    </View>
                </View>

                <Text style={{...styles.question, marginTop: 25}}>{i18n.t('q11b')} </Text>

                <View style={styles.btnGroup}>
                    <View style={{width: (windowWidth / 2) - 40}}>
                        <Text style={styles.question}>{i18n.t('lll')}</Text>
                        <View style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10}}>
                            <RNPickerSelect
                                onValueChange={(value) => setAnswers({ ...answers, silaLovettProstownikKolanoLKD: value  })}
                                value={answers.silaLovettProstownikKolanoLKD}
                                placeholder={placeholder}
                                items={selectValues}
                                style={pickerSelectStyles}
                            />
                        </View>
                    </View>
                    <View style={{width: (windowWidth / 2) - 40, marginLeft: 20}}>
                        <Text style={styles.question}>{i18n.t('rll')}</Text>
                        <View style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10}}>
                            <RNPickerSelect
                                onValueChange={(value) => setAnswers({ ...answers, silaLovettProstownikKolanoPKD: value  })}
                                value={answers.silaLovettProstownikKolanoPKD}
                                placeholder={placeholder}
                                items={selectValues}
                                style={pickerSelectStyles}
                            />
                        </View>
                    </View>
                </View>



            </View>
            <View style={{flex:1, marginBottom: 15, marginTop: 15}}>
                <View style={styles.buttonsDown}>
                <TouchableOpacity style={{...styles.bottomBtn,
                            backgroundColor: '#fff'}}
                            onPress={() => navigation.replace('Q10')}>
                            <Text style={styles.btnPrev}><Ionicons name="md-arrow-back" size={16} color="#3C69E7" /> {i18n.t('prev')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.bottomBtn,
                            backgroundColor: isDisabled ? '#ccc' : '#3C69E7',
                            borderColor: isDisabled ? '#ccc' : '#3C69E7'}}
                            disabled={isDisabled}
                            onPress={() => navigation.replace('Q12')}>
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
