import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    SafeAreaView,
    Platform,
    FlatList,
    StatusBar,
    TouchableOpacity, Image
} from 'react-native';
import i18n from '../../i18n-config'
import {Ionicons} from "@expo/vector-icons";


const psk_authors = [
    {
        id: '0',
        name: 'dr hab. inż. Roman Deniziak, prof. PŚk',
    },
    {
        id: '1',
        name: 'dr inż. Mariusz Wiśniewski',
    },
    {
        id: '2',
        name: 'dr inż. Grzegorz Łukawski',
    },
    {
        id: '3',
        name: 'dr inż. Karol Wieczorek',
    },
    {
        id: '4',
        name: 'dr inż. Mariusz Bedla',
    },
    {
        id: '5',
        name: 'dr inż. Adam Krechowicz',
    },
    {
        id: '6',
        name: 'mgr inż. Mirosław Borkowski',
    },
    {
        id: '7',
        name: 'mgr inż. Paweł Pięta',
    },
    {
        id: '8',
        name: 'mgr inż. Daniel Kaczmarski',
    },
    {
        id: '9',
        name: 'mgr inż. Małgorzata Płaza',
    },
    {
        id: '10',
        name: 'mgr inż. Mateusz Pawełkiewicz',
    }
];

const windowWidth = Dimensions.get('window').width;


const Item = ({ name }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
    </View>
);

export default function PSK({ navigation }) {

    const renderItem = ({ item }) => (
        <Item name={item.name} />
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.about}>
                <View>
                    <View style={{paddingHorizontal: 15, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require("./../../img/logos/psk_logo.png")} style={{resizeMode: "contain", width: 200}}/>

                            <FlatList
                                data={psk_authors}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />

                    </View>

                </View>
            </View>
            <View style={{flex:2, justifyContent: 'center'}}>
                <TouchableOpacity style={{...styles.bottomBtn, backgroundColor: '#3C69E7'}}
                                  icon="arrow-right"
                                  mode="contained"
                                  onPress={() => navigation.replace('Info')}>
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
    item: {
        padding: 5,
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
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5
    },
});
