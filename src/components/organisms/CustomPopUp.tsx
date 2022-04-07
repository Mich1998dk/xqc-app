import React, { CSSProperties, useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable } from 'react-native';
import { Popup } from 'reactjs-popup'
interface Props {
    visible: boolean;
}

export default function CustomPopUp({ visible }: Props) {
    //const [popUpVisible, setPopUpVisible] = useState(false);
    return (
        <Popup
            open={visible}
            modal
            closeOnDocumentClick
            contentStyle={contentStyle}
        >
        </Popup>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: "75%",
        minWidth: "30%",
        maxHeight: "80%",
        height: "80%",
        width: "auto",
        grid: "80%",
        overflowX: 'hidden',
        padding: "1% 1% 0% 1%",
        backgroundColor: "#23272A",
        borderColor: "white"
    }

})

var contentStyle = {
    maxWidth: "75%",
    minWidth: "30%",
    maxHeight: "80%",
    height: "80%",
    width: "auto",
    grid: "80%",
    overflow: 'auto',
    overflowX: 'hidden',
    padding: "1% 1% 0% 1%",
    backgroundColor: "#23272A",
    borderColor: "white"
} as CSSProperties
