import React, { useState, useRef } from 'react';
import {View, Text, StyleSheet, Button, Modal, TouchableOpacity, TextInput} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import Entypo from '@expo/vector-icons/Entypo';

export default function CurrentList(){

    interface Gym{
        type : "Gym",
        whatToTrain : string,
        time : string,
        warmUp : string,
        not : string
    }

    const[modalVisible, setModalVisible] = useState(false);
    const[open, setOpen] = useState(false)
    const[selectedTask, setSelectedTask] = useState(null);
    const[items, setItems] = useState([
        {label : "Gym", value : "Gym"},
        {label : "Handla", value : "Handla"},
    ]);
    const[selectedTime, selectTime] = useState(new Date());
    const[isFocus, setIsFocus] = useState(false);

    const[tasks, setTasks] = useState<Gym[]>([]);

    const[whatToTrain, setWhatToTrain] = useState("");
    const[warmUp, setWarmup] = useState("");
    const[note, setNote] = useState("");

   const renderInput = () => {
        if(selectedTask === "Gym"){
            return(
                <>
                    <TextInput placeholder='What to train' placeholderTextColor="#000000" style={styles.input} value={whatToTrain} onChangeText={setWhatToTrain}/>
                    <DateTimePicker style={styles.time} testID='dateTimePicker' 
                    value={selectedTime} mode='time' 
                    is24Hour={true} 
                    display='default'/>
                    <TextInput placeholder='Warme up' placeholderTextColor="#000000"  style={styles.input} value={warmUp} onChangeText={setWarmup}/>
                    <TextInput placeholder='Note' placeholderTextColor="#000000" style={styles.input} value={note} onChangeText={setNote}/>
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
                                    not : note
                                }
                                setTasks([...tasks, newTask])
                                }                                
                                }></Button>
                        </View>
                    </View>
                </>
            )
        }
    }

    return(
        <View style={styles.mainView}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    To-Do List
                </Text>
            </View>
            <View>
                {tasks.length > 0 ? (tasks.map(i => {
                    if(i.type === "Gym"){
                        return(
                            <Text key={i.time}>{i.whatToTrain}</Text>
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
    }
})