import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Animated
} from 'react-native';
import { Card, Avatar, Modal, Portal,Button} from 'react-native-paper';
import * as Progress from 'react-native-progress';
import { useQuestionsContext } from "../contexts/questions";
import {useEffect, useRef, useState} from "react";
import i18n from '../i18n-config'
import {Easing} from "react-native-web";
import {patientData} from "../algorithm/parsePatientData";
import {calculateStratificationForPerTherapy} from "../algorithm/stratificationByTherapy";

const windowWidth = Dimensions.get('window').width;

const therapyListPL = [
    {
        id: 0,
        name: 'Egzoszkielet',
        value: 0.1,
        time: '70 minut',
        visible: true,
        description: [
            '1.trening na urządzeniach Telko i Jupiter łącznie 20 minut,',
            '2. trening Ekso 30-40 minut,',
            '3. stretching 10 minut.'
        ]
    },
    {
        id: 1,
        name: 'Bieżnia + Platfromy',
        value: 0.1,
        time: '90 minut',
        visible: true,
        description: [
            '1. trening na urządzeniach Telko i Jupiter łącznie 20 minut,',
            '2. trening Bieżnia 30-40 minut,',
            '3. Platformy Alfa i Gamma łącznie 20 minut,',
            '4. stretching 10 minut.'
        ]
    },
    {
        id: 2,
        name: 'Egzoszkielet + Platformy',
        value: 0.1,
        time: '90 minut',
        visible: true,
        description: [
            '1. trening na urządzeniach Telko i Jupiter łącznie 20 minut,',
            '2. trening Ekso 30-40 minut,',
            '3. Platformy Alfa i Gamma łącznie 20 minut,',
            '4. stretching 10 minut.'
        ]
    }
]

const therapyListEN = [
    {
        id: 0,
        name: 'The exoskeleton',
        value: 0.1,
        time: '70 minutes',
        visible: true,
        description: [
            '1. training on Telko and Jupiter devices in total 20 minutes,',
            '2. Ekso training 30-40 minutes,',
            '3. stretching 10 minutes.'
        ]
    },
    {
        id: 1,
        name: 'Treadmill + Platforms',
        value: 0.1,
        time: '90 minutes',
        visible: true,
        description: [
            '1. training on Telko and Jupiter devices in total 20 minutes,',
            '2. training Treadmill 30-40 minutes,',
            '3. Alfa and Gamma platforms 20 minutes in total,',
            '4. stretching 10 minutes.'
        ]
    },
    {
        id: 2,
        name: 'Exoskeleton + Platforms',
        value: 0.1,
        time: '90 minutes',
        visible: true,
        description: [
            '1. training on Telko and Jupiter devices in total 20 minutes,',
            '2. Ekso training 30-40 minutes,',
            '3. Alfa and Gamma platforms 20 minutes in total,',
            '4. stretching 10 minutes.'
        ]
    }
]

const imageFileNames = [
    require('./../img/brain1.png'),
    require('./../img/brain2.png'),
    require('./../img/brain3.png'),
    require('./../img/brain4.png'),
    require('./../img/brain5.png'),
];

