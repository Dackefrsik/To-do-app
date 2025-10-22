import React, { useState} from 'react';
import {View, Text, Button, Modal, TouchableOpacity, ScrollView} from 'react-native';
import styles from '@/style/style';

import DropDownPicker from 'react-native-dropdown-picker';
import Entypo from '@expo/vector-icons/Entypo';
import { Feather } from '@expo/vector-icons';

import GymInput from "../innerComponent/GymInput"
import HandlaInput from '../innerComponent/HandlaInput';


export default function CurrentList(){

    interface Gym{
        type : "Gym",
        whatToTrain : string,
        time : string,
        warmUp : string,
        note : string;
        checkedItems : boolean[]; //Läggs till för att TypeScript ska förstå att alla uppgifter har den egenskapen, behövs på alla
    }

    interface shoppingList{
        type : "ShoppingList",
        whatToGet : string,
        shoppingList : string;
        checkedItems : boolean[];
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
        <ScrollView style={styles.mainView}>
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
                        let taskLine = task.shoppingList.split("\n");
                        return(
                            <View key={index} style={styles.taskContainer}>
                                <View style={styles.left}>
                                    <Text style={styles.taskContainerTitle}>{task.type + " " + task.whatToGet} </Text>
                                    
                                        {taskLine.map((t, i) => (
                                        <View  key={i} style={styles.shoppingListRow}> 

                                            <TouchableOpacity
                                                onPress={() => {
                                                    //Säkerställer den task som ska uppdateras
                                                    const newTasks = [...tasks]; //Ny array med samma element

                                                    //Kollar om checkedItems finns på nuvarande uppgift
                                                    if (task.checkedItems) {
                                                        /** 
                                                         * newTasks[index] => den uppgift som ska ändras
                                                         * 
                                                         * checkedItems![i] är non-null assertion operator => lovar att checkedItems inte är null elle rundefined
                                                         * annars kan det vara undefined 
                                                         * [i] => index för den specifika raden 
                                                         * 
                                                         * newTasks[index].checkedItems![i] = !newTasks[index].checkedItems![i]; => kan inte vara det värde som de redan är så byter
                                                         * true => felse 
                                                         * false => true
                                                         */
                                                    newTasks[index].checkedItems![i] = !newTasks[index].checkedItems![i];
                                                    setTasks(newTasks);
                                                    }
                                                }}
                                            >
                                                {/*as keyof typeof Feather.glyphMap förklarar att det är av typen namn och inte en sträng*/}
                                                <Feather name={(task.checkedItems && task.checkedItems[i] ? "check-circle" : "circle") as keyof typeof Feather.glyphMap} size={30} color="black" style={styles.shoppingListIcon}/>
                                            </TouchableOpacity>
                                            <Text style={styles.taskContainerText}>{t}</Text>
                                        </View>
                                        ))} 
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
                    <TouchableOpacity  onPress={() => {
                        setModalVisible(true);
                    }} 
                    ><Text style={styles.addTaskText}>Add task</Text></TouchableOpacity>
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
        </ScrollView>
    )
}