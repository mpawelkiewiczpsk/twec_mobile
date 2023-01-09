import {StyleSheet, Text, View, Dimensions, SafeAreaView, Platform, StatusBar, TouchableOpacity, TouchableHighlight} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import {Ionicons} from "@expo/vector-icons";
import {useQuestionsContext} from "../contexts/questions";
import {useEffect, useState} from "react";
import { Tooltip, IconButton } from 'react-native-paper';
import i18n from '../i18n-config'

const windowWidth = Dimensions.get('window').width;

const selectValues = [
    { label: '0', value: '0' },
    { label: '1', value: '1' },
    { label: '2', value: '2' }
]

const allValues = ['0', '1', '2']

const placeholder = {
    label: '',
    value: null,
    color: '#9EA0A4',
};


export default function Q12({ navigation }) {
    const { answers, setAnswers } = useQuestionsContext();
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {

        setIsDisabled(!allValues.includes(answers.selektywnoscZginaczBiodroLKD) ||
            !allValues.includes(answers.selektywnoscZginaczBiodroPKD) ||
            !allValues.includes(answers.selektywnoscZginaczKolanoLKD) ||
            !allValues.includes(answers.selektywnoscZginaczKolanoPKD))

    }, [answers])

    useEffect(() => {

        setAnswers({ ...answers, prevNav: 'Q12' });

    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex: 1}}>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>{i18n.t('questions')} 39-42 {i18n.t('of')} 54</Text>
                <ProgressBar progress={0.75} color="#3C69E7" style={{width: 300, height: 15}}/>
            </View>
            <View style={{flex:9}}>

                <View style={{flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.question}>
                            {i18n.t('q12a')}
                        </Text>
                    </View>
                    <View>
                        <Tooltip title={i18n.t('trost')} enterTouchDelay={1} leaveTouchDelay={5000}>
                            <IconButton icon="help-circle-outline" selected size={20} onPress={() => {}} />
                        </Tooltip>
                    </View>
                </View>





                <View style={styles.btnGroup}>
                    <View style={{width: (windowWidth / 2) - 40}}>
                        <Text style={styles.question}>{i18n.t('lll')}</Text>
                        <View style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10}}>
                            <RNPickerSelect
                                onValueChange={(value) => setAnswers({ ...answers, selektywnoscZginaczBiodroLKD: value  })}
                                value={answers.selektywnoscZginaczBiodroLKD}
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
                                onValueChange={(value) => setAnswers({ ...answers, selektywnoscZginaczBiodroPKD: value  })}
                                value={answers.selektywnoscZginaczBiodroPKD}
                                placeholder={placeholder}
                                items={selectValues}
                                style={pickerSelectStyles}
                            />
                        </View>
                    </View>
                </View>


                <View style={{flexDirection: 'row', marginTop: 25 }}>
                    <View>
                        <Text style={{...styles.question}}>{i18n.t('q12b')} </Text>
                    </View>
                    <View>
                        <Tooltip title={i18n.t('trost')} enterTouchDelay={1} leaveTouchDelay={5000}>
                            <IconButton icon="help-circle-outline" selected size={20} onPress={() => {}} />
                        </Tooltip>
                    </View>
                </View>


                <View style={styles.btnGroup}>
                    <View style={{width: (windowWidth / 2) - 40}}>
                        <Text style={styles.question}>{i18n.t('lll')}</Text>
                        <View style={{borderWidth: 1, borderColor: 'gray', borderRadius: 10}}>
                            <RNPickerSelect
                                onValueChange={(value) => setAnswers({ ...answers, selektywnoscZginaczKolanoLKD: value  })}
                                value={answers.selektywnoscZginaczKolanoLKD}
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
                                onValueChange={(value) => setAnswers({ ...answers, selektywnoscZginaczKolanoPKD: value  })}
                                value={answers.selektywnoscZginaczKolanoPKD}
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
                            onPress={() => navigation.replace('Q11')}>
                            <Text style={styles.btnPrev}><Ionicons name="md-arrow-back" size={16} color="#3C69E7" /> {i18n.t('prev')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.bottomBtn,
                            backgroundColor: isDisabled ? '#ccc' : '#3C69E7',
                            borderColor: isDisabled ? '#ccc' : '#3C69E7'}}
                            disabled={isDisabled}
                            onPress={() => navigation.replace('Q13')}>
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