const ImageAnimator2 = (props) => {
    const shift = useRef(new Animated.Value(0)).current;
    const [imNo, setImNo] = useState([0, 0]);

    let runOneSequence = function () {
        shift.setValue(0);

        // Shift:
        Animated.timing(shift, {
                toValue: 1,
                duration: 10000,
                useNativeDriver: true,
                easing: Easing.linear
            }
        ).start(() => {
            // Wylosowanie nowych numerów zdjęć (bez powtórzeń):
            let i = Math.floor(Math.random() * imageFileNames.length);
            if(i === imNo[0])       i = (i + 1) % imageFileNames.length;
            // Efekt specjalny:
            const e = Math.floor(Math.random() * 3);
            // Ustawienie zmiennej stanu i automatyczne odświeżenie widoku:
            setImNo([i, e]);
        })
    }

    useEffect(() => {
        runOneSequence();
    }, [shift, imNo])

    return(
        <View style={styles.container}>
            {imNo[1] === 0 &&
                <Animated.Image
                    source={imageFileNames[imNo[0]]}
                    resizeMode="cover"
                    style={{
                        ...props.style,

                        transform: [
                            {
                                translateX: shift.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-200, 200]
                                })
                            },
                            {
                                scale: shift.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.85, 1.15]
                                })
                            }
                        ]
                    }}
                >
                    {props.children}
                </Animated.Image>
            }
            {imNo[1] === 1 &&
                <Animated.Image
                    source={imageFileNames[imNo[0]]}
                    resizeMode="cover"
                    style={{
                        ...props.style,

                        transform: [
                            {
                                translateY: shift.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-200, 200]
                                })
                            },
                            {
                                scale: shift.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.85, 1.15]
                                })
                            }
                        ]
                    }}
                >
                    {props.children}
                </Animated.Image>
            }
            {imNo[1] === 2 &&
                <Animated.Image
                    source={imageFileNames[imNo[0]]}
                    resizeMode="cover"
                    style={{
                        ...props.style,

                        transform: [
                            {
                                translateX: shift.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [180, -210]
                                })
                            },
                            {
                                scale: shift.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1.1, 0.75]
                                })
                            }
                        ]
                    }}
                >
                    {props.children}
                </Animated.Image>
            }
        </View>
    );
}

const FadeInView = (props) => {
    const Fade = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(
            Fade, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                //delay: props.dela
            }
        ).start();
    }, [Fade])

    return (
        <Animated.View
            style={{
                ...props.style,
                opacity: Fade,
            }}
        >
            {props.children}
        </Animated.View>
    );
}

const getColour = (value) => {
    if(value > 0.7){
        return '#1AC5BD'
    }else if(value > 0.5){
        return '#FFA800'
    } else return '#F64E60'

}

const LeftContent = props => <Avatar.Icon color='#B5BAC8' backgroundColor='transparent' {...props} icon="timer" size={40}/>

