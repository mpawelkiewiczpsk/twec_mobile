import {Dimensions, StyleSheet, Text, PixelRatio, Platform, Pressable } from "react-native";
import Svg, {Polygon} from "react-native-svg";

const {
    width: SCREEN_WIDTH
} = Dimensions.get('window');

const windowWidth = Dimensions.get('window').width;
const fontScale = Dimensions.get('window').fontScale;

// Dopasuj do rozmiaru wielokąta:
export const OverlayAlertHeight = fontScale * windowWidth / 3.5;

const scale = SCREEN_WIDTH / 320;

function normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}


/*
 * message - message to be displayed
 * arrowLeft - if defined and not "false", position arrow on the left
 */
export const OverlayAlert = (props) => {
    // Position:
    const px = (props.px !== undefined) ? Number(props.px) : 0;
    const py = (props.py !== undefined) ? Number(props.py) : 0;
    // Height multiplier:
    const sizeScale = (props.sizeScale !== undefined) ? Number(props.sizeScale) : 1;

    const polyPoints = genPolygon( px + 0, py + 0);
    const polyPointsShadow = genPolygon(px + 4, py + 4);

    function genPolygon(sx, sy) {
        // Pozycja alertu:
        const pl = windowWidth / 16;
        const pt = 0;
        const pw = windowWidth - pl*2;
        const ph = sizeScale * fontScale * windowWidth / 5;
        let apos = windowWidth * 0.75;  // Pozycja strzałki (koniec)
        const ah = fontScale * windowWidth / 16;    // Wysokość i szerokość strzałki
        // Jeżeli strzałka ma być z lewej to zmiana pozycji:
        if(props.arrowLeft !== undefined && props.arrowLeft !== "false")     apos = windowWidth * 0.25;
        // Wygenerowanie kształtu:
        let pp = (sx + pl) + "," + (sy + pt) + " ";
        pp += (sx + pl + pw) + "," + (sy + pt) + " ";
        pp += (sx + pl + pw) + "," + (sy + pt + ph) + " ";
        // Strzałeczka:
        pp += (sx + apos + ah) + "," + (sy + pt + ph) + " ";
        pp += (sx + apos) + "," + (sy + pt + ph + ah) + " ";
        pp += (sx + apos - ah) + "," + (sy + pt + ph) + " ";
        // Domknięcie:
        pp += (sx + pl) + "," + (sy + pt + ph) + " ";

        return pp;
    }

    return (
        <Pressable style={[styles.overlay, props.style, {height: OverlayAlertHeight * sizeScale}]} onPress={() => props.onClick()}>
            <Svg>
                <Polygon
                    points={polyPointsShadow} fill="rgba(0, 0, 0, 0.33)"
                />
                <Polygon
                    points={polyPoints} fill="red"
                />
            </Svg>
            <Text style={styles.alerttext}>{props.message}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 10,
        opacity: 0.95,
        width: windowWidth,
        height: OverlayAlertHeight,
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alerttext: {
        position: 'absolute',
        width: windowWidth * 0.81,
        fontSize: normalize(14),
        textAlign: 'center',
        fontWeight: 'bold',
        color: "#FFFFFF",
        paddingBottom: "14%",
    },
});

