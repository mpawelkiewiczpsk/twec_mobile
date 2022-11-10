import * as React from 'react';
import Home from './screens/Home'
import SelectLang from './screens/SelectLang'
import Info from './screens/Info'
import Q1 from './screens/Q1'
import Q2 from './screens/Q2'
import Q3 from './screens/Q3'
import Q4 from './screens/Q4'
import Q5 from './screens/Q5'
import Q6 from './screens/Q6'
import Q7 from './screens/Q7'
import Q8 from './screens/Q8'
import Q9 from './screens/Q9'
import Q10 from './screens/Q10'
import Q11 from './screens/Q11'
import Q12 from './screens/Q12'
import Q13 from './screens/Q13'
import Q14 from './screens/Q14'
import Q15 from './screens/Q15'
import Summary from "./screens/Summary";
import PatientData from "./screens/PatientData";
import PatientReject from "./screens/PatientReject";
import PSK from './screens/authors/psk'
import ORSK from './screens/authors/orsk'
import UMP from './screens/authors/ump'
import Technomex from "./screens/authors/technomex";
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from "@react-native-async-storage/async-storage";


const headerOption = {
    headerShown: false
}

const Stack = createStackNavigator();



function StackNavigation() {

const [initialRoute, setInitialRoute] = React.useState(null)

const getData = async () => {
        try {
                const value = await AsyncStorage.getItem('lang')
                if(value !== null) {
                        setInitialRoute('Home')
                }else{
                        setInitialRoute('SelectLang')
                }
        } catch(e) {
                console.log(e);
                setInitialRoute('SelectLang')
        }
}

React.useEffect(async () => {
        await getData();
}, [])

    return initialRoute ? (
        <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="SelectLang" component={SelectLang} options={headerOption} />
                <Stack.Screen name="Home" component={Home} options={headerOption} />
                <Stack.Screen name="Info" component={Info} options={headerOption} />
                <Stack.Screen name="PatientData" component={PatientData} options={headerOption}/>
                <Stack.Screen name="Q1" component={Q1} options={headerOption}/>
                <Stack.Screen name="Q2" component={Q2} options={headerOption}/>
                <Stack.Screen name="Q3" component={Q3} options={headerOption}/>
                <Stack.Screen name="Q4" component={Q4} options={headerOption}/>
                <Stack.Screen name="Q5" component={Q5} options={headerOption}/>
                <Stack.Screen name="Q6" component={Q6} options={headerOption}/>
                <Stack.Screen name="Q7" component={Q7} options={headerOption}/>
                <Stack.Screen name="Q8" component={Q8} options={headerOption}/>
                <Stack.Screen name="Q9" component={Q9} options={headerOption}/>
                <Stack.Screen name="Q10" component={Q10} options={headerOption}/>
                <Stack.Screen name="Q11" component={Q11} options={headerOption}/>
                <Stack.Screen name="Q12" component={Q12} options={headerOption}/>
                <Stack.Screen name="Q13" component={Q13} options={headerOption}/>
                <Stack.Screen name="Q14" component={Q14} options={headerOption}/>
                <Stack.Screen name="Q15" component={Q15} options={headerOption}/>
                <Stack.Screen name="Summary" component={Summary} options={headerOption}/>
                <Stack.Screen name="PatientReject" component={PatientReject} options={headerOption}/>
                <Stack.Screen name="psk" component={PSK} options={headerOption}/>
                <Stack.Screen name="orsk" component={ORSK} options={headerOption}/>
                <Stack.Screen name="ump" component={UMP} options={headerOption}/>
                <Stack.Screen name="technomex" component={Technomex} options={headerOption}/>
        </Stack.Navigator>
    ) : null
}

export default StackNavigation;
