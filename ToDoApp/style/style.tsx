import { StyleSheet } from "react-native";

const backgroundColor = "#F9FAFB";
const primaryColor = "#3B82F6";
const secondaryColor = "#E5E7EB";
const textColor = "#111827";
const done = "#10B981";

const fontTitle = "Inter Bold";
const fontText = "Inter Regular";

const styles = StyleSheet.create({
    navbar:{
        backgroundColor: primaryColor
    },

    navButtonColor:{
        color: textColor
    },

    container:{
        alignItems: "center",
        paddingTop: 80,
        backgroundColor: primaryColor,
        paddingBottom: 20,
    },

    title:{
        fontFamily: fontTitle,
        color: textColor,
        fontSize: 60,
    },

    mainView: {
        flex: 1,
        backgroundColor: backgroundColor,
    }, 

    addTask:{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        color: textColor,
        height: 100
        
    },

    button:{
        backgroundColor: done,
        width: 100, 
        borderRadius:10,
        alignItems: "center",
    }, 

    addTaskText:{
        fontFamily: fontText,
        color: textColor,
        padding: 7,
        fontSize: 20,
       
    },

    modalBackground:{
        flex: 1,
        backgroundColor: backgroundColor,
    },

    modalHeader:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: backgroundColor,
        paddingTop: 50,
        paddingBottom: 20,
        borderBottomWidth: 3,
        marginLeft: 10,
        marginRight: 10,
        borderBottomColor: primaryColor, // färg på linjen
    },

    modalHeaderText:{
        fontSize: 60,
        color: textColor,
        fontFamily: fontTitle
    },

    modalBody:{
        padding: 10,
    },

    input:{
        marginTop: 10,
        backgroundColor: primaryColor,
        fontFamily: fontText,
        color: textColor,
        padding: 10,
        fontSize: 30,
        borderRadius: 20,
    },

    time:{
        height: 10,
        marginTop: 10,
        backgroundColor: primaryColor,
        borderRadius: 10, 
        paddingLeft: 10,
    },

    taskContainer:{
        flexDirection: "row",
        backgroundColor: primaryColor,
        margin: 10,
        borderRadius: 10,
        padding: 10
    },

    taskContainerTitle:{
        fontFamily: fontTitle,
        color: textColor,
        fontSize: 20,
        paddingBottom: 3,
        borderBottomWidth: 2,
        borderBottomColor: primaryColor, // färg på linjen

    },

    left:{
        flex: 10,
    },
    
    right:{
        justifyContent: "flex-end",
        flex: 1,
    },

    innerRight:{
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between"
    },

    taskContainerText:{
        fontFamily: fontText,
        color: textColor,
        fontSize: 17
    },

    shoppingListRow:{
        flexDirection: "row",
        alignItems: "center"
    },
    
    checkShoppingList:{
        opacity: 0.25,
        marginRight: 5
    },

    shoppingListIcon:{
        marginTop: 5,
        marginRight: 5
    }, 

    doctorDropDownPicker:{
        marginTop: 5,
        zIndex: 1
    },

    dragView:{
        paddingTop: 10,
        marginBottom: 10,
        flex: 1
    }

})

export default styles;
