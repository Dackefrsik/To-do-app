import { useState } from "react"
import DropDownPicker from "react-native-dropdown-picker"
import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "@/style/style"
import { TextInput, View, Button} from "react-native"

import { Doctor } from "../(tabs)"

interface DoctorProps {
    setModalVisible : (visible: boolean) => void,
    setSelectedTask : any,
    setTasks : (tasks : any[]) => void,
    tasks : any[],
}

export default function DocotorInput({setModalVisible, setSelectedTask, setTasks, tasks} : DoctorProps){

    const[open, setOpen] = useState(false)
    const[doctor, setSelectDoctor] = useState("")
    const[items, setItems] = useState([
        
        {label: "Doctor", value: "Doctor"}, 
        {label: "Tandläkare", value: "Dentist"}, 

    ])
    
    const[address, setAddress] = useState("");
    const[note, setNote] = useState("");
    const[selectedTime, selectTime] = useState(new Date());

    return (
        <View style={styles.doctorDropDownPicker}>
            <DropDownPicker
                open={open}
                value={doctor}
                items={items}
                setOpen={setOpen}
                setValue={setSelectDoctor}
                setItems={setItems}
                placeholder="Välj typ av läkare"/>
            <DateTimePicker style={styles.time} testID='dateTimePicker' 
                value={selectedTime} mode='time' 
                is24Hour={true} 
                display='default'/>
            <TextInput style={styles.input} placeholder="Adress" value={address} onChangeText={setAddress}></TextInput>
            <TextInput style={styles.input} placeholder="Note" value={note} onChangeText={setNote}></TextInput>
            <View style={[styles.addTask , {marginTop: 50}]}>
                <View style={[styles.button, {height : 40}]}>
                <Button color={"#ffffff"} title='Add task' onPress={() => { 
                                    setModalVisible(false); 
                                    setSelectedTask(null);
                                    const newTask : Doctor = {
                                        type : "Doctor",
                                        typeOfDoctor :  doctor,
                                        time : selectedTime.toLocaleTimeString(),
                                        address : address,
                                        note : note,
                                        index : tasks.length 
                                    };
                                    setTasks([...tasks, newTask]);
                                    setNote("");
                                }                                
                            }>
                                    
                    </Button>
                </View>
            </View>
        </View>
    )
}