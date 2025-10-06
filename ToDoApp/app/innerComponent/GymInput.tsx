import { TextInput, View, Button} from "react-native";
import styles from '@/style/style';

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