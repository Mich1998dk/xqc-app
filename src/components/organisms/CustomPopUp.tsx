import React, { CSSProperties, SyntheticEvent, useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable } from 'react-native';
import { Popup } from 'reactjs-popup'
import { colors, fonts } from '../../utils/theme';
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
    
    const contentTextLines = contentText.split('\n').map(line => <p key={line}>{line}</p>)

    return (
        <Popup
            open={visible}
            onClose={() => onClose()}
            contentStyle={styleSheet.contentStyle}
            overlayStyle={styleSheet.overlayStyle}
            closeOnEscape
            closeOnDocumentClick
        >
            <h1 key="header">{title}</h1>
            {contentTextLines}
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
        fontFamily: fonts.med,
        color: colors.white,
        textAlign: 'center',
    } as CSSProperties,


    overlayStyle: {
        backgroundColor: colors.popupBackground
    } as CSSProperties,
}

const styles = StyleSheet.create({
    buttonsView: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-around"
    },
});
