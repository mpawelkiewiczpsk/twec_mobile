import React, {useState, useRef, useEffect} from "react";
import {StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Dimensions, SafeAreaView, Platform, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import DateTimePicker from "react-native-modal-datetime-picker";
import {Ionicons} from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useQuestionsContext } from "../contexts/questions";
import moment from 'moment';
import i18n from '../i18n-config'
import RNPickerSelect from 'react-native-picker-select';
import {checkValues} from "../helpers/checkValues";
import {OverlayAlert, OverlayAlertHeight} from "../components/OverlayAlert";

const windowWidth = Dimensions.get('screen').width;

const selectValues = (from, to) => {

    let arrayOfElement = [];

    for(let i = from; i < to; i++){
        arrayOfElement.push({ label: i.toString(), value: i.toString() })
    }

    return arrayOfElement;
}


const placeholder = {
    label: '',
    value: null,
    color: '#9EA0A4',
};

export default function PatientData({ navigation }) {

    const { answers, setAnswers } = useQuestionsContext();
    const [nav, setNav] = useState('Q1');
    const [isDisabled, setIsDisabled] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [weightArray, setWeightArray] = useState([]);
    const [heightArray, setHeightArray] = useState([]);


    const [bmi, setBmi] = useState("");

    const male = useRef(null);
    const female = useRef(null);

    // OverlayAlert:
    const [posY0, setPosY0] = useState(0);
    const [posY1, setPosY1] = useState(0);
    const [posY2, setPosY2] = useState(0);
    const [displayAlert, setDisplayAlert] = useState(null)
    const [viewOffset, setViewOffset] = useState(0);
    const [viewScroll, setViewScroll] = useState(0);

    useEffect(() => {

        setWeightArray(selectValues(10, 181))
        setHeightArray(selectValues(100, 221))
        setAnswers({ ...answers, prevNav: 'PatientData' });

    }, [])


    useEffect(() => {

        if(answers){
            if(checkValues(answers)){
                setNav('PatientReject')
            }else{
                setNav('Q1')
            }

            setIsDisabled(!answers.gender || answers.age.value === null || !answers.height.value || !answers.weight.value)
        }



    }, [answers])

    useEffect(() => {

        if(answers.weight.value && answers.height.value){
            let bmi = answers.weight.value / ((answers.height.value / 100) * (answers.height.value / 100))

            setBmi(bmi.toFixed(2).toString());
        }

    },[answers.height, answers.weight])

    const handlePress = (value) => {
        value === 'male' ?
            female.current.state.checked = false : male.current.state.checked = false

        setAnswers({ ...answers, gender: value });
    }

    const onChange = (date) => {

        const currentDate = date;
        const actualDate = new Date();

        setDisplayAlert(1);

        setOpen(false);
        setDate(currentDate);

        if(currentDate){
            setAnswers({ ...answers, age: {
                value: actualDate.getFullYear() - currentDate.getFullYear(),
                text:`${moment(currentDate).format("DD-MM-YYYY")} (${actualDate.getFullYear() - currentDate.getFullYear()})`,
                dl: ((actualDate.getFullYear() - currentDate.getFullYear()) < 5)
                } })
        }
    };

    const onChangeHeight = (value) => {

        setDisplayAlert(2);

        setAnswers({ ...answers, height: { value: value, de: value < 150 || value > 188 } })

    }

    const onChangeBodyMass = (value) => {

        setDisplayAlert(3);

        setAnswers({ ...answers, weight: { value: value, de: value > 100 , dp: value > 150 } })

    }


    const hideAlert = () => {
        setDisplayAlert(null)
    }

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
            behavior= {(Platform.OS === 'ios') ? "padding" : null}
        >
        <SafeAreaView style={styles.container} >
            {answers.age?.dl && displayAlert === 1 &&
                <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY0 - OverlayAlertHeight}} message={i18n.t('q2Reject')}/>}
            {answers.height?.de && displayAlert === 2 &&
                <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY1 - OverlayAlertHeight}} message={i18n.t('patientRejectExo')}/>}
            {(answers.weight?.de && !answers.weight?.dp) && displayAlert === 3 &&
                <OverlayAlert onClick={() => hideAlert()} style={{top: viewOffset - viewScroll + posY2 - OverlayAlertHeight}} message={i18n.t('patientRejectExo')}/>}
            {(answers.weight?.de && answers.weight?.dp) && displayAlert === 3 &&
                <OverlayAlert onClick={() => hideAlert()} sizeScale={1.2} style={{top: viewOffset - viewScroll + posY2 - 1.2*OverlayAlertHeight}} message={i18n.t('patientRejectExoPla')}/>}

            <View style={{flex: 1}}>
                <Text style={{marginBottom: 10, textAlign: 'center'}}>{i18n.t('questions')} 1-5 {i18n.t('of')} 54</Text>
                <ProgressBar progress={0.05} color="#3C69E7" style={{width: 300, height: 15}}/>
            </View>
            <View style={{flex:9}}
                  onLayout={event => {setViewOffset(event.nativeEvent.layout.y);}}>
                <Text style={styles.question}>{i18n.t('patientData')}</Text>
                <ScrollView showsVerticalScrollIndicator={false} onScroll={event => {setViewScroll(event.nativeEvent.contentOffset.y)}}>
                    <View style={styles.gender}>
                        <BouncyCheckbox
                            size={35}
                            fillColor="#3C69E7"
                            unfillColor="#FFFFFF"
                            ref={female}
                            textStyle={{fontWeight: 'bold', textDecorationLine: 'none'}}
                            isChecked={answers.gender === 'female'}
                            text={i18n.t('woman')}
                            onPress={() => handlePress("female")}
                        />
                        <BouncyCheckbox
                            size={35}
                            fillColor="#3C69E7"
                            ref={male}
                            textStyle={{fontWeight: 'bold', textDecorationLine: 'none'}}
                            isChecked={answers.gender === 'male'}
                            unfillColor="#FFFFFF"
                            text={i18n.t('man')}
                            onPress={() => handlePress("male")}
                        />
                    </View>

                    <Text style={styles.label}>{i18n.t('id')}</Text>
                    <View>
                        <TextInput
                            style={styles.input}
                            keyboardType='numeric'
                            onChangeText={(value) => setAnswers({ ...answers, id: value  })}
                            value={answers.id}
                        />
                    </View>

                    <Text style={styles.label}>{i18n.t('age')}</Text>
                    <View onLayout={event => {setPosY0(event.nativeEvent.layout.y + event.nativeEvent.layout.height);}}>
                        <DateTimePicker
                            isVisible={open}
                            date={date}
                            locale={i18n.locale}
                            cancelTextIOS={i18n.t('cancel')}
                            confirmTextIOS={i18n.t('confirm')}
                            maximumDate={new Date()}
                            onConfirm={onChange}
                            onCancel={() => setOpen(false)}
                        />
                        <TouchableOpacity onPress={() => {
                            setOpen(true);
                        }} >
                            <TextInput
                                style={{...styles.input, borderColor: answers.age?.dl ? '#ff4d4f' : '#D1D5E1'}}
                                pointerEvents="none"
                                value={answers.age.text}
                                editable={false}
                            />
                        </TouchableOpacity >
                    </View>

                    <Text style={styles.label}>{i18n.t('height')}</Text>
                    <View style={{borderWidth: 1, borderColor: answers.height?.de ? '#ff4d4f' : '#D1D5E1'}}
                          onLayout={event => {setPosY1(event.nativeEvent.layout.y + event.nativeEvent.layout.height);}}>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            onValueChange={onChangeHeight}
                            value={answers.height.value}
                            placeholder={placeholder}
                            items={heightArray}
                            style={pickerSelectStyles}
                        />
                    </View>
                    <Text style={styles.label}>{i18n.t('bodyMass')}</Text>
                    <View style={{borderWidth: 1, borderColor: answers.weight?.de || answers.weight?.dp ? '#ff4d4f' : '#D1D5E1'}}
                          onLayout={event => {setPosY2(event.nativeEvent.layout.y + event.nativeEvent.layout.height);}}>
                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
                            onValueChange={onChangeBodyMass}
                            value={answers.weight.value}
                            placeholder={placeholder}
                            items={weightArray}
                            style={pickerSelectStyles}
                        />
                    </View>
                    <Text style={styles.label}>BMI</Text>
                    <TextInput
                        style={styles.input}
                        editable={false}
                        value={bmi}
                    />

                    </ScrollView>
                </View>
                <View style={{flex:1, marginBottom: 15, marginTop: 15}}>
                    <View style={styles.buttonsDown}>
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
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 15
    },
    gender: {
       display: 'flex',
       flexDirection: 'row',
       width: windowWidth - 60,
       justifyContent: 'space-between'
    },
    label: {
        color: '#262626',
        fontSize: 16,
        marginBottom: 5,
        marginTop: 20
    },
    buttonsDown: {
        display: 'flex',
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 50
    },
    bottomBtn:{
        width: (windowWidth / 2) - 40,
        height: 50,
        lineHeight: 50,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#3C69E7',
        display: 'flex',
        justifyContent: 'center',
    },
    btnNext:{
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    datePickerStyle: {
        width: 230,
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 8,
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
        paddingVertical: 6,
        borderWidth: 0,
        borderStyle: 'solid',
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

