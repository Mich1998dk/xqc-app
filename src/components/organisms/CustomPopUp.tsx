import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable } from 'react-native';

interface Props {
    title: string;
    description: string;
    buttons: any[];
    visible: boolean;
    close: Function
}

export default function CustomPopUp({
    title,
    description,
    buttons,
    visible,
    close
}: Props) {
    //const [popUpVisible, setPopUpVisible] = useState(false);
    return (
        <Modal
            visible={false}
            onRequestClose={close()}
            transparent={true}>
                <View>
                    <Text> {title} </Text>
                    <Text> {description} </Text>
                    {buttons}
                </View>
        </Modal>
    );
}

const styles = StyleSheet.create({})
