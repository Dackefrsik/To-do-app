import {View, Text, TouchableOpacity} from 'react-native';
import styles from "@/style/style";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { TaskItems } from '../(tabs)';

import AddressLink from './AddressLink';

interface taskProps {
    item : TaskItems
    drag : () => void;
    removeTask : (task: TaskItems) => void;
    setTasks : (tasks : any[]) => void,
    tasks : any[],
}

export default function Tasks({item, drag, removeTask, setTasks, tasks} : taskProps){

    //#region funktion för att rendera tasks för Gym
    function gym(){
        return(
             item.type === "Gym" && 
                (
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
            
        )
    }
    //#endregion

    //#region Funktion för att generera tasks för shoppinglistor 
    function shoppingList(){
        return(
            item.type === "ShoppingList" && 
                (
                    <View style={styles.taskContainer}>
                        <View style={styles.left}>
                            <Text style={styles.taskContainerTitle}>{item.type + " " + item.whatToGet}</Text>
                                {item.shoppingList.split("\n").map((t : string, i : number) => (
                                    <View  key={i} style={styles.shoppingListRow}> 

                                        <TouchableOpacity
                                            onPress={() => {
                                                //Säkerställer den task som ska uppdateras

                                                //Kollar om checkedItems finns på nuvarande uppgift
                                                if (item.checkedItems) {
                                                    const newTasks = [...tasks]; // kopia av arrayen

                                                    // Hitta den aktuella uppgiftens index i tasks
                                                    const taskIndex = newTasks.findIndex(t => t.index === item.index);
                                                    const updatedChecked = [...(newTasks[taskIndex].checkedItems || [])];

                                                    // Toggla just det elementet
                                                    updatedChecked[i] = !updatedChecked[i];

                                                    // Spara tillbaka till rätt task
                                                    newTasks[taskIndex] = {
                                                        ...newTasks[taskIndex],
                                                        checkedItems: updatedChecked,
                                                    };
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
        )
    }
    //#endregion

    //#region funktion för att generera tasks för läkarbesök
    function doctor(){
        return(
            item.type === "Doctor" && (
                
                    <View style={styles.taskContainer}>
                        <View style={styles.left}>
                            <Text style={styles.taskContainerTitle}>Läkarbesök</Text>
                            <Text style={styles.taskContainerText}>{item.typeOfDoctor}</Text>
                            <Text style={styles.taskContainerText} >Tid: {item.time.slice(0,5)}</Text>


                            <AddressLink address={item.address}/>
                            
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
        )
    }
    //#endregion

    return(
        <View >    
           {gym()}
            {shoppingList()}
            {doctor()}
        </View>
    )

}