import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';

interface Props {
    title: string;
    description: string;
    buttons: TouchableOpacity[];
}

export default function CustomPopUp({
    title,
    description,
    buttons
}: Props) {
    const [popUpVisible, setPopUpVisible] = useState(false);
    return (
        <View>
            <Modal
                visible={popUpVisible}
                onRequestClose={() => {
                    setPopUpVisible(!popUpVisible)
                }}
            >
                <View>
                    <Text> {title} </Text>
                    <Text> {description} </Text>
                    {buttons}
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({})
