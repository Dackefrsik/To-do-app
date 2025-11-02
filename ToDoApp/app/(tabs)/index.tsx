import React, {JSX, useState} from 'react';
import {View, Text, Modal, TouchableOpacity, ScrollView} from 'react-native';
import DraggableFlatList, {RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import styles from '@/style/style';

import DropDownPicker from 'react-native-dropdown-picker';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';

import GymInput from "../innerComponent/GymInput"
import HandlaInput from '../innerComponent/HandlaInput';
import DoctorInput from "../innerComponent/DoctorInput";

interface Gym{
    type : "Gym",
    whatToTrain : string,
    time : string,
    warmUp : string,
    note : string;
    checkedItems : boolean[], //Läggs till för att TypeScript ska förstå att alla uppgifter har den egenskapen, behövs på alla
    index : number
}

interface shoppingList{
    type : "ShoppingList",
    whatToGet : string,
    shoppingList : string;
    checkedItems : boolean[],
    index : number
}

interface Doctor{
    type : "Doctor",
    typeOfDoctor : string,
    time : string,
    adress : string,
    note : string,
    checkedItems : boolean[],
    index : number
}

interface taskInputMap{
    Gym : JSX.Element,
    Handla : JSX.Element,
    Doctor : JSX.Element,
}


export default function CurrentList(){

    const[modalVisible, setModalVisible] = useState(false);
    const[open, setOpen] = useState(false)
    const[selectedTask, setSelectedTask] = useState(null);
    const[items, setItems] = useState([
        {label : "Gym", value : "Gym"},
        {label : "Handla", value : "Handla"},
        {label : "Läkare", value : "Doctor" }

    ]);
    const[selectedTime, selectTime] = useState(new Date());
    const[tasks, setTasks] = useState<(Gym | shoppingList | Doctor)[]>([]);

    const[note, setNote] = useState("");

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

    function removeTask(taskToRemove : Gym | shoppingList | Doctor){

        setTasks(prevTasks => prevTasks.filter(task => task.index !== taskToRemove.index));
    
    }


    return(
        <View style={styles.mainView}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    To-Do List
                </Text>
            </View>
            <View style={styles.dragView}>
                <DraggableFlatList<Gym | shoppingList | Doctor>
                    data={tasks} //Datan som ska skrivas ut
                    keyExtractor={(item, index) => index.toString()} //Levererar en unik nyckel till varje rad

                    //Effekten för drag, sätter om tasks utifrån ordningen efter drag
                    onDragEnd={({data}) => { 
                      setTasks(data)
                    }}
                    renderItem={({item , drag} : RenderItemParams<Gym | shoppingList | Doctor>) => (
                        <ScaleDecorator>
                            <View >
                                {item.type === "Gym" && (
                                        <View style={styles.taskContainer} >
                                            <View style={styles.left} >
                                                <Text style={styles.taskContainerTitle}>{item.type}</Text>
                                                <Text style={styles.taskContainerText} >Muscle Group: {item.whatToTrain}</Text>
                                                <Text style={styles.taskContainerText} >Tid: {item.time.slice(0,5)}</Text>
                                                {item.warmUp && (<Text style={styles.taskContainerText} >Warmup: {item.warmUp}</Text>)}
                                                {item.note && (<Text style={styles.taskContainerText} >{item.note}</Text>)}
                                            </View>
                                            <View style={styles.right} >
                                                <View style={styles.innerRight}>
                                                    <TouchableOpacity onPress={() => removeTask(item)}>
                                                        <Entypo name="circle" size={24} color="white" />
                                                    </TouchableOpacity>
                                                    <View onTouchStart={drag}>
                                                        <MaterialIcons name="drag-handle" size={24} color="white" />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        
                                    )
                                }
                                {item.type === "ShoppingList" && (
                                        <View style={styles.taskContainer}>
                                            <View style={styles.left}>
                                                <Text style={styles.taskContainerTitle}>{item.type + " " + item.whatToGet}</Text>
                                                
                                                    {item.shoppingList.split("\n").map((t : string, i : number) => (
                                                    <View  key={i} style={styles.shoppingListRow}> 

                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                //Säkerställer den task som ska uppdateras
                                                                const newTasks = [...tasks]; //Ny array med samma element

                                                                //Kollar om checkedItems finns på nuvarande uppgift
                                                                if (item.checkedItems) {
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
                                                                newTasks[i].checkedItems![i] = !newTasks[i].checkedItems![i];
                                                                setTasks(newTasks);
                                                                }
                                                            }}
                                                        >
                                                            {/*as keyof typeof Feather.glyphMap förklarar att det är av typen namn och inte en sträng*/}
                                                            <Feather name={(item.checkedItems && item.checkedItems[i] ? "check-circle" : "circle") as keyof typeof Feather.glyphMap} size={30} color="black" style={styles.shoppingListIcon}/>
                                                        </TouchableOpacity>
                                                        <Text style={styles.taskContainerText}>{t}</Text>
                                                    </View>
                                                    ))} 
                                            </View>
                                            <View style={styles.right} onTouchStart={drag}>
                                                <View style={styles.innerRight}>
                                                    <TouchableOpacity onPress={() => removeTask(item)}>
                                                        <Entypo name="circle" size={24} color="white" />
                                                    </TouchableOpacity>
                                                    <View onTouchStart={drag}>
                                                        <MaterialIcons name="drag-handle" size={24} color="white" />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                                {item.type === "Doctor" && (
                                    
                                        <View style={styles.taskContainer}>
                                            <View style={styles.left}>
                                                <Text style={styles.taskContainerTitle}>Läkarbesök</Text>
                                                <Text style={styles.taskContainerText}>{item.typeOfDoctor}</Text>
                                                <Text style={styles.taskContainerText} >Tid: {item.time.slice(0,5)}</Text>
                                                <Text style={styles.taskContainerText}>Adress: {item.adress}</Text>
                                                <Text style={styles.taskContainerText}>{item.note}</Text>
                                            </View>
                                            <View style={styles.right} onTouchStart={drag}>
                                                <View style={styles.innerRight}>

                                                    <TouchableOpacity onPress={() => removeTask(item)}>
                                                        <Entypo name="circle" size={24} color="white" />
                                                    </TouchableOpacity>
                                                    <View onTouchStart={drag}>
                                                        <MaterialIcons name="drag-handle" size={24} color="white" />
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                }
                                </View>
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