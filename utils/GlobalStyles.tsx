import { StyleSheet, StatusBar} from "react-native"

const primaryColor = '#0081ff';

const GlobalStyles = StyleSheet.create({
    container : {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 26,
        backgroundColor : '#fafafc',
        alignItems: 'center',
        marginTop : StatusBar.currentHeight || 0,
    },
    invalidMessage : {
        fontSize: 13,
        color : 'red',
        marginTop: 2,
    }
})

export default { GlobalStyles, primaryColor };