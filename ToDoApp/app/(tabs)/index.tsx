import React, { useState} from 'react';
import {View, Text, StyleSheet, Button, Modal, TouchableOpacity} from 'react-native';
import styles from '@/style/style';

import DropDownPicker from 'react-native-dropdown-picker';
import Entypo from '@expo/vector-icons/Entypo';

import GymInput from "../innerComponent/GymInput"
import HandlaInput from '../innerComponent/HandlaInput';

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
                    <GymInput selectedTime={selectedTime} setModalVisible={setModalVisible} setSelectedTask={setSelectedTask} setTasks={setTasks} tasks={tasks} setWhatToTrain={setWhatToTrain} setNote={setNote} setWarmup={setWarmup} whatToTrain={whatToTrain}   // <-- Lägg till denna rad
    warmUp={warmUp}             
    note={note} />
            )
        }
        else if(selectedTask === "Handla"){
            return(
                <HandlaInput whatToGet={whatToGet} setWhatToGet={setWhatToGet} shoppingList={shoppingList} setShoppingList={setShoppingList} setModalVisible={setModalVisible} setSelectedTask={setSelectedTask} setTasks={setTasks} tasks={tasks}/>                
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