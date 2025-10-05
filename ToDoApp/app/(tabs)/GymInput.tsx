
import { TextInput, View, Button, StyleSheet} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

type GymInputProps = {
    selectedTime: Date;
    setModalVisible: (visible: boolean) => void;
    setSelectedTask: any;
    setTasks: (tasks: any[]) => void;
    tasks: any[];
    setWhatToTrain: (val: string) => void;
    setNote: (val: string) => void;
    setWarmup: (val: string) => void;
    whatToTrain: string;
    warmUp: string;
    note: string;
};


export default function GymInput({selectedTime , setModalVisible, setSelectedTask, setTasks, tasks, setWhatToTrain, setNote, setWarmup, whatToTrain, warmUp, note} : GymInputProps){

    type Gym = {
        type: "Gym";
        whatToTrain: string;
        time: string;
        warmUp: string;
        note: string;
    };

    const router = useRouter();

    return(
        <>
            <TextInput placeholder='What to train' placeholderTextColor="#000000" style={styles.input} value={whatToTrain} onChangeText={setWhatToTrain}/>
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
            </View>
        </>
    )}

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