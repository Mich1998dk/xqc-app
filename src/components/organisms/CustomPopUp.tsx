import React, { CSSProperties, SyntheticEvent, useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable } from 'react-native';
import { Popup } from 'reactjs-popup'
import { colors } from '../../utils/theme';
import { Button } from '../molecules';
interface Props {
    visible: boolean;
    onClose: Function;
}

export default function CustomPopUp({ visible, onClose }: Props) {
    
    return (
        <Popup
            open={visible}
            onClose={() => onClose(false)}
            contentStyle={styleSheet.contentStyle}
            overlayStyle={styleSheet.overlayStyle}
            closeOnEscape
            closeOnDocumentClick
        >
            <h1 style={styleSheet.h1Style}>test</h1>
            <p style={styleSheet.h1Style}> You have choes to merge x and y, would you like to continue?</p>
            <View style={styles.buttonsView}>
                <Button title="Cancel" onPress={() => false} style={styleSheet.buttonStyle} secondary />
                <Button title="no" onPress={() => false} style={styleSheet.buttonStyle} />
                <Button title="yes" onPress={() => false} style={styleSheet.buttonStyle} />
            </View>
        </Popup>
    );
}
const styleSheet = {

    contentStyle: {
        height: "auto",
        width: "auto",
        overflow: 'auto',
        overflowX: 'hidden',
        padding: "0 1% 1% 1%",
        backgroundColor: colors.background,
        borderStyle: "solid",
        borderColor: colors.accent,
        borderWidth: "medium",
        borderRadius: "25px",
    } as CSSProperties,

    h1Style: {
        color: colors.white,
        textAlign: 'center'
    } as CSSProperties,

    overlayStyle: {
        backgroundColor: colors.popupBackground
    } as CSSProperties,

    buttonStyle: {
        width: 100
    } as CSSProperties,
}

const styles = StyleSheet.create({
    buttonsView: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-around"
    },
});