function Summary({ navigation }) {
    const { answers, removeAllAnswers } = useQuestionsContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [pickedTherapyId, setPickedTherapyId] = useState(0);
    const [therapyList, setTherapyList] = useState(therapyListPL);
    const [loadTherapy, setLoadTherapy] = useState(false)
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const onTherapy = (therapyId) => {
        setPickedTherapyId(therapyId);
        showModal();
    }

    let therapyTmp = [];


    const compareFn = (a, b) => {
        if (a.value < b.value) {
            return -1;
        }
        if (a.value > b.value) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {

        if(i18n.locale === 'en') setTherapyList(therapyListEN)

        therapyTmp = therapyList;
        therapyTmp[0].value = calculateStratificationForPerTherapy('Ekso', patientData(answers)) / 100
        therapyTmp[0].visible = !answers.de
        therapyTmp[1].value = calculateStratificationForPerTherapy('Bieżnia + Platformy', patientData(answers)) / 100
        therapyTmp[1].visible = !answers.dp && !answers.db
        therapyTmp[2].value = calculateStratificationForPerTherapy('Ekso + Platformy', patientData(answers)) / 100
        therapyTmp[2].visible = !answers.de && !answers.dp

        setTherapyList(therapyTmp.sort(compareFn).reverse())


    }, [])

    useEffect(() => {

        if(therapyList[0].value !== 0.1 && therapyList[1].value !== 0.1 && therapyList[2].value !== 0.1){
            setLoadTherapy(true)
        }


    }, [therapyList])




    const backToHome = () => {
        removeAllAnswers();
        navigation.replace('Home')
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex:1}}>
                {/*<ImageAnimator2 style={styles.image} />*/}
                <View>
                <Text style={styles.title}>{i18n.t('summary1')}</Text>
                <Text style={styles.text}>{i18n.t('summary2')}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {loadTherapy ? <FadeInView style={styles.summary}>
                        {therapyList.map((item, index) => item.visible ? (
                            <TouchableOpacity onPress={() => onTherapy(item.id)} key={item.id}>
                                <Card style={{ marginBottom: 15, backgroundColor: '#fff', opacity: 0.85 }}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'flex-start', marginVertical: 20}}>
                                        <View style={{ justifyContent: 'flex-start', height: '100%', width: '60%'}}>
                                            <Text style={styles.summaryTitle}>{item.name}</Text>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <LeftContent />
                                                <Text style={styles.subtitle}>{item.time}</Text>
                                            </View>
                                        </View>
                                        <Card.Content>
                                            <Progress.Circle
                                                progress={item.value}
                                                size={120}
                                                showsText={true}
                                                animated={false}
                                                color={getColour(item.value)}
                                                thickness={8}/>
                                        </Card.Content>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        ) : null)}

                        {
                            answers.de && answers.dp ?
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                        {i18n.t('noTherapy')}
                                    </Text>
                                </View> : null
                        }

                    </FadeInView> : null}
                </ScrollView>
                <View style={{width: "100%",height: 100}}>
                    <TouchableOpacity style={styles.bottomBtn}
                                      onPress={() => backToHome()}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                            {i18n.t('exit')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalDescriptionContainer}>
                            <ScrollView style={styles.modalScroll}
                                        contentContainerStyle={styles.modalScrollContent}
                                        showsVerticalScrollIndicator={false}
                            >
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 15 }}>

                                    {i18n.t('summaryTherapy1')}
                                </Text>
                                <Text style={styles.desc}>
                                    {i18n.t('summaryTherapy2')}
                                </Text>

                                {therapyList?.find((therapy) => therapy.id === pickedTherapyId).description.map((item, index) => (
                                    <Text key={index} style={styles.desc}>{item}</Text>
                                )) ?? 'Brak opisu'}




                            </ScrollView>
                        </View>
                    <View style={styles.modalFooter}>
                        <Button color={'#3C69E7'} mode="contained" onPress={hideModal}>
                            OK
                        </Button>
                    </View>
                    </View>
                </Modal>
            </Portal>
        </View>
    );
}

export default React.memo(Summary);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
    },
    bottomBtn:{
        width: windowWidth - 40,
        marginTop: 30,
        height: 50,
        lineHeight: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3C69E7',
        color: '#3C69E7',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#3C69E7'
    },
    title: {
        fontSize: 28,
        color: '#262626',
        fontWeight: 'bold'
    },
    desc: {
        marginBottom: 10
    },
    text: {
        fontSize: 16,
        color: '#262626',
        lineHeight: 26,
        marginTop: 22,
        marginBottom: 15
    },
    summary: {
        marginTop: 15
    },
    summaryTitle: {
      color: '#262626',
      marginTop: 15,
      marginHorizontal: 14,
      marginBottom: 5,
      fontSize: 20,
      lineHeight: 30,
      marginVertical: 2,
      letterSpacing: 0.15,
      fontWeight: 'bold'
    },
    subtitle: {
        color: '#A4AAB9',
        fontSize: 16,

    },
    progressBar: {
       height: 20,
       width: windowWidth - 40
    },
    modalContainer: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: '80%',
        borderRadius:20
    },
    modalContent: {
        flexDirection: 'column',
        flex:1
    },
    modalDescriptionContainer: {
        height: '80%'
    },
    modalScroll: {
        flex:1,
        marginTop:20,
        marginHorizontal: 20
    },
    modalScrollContent: {
        justifyContent:'center',
        alignItems:'flex-start',
        flexGrow:1
    },
    modalFooter: {
        height: '20%',
        width: '100%',
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
        flex: 9,
        top: windowWidth/8,
        opacity: 0.15,
        position: 'absolute',
        width: windowWidth*1.2,
        height: windowWidth*1.2,
    },
});
