import React, { CSSProperties } from 'react';
import { StyleSheet, View } from 'react-native';
import { Popup } from 'reactjs-popup';
import { colors, fonts } from '../../utils/theme';
interface Props {
    title: string;
    contentText: string;
    visible: boolean;
    onClose: Function;
    buttons: any[];
}

/**
 * A custom popup that will have the same styling as rest of XQC.
 * This is a generic callable class which means it is reusable everywhere a popup is needed
 *
 * @param title The title of the popup, this is a @type {string}
 * @param contentText The main text of the popup, this is a @type {string}
 * @param visible The visibility of the popup, this is a @type {boolean} with true meaning visible and false meaning invisible
 * @param onClose A @type{Function} to determine what happens when you close the popup
 * @param buttons An array of buttons, these are the buttons showed at the bottom of the popup, this is a @type {any[]}
 *
 * @returns The custom popup as a HTML style code
 */
export default function CustomPopUp({ title, contentText, visible, onClose, buttons}: Props) {

    //A custom way to implement the use of '\n' in the contentText as newlines
    const contentTextLines = contentText.split("\n").map(line => <p key={line}>{line}</p>);

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
//The styles used
const styleSheet = {
    //The style used for the main content
    contentStyle: {
        height: "auto",
        width: "auto",
        overflow: "auto",
        overflowX: "hidden",
        padding: "0 1% 1% 1%",
        backgroundColor: colors.background,
        borderStyle: "solid",
        borderColor: colors.accent,
        borderWidth: "medium",
        borderRadius: "25px",
        fontFamily: fonts.med,
        color: colors.white,
        textAlign: "center",
    } as CSSProperties,

    //The style used for everything around the popup (making the sides darker but transparent)
    overlayStyle: {
        backgroundColor: colors.popupBackground
    } as CSSProperties,
}

//The style used for buttons to be in rows with spacing between
const styles = StyleSheet.create({
    buttonsView: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-around"
    },
});
