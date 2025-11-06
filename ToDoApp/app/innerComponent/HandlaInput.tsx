import {useState} from "react";
import { TextInput, View, Button } from "react-native";
import styles from "@/style/style"

import { shoppingList } from "../(tabs)";

type HandlaInputProps = {
    setModalVisible : (modalVisible : boolean) => void;
    setSelectedTask : any;
    setTasks : (tasks : any[]) => void;
    tasks : any[];
}

export default function HandlaInput({setModalVisible, setSelectedTask, setTasks, tasks} : HandlaInputProps){

    const[whatToGet, setWhatToGet] = useState("");
    const[shoppingList, setShoppingList] = useState("");

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
                            shoppingList : shoppingList,
                            checkedItems: shoppingList.split("\n").map(() => false),
                            index : tasks.length

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