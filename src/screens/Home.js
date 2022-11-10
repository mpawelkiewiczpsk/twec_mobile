import {useEffect, useRef, useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native';
import i18n from '../i18n-config'
import {Ionicons} from "@expo/vector-icons";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const imageFileNames = [
    require('./../img/photos/image1.jpg'),
    require('./../img/photos/image2.jpg'),
    require('./../img/photos/image3.jpg'),
    require('./../img/photos/image4.jpg'),
    require('./../img/photos/image5.jpg'),
    require('./../img/photos/image6.jpg'),
    require('./../img/photos/image7.jpg')
];

const ImageAnimator = (props) => {
    // Kanał alfa dla obrazów #1 i #2 (dla drugiego odwrócony):
    const alpha = useRef(new Animated.Value(0)).current;
    const alpha2 = Animated.add(Animated.multiply(-1, alpha), 1);
    // Przesunięcie dla obrazów #1 i #2 (dla drugiego przesunięty o 50%):
    const shift = useRef(new Animated.Value(0)).current;
    const shift2 = Animated.modulo(Animated.add(shift, 0.5), 1);

    const [imNo, setImNo] = useState([0, 5, 0, 0]);

    let runOneSequence = function () {
        shift.setValue(0);

        Animated.parallel([
            // Alpha:
            Animated.sequence([
                Animated.delay(100),
                Animated.timing(alpha, {
                        toValue: 1,
                        duration: 3000,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(alpha, {
                        toValue: 0,
                        duration: 3000,
                        useNativeDriver: true
                    }
                ),
                Animated.delay(100)
            ]),
            // Shift:
            Animated.timing(shift, {
                    toValue: 1,
                    duration: 6300,
                    useNativeDriver: true
                }
            )
        ]).start(() => {
            // Wylosowanie nowych numerów zdjęć (bez powtórzeń):
            let i1 = Math.floor(Math.random() * imageFileNames.length);
            if(i1 === imNo[0])       i1 = (i1 + 1) % imageFileNames.length;
            let i2 = Math.floor(Math.random() * imageFileNames.length);
            if(i2 === imNo[1])       i2 = (i2 + 1) % imageFileNames.length;
            // Jeśli są takie same:
            if(i1 === i2)   i2 = (i2 + 1) % imageFileNames.length;
            // Wylosowanie dwóch efektów (dowolnych):
            const e1 = Math.floor(Math.random() * 2);
            const e2 = Math.floor(Math.random() * 2);
            // Ustawienie zmiennej stanu i automatyczne odświeżenie widoku:
            setImNo( [i1, i2, e1, e2]  );
        })
    }

    useEffect(() => {
        runOneSequence();
    }, [alpha, alpha2, shift, shift2, imNo])

    return(
        <View style={styles.container}>
            {imNo[2] === 0 &&
                <Animated.Image
                    source={imageFileNames[imNo[0]]}
                    resizeMode="cover"
                    style={{
                        ...props.style,
                        opacity: alpha,

                        transform: [
                            {
                                translateX: shift.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-100, 100]
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
            {imNo[2] === 1 &&
                <Animated.Image
                    source={imageFileNames[imNo[0]]}
                    resizeMode="cover"
                    style={{
                        ...props.style,
                        opacity: alpha,

                        transform: [
                            {
                                translateX: shift.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [90, -60]
                                })
                            },
                            {
                                scale: shift.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.8, 1.1]
                                })
                            }
                        ]
                    }}
                >
                    {props.children}
                </Animated.Image>
            }

            {imNo[3] === 0 &&
                <Animated.Image
                    source={imageFileNames[imNo[1]]}
                    resizeMode="cover"
                    style={{
                        ...props.style,
                        opacity: alpha2,

                        transform: [
                            {
                                translateY: shift2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-100, 200]
                                })
                            },
                            {
                                rotate: shift2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['-5deg', '15deg']
                                })
                            }
                        ]
                    }}
                >
                    {props.children}
                </Animated.Image>
            }
            {imNo[3] === 1 &&
                <Animated.Image
                    source={imageFileNames[imNo[1]]}
                    resizeMode="cover"
                    style={{
                        ...props.style,
                        opacity: alpha2,

                        transform: [
                            {
                                translateY: shift2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [160, -50]
                                })
                            },
                            {
                                rotate: shift2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['5deg', '-5deg']
                                })
                            },
                            {
                                scale: shift2.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1.2, 0.75]
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

export default function Home({ navigation }) {

    return (
        <View style={styles.container}>

            <SafeAreaView style={styles.top}>
                <View style={{zIndex: 9999, width: '100%', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <TouchableOpacity onPress={() => navigation.replace('SelectLang')}
                                      style={{
                                          zIndex: 9999,
                                          marginRight: 10,
                                          marginTop: 10,
                                          shadowColor: "#000",
                                          shadowOffset: {
                                              width: 0,
                                              height: 2,
                                          },
                                          shadowOpacity: 0.25,
                                          shadowRadius: 3.84,

                                          elevation: 5,
                                      }}>
                        {i18n.locale === 'pl' && <Image width={52} height={35} source={require("./../img/flags/pl.png")}/>}
                        {i18n.locale === 'en' && <Image width={52} height={35} source={require("./../img/flags/uk.png")}/>}


                    </TouchableOpacity>
                </View>

                <View style={{flex: 1, alignItems: 'center'}}>
                    <ImageAnimator style={styles.image}/>
                    <Image style={styles.logo} source={require("./../img/TWEC_logo_white_shadow.png")}/>
                </View>
            </SafeAreaView>
            <SafeAreaView style={styles.bottom}>
                <Text style={styles.mainTitle}>{i18n.t('title')}</Text>
                <Text style={styles.subTitle}>{i18n.t('subtitle')}</Text>
                <View style={styles.buttonsDown}>
                    <TouchableOpacity style={{...styles.bottomBtn, backgroundColor: '#fff'}}
                                      onPress={() => navigation.replace('Info')}>
                        <Text style={styles.btnPrev}> {i18n.t('about')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.bottomBtn, backgroundColor: '#3C69E7'}}
                                      onPress={() => navigation.replace('PatientData')}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                            {i18n.t('next')}&nbsp;&nbsp;
                            <Ionicons name="md-arrow-forward" size={16} color="#fff" />
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mainTitle:{
        color: '#262626',
        fontSize: 22,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 16,
        padding: 10,
        color: '#262626',
        marginBottom: 52,
        textAlign: 'justify'
    },
    top: {
        flex: 2,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
        width: windowWidth
    },
    bottom: {
        flex:1,
        //backgroundColor: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        alignItems: 'center',
        marginBottom: 50,
        marginTop: 70,
        justifyContent: 'flex-end',
    },
    image: {
        flex: 9,
        position: 'absolute',
        width: windowWidth*1.2,
        height: windowWidth*1.2,
    },
    logo: {
        position: 'absolute',
        width: windowWidth * 0.75,
        height: windowWidth * 0.75 / 3.1,
        left: (windowWidth * 0.25)/2,
        top: windowHeight/6
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
});
