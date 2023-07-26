import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { HStack, Button, useToast } from 'native-base';
import { ScanDynamicButton } from 'components/index'
import * as Clipboard from 'expo-clipboard';

import Color from 'common/color';

const { width, height } = Dimensions.get('window')


export const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(false);
    const [scanned, setScanned] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const [areaCorrect, setAreaCorrect] = useState<boolean>(false)
    const [buttonData, setButtonData] = useState<Object>({})
    const toast = useToast()
    const [cornerPoints, setCornerPoints] = useState([
        { "x": 0, "y": 0 },
        { "x": 0, "y": 0 },
        { "x": 0, "y": 0 },
        { "x": 0, "y": 0 }
    ])

    const widthLeftLimit = (width - 250) / 2
    const widthRightLimit = width - widthLeftLimit

    const heightLeftLimit = (height - 250) / 2
    const heightRightLimit = height - heightLeftLimit


    const limitPoint = [
        { "x": widthLeftLimit, "y": heightLeftLimit },
        { "x": widthRightLimit, "y": heightLeftLimit },
        { "x": widthLeftLimit, "y": heightRightLimit },
        { "x": widthRightLimit, "y": heightRightLimit },
    ]

    const copyToClipboard = async (buttonData: any) => {
        await Clipboard.setStringAsync(buttonData.data);
        toast.show({
            description: "Copied to Clipboard",
        })
    };


    const getBarCodeScannerPermissions = async () => {
        setHasPermission(null);
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    const handleBarCodeScanned = ({ type, data, cornerPoints }: { type: string, data: string, cornerPoints: any }) => {
        setCornerPoints(cornerPoints)

        const topStart = cornerPoints[0].x > limitPoint[0].x && cornerPoints[0].y > limitPoint[0].y
        const topEnd = cornerPoints[1].x < limitPoint[1].x && cornerPoints[1].y > limitPoint[1].y
        const bottomStart = cornerPoints[2].x > limitPoint[2].x && cornerPoints[2].y < limitPoint[2].y
        const bottomEnd = cornerPoints[3].x < limitPoint[3].x && cornerPoints[3].y < limitPoint[3].y

        if (topStart && topEnd && bottomStart && bottomEnd) {
            setScanned(true);
            setAreaCorrect(true)
            setButtonData({ type, data })
            const text = `Bar code with type ${type} and data ${data} has been scanned!`
            setText(text)
        } else {
            setAreaCorrect(false)
            const text = `Please scan the barcode in the center of the screen`
            setText(text)
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return (
            <SafeAreaView className='bg-red-100 flex-1 i items-center justify-center'>
                <Text>No access to camera</Text>
                <Button onPress={() => getBarCodeScannerPermissions()} >
                    Allow Camera
                </Button>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.barcodeBox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={styles.absoluteFillObject}

                />
                <Text style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: 50,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    textAlign: 'center',
                    padding: 10,
                    fontSize: 16,
                    fontWeight: 'bold'
                }}>
                    {text}
                </Text>
                <View style={{
                    position: 'absolute',
                    top: limitPoint[0].y,
                    left: limitPoint[0].x,
                    width: 30,
                    height: 30,
                    borderBottomEndRadius: 30,
                    borderColor: 'white',
                    borderEndWidth: 4,
                    borderBottomWidth: 4,
                    transform: [{ rotate: '180deg' }]
                }}></View>

                <View style={{
                    position: 'absolute',
                    top: limitPoint[1].y,
                    left: limitPoint[1].x,
                    width: 30,
                    height: 30,
                    borderBottomEndRadius: 30,
                    borderColor: 'white',
                    borderEndWidth: 4,
                    borderBottomWidth: 4,
                    transform: [{ rotate: '270deg' }]
                }}></View>

                <View style={{
                    position: 'absolute',
                    top: limitPoint[2].y,
                    left: limitPoint[2].x,
                    width: 30,
                    height: 30,
                    borderBottomStartRadius: 30,
                    borderColor: 'white',
                    borderBottomWidth: 4,
                    borderStartWidth: 4,
                }}></View>

                <View style={{
                    position: 'absolute',
                    top: limitPoint[3].y,
                    left: limitPoint[3].x,
                    width: 30,
                    height: 30,
                    borderBottomEndRadius: 30,
                    borderColor: 'white',
                    borderEndWidth: 4,
                    borderBottomWidth: 4,
                }}></View>

                {/* ---------------------- */}

                <View style={{
                    position: 'absolute',
                    top: cornerPoints[0].y,
                    left: cornerPoints[0].x,
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: areaCorrect ? 'green' : 'red'
                }}></View>

                <View style={{
                    position: 'absolute',
                    top: cornerPoints[1].y,
                    left: cornerPoints[1].x,
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: areaCorrect ? 'green' : 'red'
                }}></View>

                <View style={{
                    position: 'absolute',
                    top: cornerPoints[2].y,
                    left: cornerPoints[2].x,
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: areaCorrect ? 'green' : 'red'
                }}></View>

                <View style={{
                    position: 'absolute',
                    top: cornerPoints[3].y,
                    left: cornerPoints[3].x,
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: areaCorrect ? 'green' : 'red'
                }}></View>
                {
                    scanned && (
                        <HStack style={styles.scanButtons} justifyContent="space-around" alignItems="center" space={2}>
                            <Button size="md" variant="ghost" onPress={() => setScanned(false)}>
                                Tap to Scan Again
                            </Button>
                            <ScanDynamicButton buttonData={buttonData} />
                            <Button size="md" variant="ghost" onPress={() => copyToClipboard(buttonData)}>
                                Copy
                            </Button>
                        </HStack>
                    )
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    barcodeBox: {
        width: '100%',
        height: '100%',
    },
    absoluteFillObject: {
        width: '100%',
        height: '100%',
    },
    scanButtons: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50,
        backgroundColor: Color.secondary,
    },

    // scanButton: {
    //     position: 'absolute',
    //     bottom: 0,
    //     width: '100%',
    //     height: 50,
    //     justifyContent: 'center',
    // }

});
