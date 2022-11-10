import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import i18n from '../i18n-config'
import {Ionicons} from "@expo/vector-icons";


const windowWidth = Dimensions.get('window').width;

export default function Info({ navigation }) {


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.about}>
                <ScrollView>
                    <View style={{paddingHorizontal: 15, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require("./../img/TWEC_logo_color.png")} style={{resizeMode: "contain", height: 100, width: 100}}/>
                        <Image source={require("./../img/loga_eu.png")} style={{resizeMode: "contain", height: 200, width: 200}}/>
                        <Text style={styles.title}>{i18n.t('info1')}</Text>
                        <Text style={styles.text}>
                            {i18n.t('info2')}
                        </Text>
                        <Text style={styles.title}>{i18n.t('info3')}</Text>
                        <Text style={styles.text}>
                            {i18n.t('info2')}
                        </Text>
                        <Text style={styles.title}>{i18n.t('authors')}</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.authorBox} onPress={() => navigation.replace('psk')}>
                                <Text style={styles.authorsText}>
                                    Politechnika Świętokrzyska w Kielcach
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.authorBox} onPress={() => navigation.replace('orsk')}>
                                <Text style={styles.authorsText}>
                                    Ortopedyczno-Rehabilitacyjny Szpital Kliniczny w Poznaniu
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.authorBox} onPress={() => navigation.replace('ump')}>
                                <Text style={styles.authorsText}>
                                    Uniwersytet Medyczny im. Karola Marcinkowskiego w Poznaniu
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.authorBox} onPress={() => navigation.replace('technomex')}>
                                <Text style={styles.authorsText}>
                                    Technomex
                                </Text>
                            </TouchableOpacity>

                        </View>



                    </View>

                </ScrollView>
            </View>
            <View style={{flex:2, justifyContent: 'center'}}>
                <TouchableOpacity style={{...styles.bottomBtn, backgroundColor: '#3C69E7'}}
                                  icon="arrow-right"
                                  mode="contained"
                                  onPress={() => navigation.replace('Home')}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                        <Ionicons name="md-arrow-back" size={16} color="#fff" />&nbsp;&nbsp;
                        {i18n.t('info4')}

                    </Text>
                </TouchableOpacity>
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
        width: windowWidth - 60,
        height: 70,
        borderWidth: 2
    },
    bottomBtn:{
        width: windowWidth - 40,
        height: 50,
        lineHeight: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3C69E7',
        color: '#3C69E7',
        display: 'flex',
        justifyContent: 'center',
    },
    about: {
        flex: 9
    },
    title: {
        color: '#262626',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 13,
        marginTop: 26
    },
    text: {
        color: '#262626',
        fontSize: 16,
        textAlign: 'justify'
    },
    authorsText: {
        color: '#262626',
        fontSize: 13,
        textAlign: 'center',
        padding: 8
    },
    authorBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#ccc',
        margin: 8
    }
});
