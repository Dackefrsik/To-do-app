import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        paddingTop: 80,
        backgroundColor: "#000000",
        paddingBottom: 20,
    },

    title:{
        color: "#ffffff",
        fontSize: 60,
    },

    mainView: {
        flex: 1,
        backgroundColor: "#ffffff",
    }, 

    addTask:{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 20,
        color: "#ffffff",

    },

    button:{
        backgroundColor: "#145c23ff",
        width: 100, 
        borderRadius:10,
        alignItems: "center",
    }, 

    addTaskText:{
        color: "#ffffff",
        padding: 7,
        fontSize: 20,
       
    },

    modalBackground:{
        flex: 1,
        backgroundColor:"#ffffff"
    },

    modalHeader:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingTop: 50,
        paddingBottom: 20,
        borderBottomWidth: 3,
        marginLeft: 10,
        marginRight: 10,
        borderBottomColor: "#807b7bff", // färg på linjen
    },

    modalHeaderText:{
        fontSize: 60,
    },

    modalBody:{
        padding: 10,
    },

    input:{
        marginTop: 10,
        backgroundColor: "#d8d4d4ff",
        color: "#000000",
        padding: 10,
        fontSize: 30,
        borderRadius: 20,
    },

    time:{
        height: 10,
        marginTop: 10,
        backgroundColor: "#000000",
        borderRadius: 10, 
        paddingLeft: 10,        
    },

    taskContainer:{
        flexDirection: "row",
        backgroundColor: "#273896ff",
        margin: 10,
        borderRadius: 10,
        padding: 10
    },

    taskContainerTitle:{
        color:"#ffffff",
        fontSize: 20,
        paddingBottom: 3,
        borderBottomWidth: 2,
        borderBottomColor: "#807b7bff", // färg på linjen

    },

    left:{
        flex: 3,
    },

    
    right:{
        flexDirection: "row-reverse",
        flex: 1,
    },

    taskContainerText:{
        color: "#ffffff",
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
    }
})


export default styles;
