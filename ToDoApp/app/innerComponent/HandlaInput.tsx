import { TextInput, View, Button, StyleSheet } from "react-native";
import styles from "@/style/style"


type HandlaInputProps = {
    whatToGet : string;
    setWhatToGet : (whatToGet : string) => void;
    shoppingList : string;
    setShoppingList : (shoppingList : string) => void;
    setModalVisible : (modalVisible : boolean) => void;
    setSelectedTask : any;
    setTasks : (tasks : any[]) => void;
    tasks : any[];

}

export default function HandlaInput({whatToGet, setWhatToGet, shoppingList, setShoppingList, setModalVisible, setSelectedTask, setTasks, tasks} : HandlaInputProps){

        interface shoppingList {
        type : "ShoppingList",
        whatToGet : string,
        shoppingList : string;
    }

    return(
        <>
            <TextInput placeholder='What to get?' placeholderTextColor="#000000" style={styles.input} value={whatToGet} onChangeText={setWhatToGet}/>
            <TextInput placeholder='Shopping list' multiline={true} textAlignVertical="top" placeholderTextColor="#000000" style={[styles.input, {height : 125}]} value={shoppingList} onChangeText={setShoppingList}/>
        
            <View style={[styles.addTask, {marginTop : 50}]}> 
                <View style={[styles.button, {height : 40}]}>
                    <Button color={"#ffffff"} title='Add task' onPress={() => {
                        setModalVisible(false);
                        setSelectedTask(null);
                        const newTask: shoppingList = {
                            type : "ShoppingList",
                            whatToGet : whatToGet,
                            shoppingList : shoppingList
                        }
                        setTasks([...tasks, newTask]);
                        setWhatToGet("");
                        setShoppingList("");
                        }
                    }/>
                </View>
            </View>
        </>
    )
}