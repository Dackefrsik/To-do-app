import { TextInput, TouchableOpacity, Text } from "react-native";
import styles from "@/style/style";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";

interface AddressProps {
    address : string;
    setAddress : (adress : string) => void;
}

interface AddressSearch {
    label : string;
    lat : number;
    lon : number;
    city : string;
    street : string;
    postcode : number;
}


export default function Adress({address, setAddress} : AddressProps){

    const [sugestions, setSugestions] = useState<AddressSearch[]>([]);

    async function addressInputChange(address : string){

        const apiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;
        const URL = " https://api.geoapify.com/v1/geocode/autocomplete?text=Sveavägen%201&apiKey=";

        const response = await fetch(
            `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(address)}&limit=5&apiKey=${apiKey}`
        )

        const data = await response.json();

        if(data && Array.isArray(data.features)){
            const formatted = data.features.map( (f : any) => ({
                label: f.properties.formatted,
                lat: f.properties.lat,
                lon: f.properties.lon,
                city: f.properties.city,
                street: f.properties.street,
                postcode: f.properties.postcode,
            })); 

            setSugestions(formatted);
        }
        


    }

    return(
        <>
            <TextInput style={styles.input} placeholder="Adress" value={address} onChangeText={(text) =>{ addressInputChange(text); setAddress(text)}}></TextInput>
            {(sugestions.length > 0 && address.trim() !== "")&& (
                <FlatList style={styles.addressExampelBackgroudn}
                    data={sugestions}
                    keyExtractor={(item) => item.label}
                    renderItem={({item} ) => {
                        return (<TouchableOpacity  onPress={() => {
                            setAddress(item.label);
                            setSugestions([]);
                        }}>
                            <Text style={styles.adressExampel}>{item.label}</Text>
                        </TouchableOpacity>
                    )}}
                    />
            )}    
        </>
    )
}