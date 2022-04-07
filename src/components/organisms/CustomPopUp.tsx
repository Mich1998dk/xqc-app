import React, { CSSProperties, SyntheticEvent, useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable } from 'react-native';
import { Popup } from 'reactjs-popup'
import { colors } from '../../utils/theme';
import { Model } from '../../utils/types';
import { Button } from '../molecules';
interface Props {
    title: string;
    contentText: string;
    visible: boolean;
    onClose: Function;
    buttons: any[];
}

export default function CustomPopUp({ title, contentText, visible, onClose, buttons}: Props) {
    
    return (
        <Popup
            open={visible}
            onClose={() => onClose()}
            contentStyle={styleSheet.contentStyle}
            overlayStyle={styleSheet.overlayStyle}
            closeOnEscape
            closeOnDocumentClick
        >
            <h1 style={styleSheet.h1Style}>{title}</h1>
            <p style={styleSheet.h1Style}>{contentText}</p>
            <View style={styles.buttonsView}>
                {buttons}
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
