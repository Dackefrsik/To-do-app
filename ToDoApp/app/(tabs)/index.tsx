import React, {JSX, useState, useRef} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import DraggableFlatList, {RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import styles from '@/style/style';

import DropDownPicker from 'react-native-dropdown-picker';
import Entypo from '@expo/vector-icons/Entypo';

import GymInput from "../innerComponent/GymInput"
import HandlaInput from '../innerComponent/HandlaInput';
import DoctorInput from "../innerComponent/DoctorInput";
import Tasks from "../innerComponent/Tasks";

//AsyncStorage för att spara data om tasks
import AsyncStorage from '@react-native-async-storage/async-storage';

//#region interfaces och types
export interface Gym{
    type : "Gym",
    whatToTrain : string,
    time : string,
    warmUp : string,
    note : string;
    index : number
}

export interface shoppingList{
    type : "ShoppingList",
    whatToGet : string,
    shoppingList : string;
    checkedItems : boolean[],
    index : number
}

export interface Doctor{
    type : "Doctor",
    typeOfDoctor : string,
    time : string,
    address : string,
    note : string,
    index : number
}

interface taskInputMap{
    Gym : JSX.Element,
    Handla : JSX.Element,
    Doctor : JSX.Element,
}

export type TaskItems = Gym | shoppingList | Doctor;
//#endregion

export default function CurrentList(){
    
    //#region useStates
    const[modalVisible, setModalVisible] = useState(false);
    const[open, setOpen] = useState(false)
    const[selectedTask, setSelectedTask] = useState(null);
    const[items, setItems] = useState([
        {label : "Gym", value : "Gym"},
        {label : "Handla", value : "Handla"},
        {label : "Läkare", value : "Doctor" }

    ]);
    const[selectedTime, selectTime] = useState(new Date());
    const[tasks, setTasks] = useState<(TaskItems)[]>([]);

    const[note, setNote] = useState("");
    //#endregion

    //Använd useRef för att ignorera första gången effekten körs
    //Hoppar över första tillståndet innan den läser det sparade i AsyncStorage
    const isFirstRun = useRef(true);

    //#region Rendering av inputs 
    const taskComponents: taskInputMap = {
       Gym : <GymInput selectedTime={selectedTime} setModalVisible={setModalVisible} setSelectedTask={setSelectedTask} setTasks={setTasks} tasks={tasks} setNote={setNote}             
        note={note} />,
        Handla  : <HandlaInput setModalVisible={setModalVisible} setSelectedTask={setSelectedTask} setTasks={setTasks} tasks={tasks}/>,
        Doctor : <DoctorInput setModalVisible={setModalVisible} setSelectedTask={setSelectedTask} setTasks={setTasks} tasks={tasks}/>
    }
    
    const renderInput = () => {

        if(selectedTask){
            //taskComponent är ett object basserat på taskInputMap
            return Object.entries(taskComponents).map(([taskType, Component]) => {
                // [taskType] är strängen "Gym" eller "shoppingList"
                // [Component] är själva JSX.Element (<GymInput.../>)
                if(taskType === selectedTask)
                return (
                    // Du måste ge det yttre elementet en unik key
                    <View key={taskType}> 
                        {Component}
                    </View>
                );
            });
        }
        

    // Returnera null eller något annat om ingen matchning hittades
    return null;
    }
    //#endregion

    //#region remove inputs
    function removeTask(taskToRemove : Gym | shoppingList | Doctor){

        setTasks(prevTasks => prevTasks.filter(task => task.index !== taskToRemove.index));
    }
    //#endregion

    //#region funktioner för AsyncsStorage
    const TASKS_KEY = '@tasks_key';
    
    //Spara tasks
    React.useEffect(() => {

        //Undviker att vi de ursprungliga tillståndet skriver över dem
        if (isFirstRun.current) {
            isFirstRun.current = false; // Ställ in till false för framtida körningar
            return; // Hoppa över sparandet
        }   


        const saveTasks = async () => {
            try{
                const jsonValue = JSON.stringify(tasks); //Sätter tasks som json-värde
                await AsyncStorage.setItem(TASKS_KEY, jsonValue); //Sparar de tidigare som sparats i AsyncsStorage

                console.log("Tasks sparade!");
            }
            catch(error) {
                console.log("Fel uppstod vid försök att spara tasks: ", error);
            }
        }

        saveTasks();
    },[tasks]); //Körs varje gång tasks uppdateras

    //Läsa in sparade tasks
    React.useEffect(() => {
        const loadTasks = async () => {
            try{
                const jsonValue = await AsyncStorage.getItem(TASKS_KEY); //Hämtar innehållet med hjälp av TASK_KEY
                console.log("Hämtat (Rådata):", jsonValue); // Lägg till denna logg!

                //Kontrollerar så at inte det hämtade värdet är null
                if(jsonValue != null){

                    //Parsar de hämtade värdena och sparar dem i tasks 
                    const loadedTasks : (TaskItems)[] = JSON.parse(jsonValue);
                    setTasks(loadedTasks);

                    console.log("Lyckades hämta tasks");
                }
            }
            catch(error){
                console.log("Fel vid laddning av tasks: ", error);
            }
        }
        
        loadTasks();
    }, []); //Körs en gång när appen startas
    //#endregion

    return(
        <View style={styles.mainView}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    To-Do List
                </Text>
            </View>
            <View style={styles.dragView}>
                <DraggableFlatList<TaskItems>
                    data={tasks} //Datan som ska skrivas ut
                    keyExtractor={(item, index) => index.toString()} //Levererar en unik nyckel till varje rad

                    //Effekten för drag, sätter om tasks utifrån ordningen efter drag
                    onDragEnd={({data}) => { 
                      setTasks(data)
                    }}
                    renderItem={({item , drag} : RenderItemParams<TaskItems>) => (
                        <ScaleDecorator>
                                <Tasks item={item} drag={drag} removeTask={removeTask} setTasks={setTasks} tasks={tasks}/>
                        </ScaleDecorator>
                    )}
                />
                
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
        </View>
    )
}