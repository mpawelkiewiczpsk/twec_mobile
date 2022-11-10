import {View, Text, StyleSheet, Dimensions,TouchableWithoutFeedback} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import i18n from 'i18n-js';

const toastWidth = Dimensions.get('screen').width - 80;
const toastSideWidth = 40;

const hideToast = () => {
    Toast.hide();
}

export default () => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.leftToastSide}>
                <Icon name={'alert-circle'} size={24} color={'#ff4d4f'}/>
                </View>
                <View style={styles.alertContent}>
                <Text style={styles.alertText}>
                    {i18n.t('alert')}
                </Text>
                </View>
                <View style={styles.rightToastSide}>
                    <TouchableWithoutFeedback onPress={hideToast} style={styles.height100pro}>
                    <Icon name={'close'} size={24} color={'rgba(0,0,0,0.32)'}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',alignItems: 'center',
        alignSelf:'center',
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#FEF8EA',
        borderColor: '#ff4d4f',
        borderWidth: 2,
        borderRadius: 6
    },
    content:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: toastWidth
    },
    leftToastSide: {
        width: toastSideWidth,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    alertContent: {
        width: toastWidth - 2*toastSideWidth
    },
    alertText: {
        marginHorizontal: 5,
        fontSize: 15,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    rightToastSide: {
        width: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%'
    },
    height100pro: {
        height: '100%'
    }
});
