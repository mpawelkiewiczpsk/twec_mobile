import {StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Dimensions, Image} from 'react-native';
import { Button } from 'react-native-paper';
import {Ionicons} from "@expo/vector-icons";
import { useQuestionsContext } from "../contexts/questions";
import i18n from '../i18n-config'

const windowWidth = Dimensions.get('window').width;

export default function PatientReject({ navigation }) {

    const { removeAllAnswers, answers } = useQuestionsContext();

    const backToHome = () => {
        removeAllAnswers();
        navigation.replace('Home')
    }


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.top}>
                <View style={{flex: 1, alignItems: 'center'}}>

                </View>
                <View style={{flex: 4, alignItems: 'center'}}>
                    <Ionicons name="md-warning" size={150} color="#fff" />
                    <Text style={styles.mainTitle}>{i18n.t('patientReject1')}</Text>
                    <Text style={styles.subTitle}>
                        {i18n.t('patientReject2')}
                    </Text>
                </View>

            </SafeAreaView>
            <SafeAreaView style={styles.bottom}>
                <View style={styles.buttonsDown}>
                    <Button contentStyle={{...styles.bottomBtn, backgroundColor: '#fff'}}
                            color="#3C69E7"
                            mode="outlined"
                            onPress={() => navigation.replace(answers.prevNav)}>
                        {i18n.t('prev')}
                    </Button>
                    <Button contentStyle={{...styles.bottomBtn, backgroundColor: '#3C69E7'}}
                            mode="contained"
                            onPress={() => backToHome() }>
                        <Text style={{color: '#fff'}}>{i18n.t('exit')}</Text>
                    </Button>
                </View>
            </SafeAreaView>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5222d',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mainTitle:{
        color: '#fff',
        fontSize: 30,
        padding: 30,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 20,
        paddingLeft: 30,
        paddingRight: 30,
        color: '#fff',
        marginBottom: 52
    },
    top: {
        flex: 4,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 0,
        width: windowWidth
    },
    bottom: {
        flex:1,
        backgroundColor: '#f5222d',
        alignItems: 'center',
        marginBottom: 50,
        justifyContent: 'flex-end',
    },
    buttonsDown: {
        display: 'flex',
        width: windowWidth,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bottomBtn:{
        width: (windowWidth / 2) - 40,
        height: 50,
        lineHeight: 50,
        borderWidth: 2,
        borderColor: 'transparent',
        color: '#262626',
        display: 'flex',
        justifyContent: 'center',
    }
});
