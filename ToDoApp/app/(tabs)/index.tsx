import React, { useState} from 'react';
import {View, Text, StyleSheet, Button, Modal, TouchableOpacity, TextInput} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import Entypo from '@expo/vector-icons/Entypo';

import GymInput from "./GymInput"

export default function CurrentList(){

    interface Gym{
        type : "Gym",
        whatToTrain : string,
        time : string,
        warmUp : string,
        note : string
    }

    interface shoppingList{
        type : "ShoppingList",
        whatToGet : string,
        shoppingList : string;
    }

    const[modalVisible, setModalVisible] = useState(false);
    const[open, setOpen] = useState(false)
    const[selectedTask, setSelectedTask] = useState(null);
    const[items, setItems] = useState([
        {label : "Gym", value : "Gym"},
        {label : "Handla", value : "Handla"},
    ]);
    const[selectedTime, selectTime] = useState(new Date());

    const[tasks, setTasks] = useState<(Gym | shoppingList)[]>([]);

    const[whatToTrain, setWhatToTrain] = useState("");
    const[warmUp, setWarmup] = useState("");
    const[note, setNote] = useState("");

    const[whatToGet, setWhatToGet] = useState("");
    const[shoppingList, setShoppingList] = useState("");

   const renderInput = () => {
        if(selectedTask === "Gym"){
            return(
                <>
                    <GymInput selectedTime={selectedTime} setModalVisible={setModalVisible} setSelectedTask={setSelectedTask} setTasks={setTasks} tasks={tasks} setWhatToTrain={setWhatToTrain} setNote={setNote} setWarmup={setWarmup} whatToTrain={whatToTrain}   // <-- Lägg till denna rad
    warmUp={warmUp}             // <-- Lägg till denna rad
    note={note} />
                    {/* <TextInput placeholder='What to train' placeholderTextColor="#000000" style={styles.input} value={whatToTrain} onChangeText={setWhatToTrain}/>
                    <DateTimePicker style={styles.time} testID='dateTimePicker' 
                    value={selectedTime} mode='time' 
                    is24Hour={true} 
                    display='default'/>
                    <TextInput placeholder='Warme up' placeholderTextColor="#000000"  style={styles.input} value={warmUp} onChangeText={setWarmup}/>
                    <TextInput placeholder='Note' multiline={true} textAlignVertical="top"  placeholderTextColor="#000000" style={[styles.input, {height : 125}]} value={note} onChangeText={setNote}/>
                    <View style={[styles.addTask , {marginTop: 50}]}>
                        <View style={[styles.button, {height : 40}]}>
                            <Button color={"#ffffff"} title='Add task' onPress={() => { 
                                setModalVisible(false) 
                                setSelectedTask(null)
                                const newTask: Gym = {
                                    type : "Gym",
                                    whatToTrain :  whatToTrain,
                                    time : selectedTime.toLocaleTimeString(),
                                    warmUp : warmUp,
                                    note : note
                                };
                                setTasks([...tasks, newTask]);
                                setWhatToTrain("");
                                setNote("");
                                setWarmup("");
                            }                                
                                }></Button>
                        </View>
                    </View> */}
                </>
            )
        }
        else if(selectedTask === "Handla"){
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
    }

    function removeTask(index : number){
        setTasks(pervTask => pervTask.filter((_, i) => i !== index))
    }

    return(
        <View style={styles.mainView}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    To-Do List
                </Text>
            </View>
            <View>
                {tasks.length > 0 ? (tasks.map((task, index) => {
                    if(task.type === "Gym"){
                        return(
                            <View key={index} style={styles.taskContainer}>
                                <View style={styles.left}>
                                    <Text style={styles.taskContainerTitle}>{task.type}</Text>
                                    <Text style={styles.taskContainerText} >Muscle Group: {task.whatToTrain}</Text>
                                    <Text style={styles.taskContainerText} >Tid: {task.time.slice(0,5)}</Text>
                                    {task.warmUp && (<Text style={styles.taskContainerText} >Warmup{task.warmUp}</Text>)}
                                    {task.note && (<Text style={styles.taskContainerText} >{task.note}</Text>)}
                                </View>
                                <View style={styles.right}>
                                    <TouchableOpacity onPress={() => removeTask(index)}>
                                        <Entypo name="circle" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        )
                    }
                    if(task.type === "ShoppingList"){
                        return(
                            <View key={index} style={styles.taskContainer}>
                                <View style={styles.left}>
                                    <Text style={styles.taskContainerTitle}>{task.type + " " + task.whatToGet} </Text>
                                    <Text style={styles.taskContainerText}>{task.shoppingList}</Text>
                                </View>
                                <View style={styles.right}>
                                    <TouchableOpacity onPress={() => removeTask(index)}>
                                        <Entypo name="circle" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                })) : (<></>)}
            </View>
            <View style={styles.addTask}>
                <View style={[styles.button]}>
                    <Button color={"#ffffff"} onPress={() => {
                        setModalVisible(true);
                    }} 
                    title='Add task'
                    />
                    <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}>
                    
                        <View style={styles.modalBackground}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalHeaderText}>
                                Add task
                                </Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}><Entypo name="cross" size={40} color="black" /></TouchableOpacity>
                            </View>
                            <View style={styles.modalBody}>
                                <DropDownPicker
                                open={open}
                                value={selectedTask}
                                items={items}
                                setOpen={setOpen}
                                setValue={setSelectedTask}
                                setItems={setItems}
                                placeholder="Chose task to add" />
                                {renderInput()}
                            </View>

                        </View>
                       
                    </Modal>

                </View>
            </View>
        </View>
    )
}

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
        paddingBottom: 20,
        color: "#ffffff",

    },

    button:{
        backgroundColor: "#145c23ff",
        width: 100, 
        borderRadius:10,
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
    }
})