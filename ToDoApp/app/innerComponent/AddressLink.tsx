import React from 'react';
import { Linking, Platform, TouchableOpacity, Text } from 'react-native';

import styles from '@/style/style';

interface AddressProps{
    address : string;
}

export default function AddressLink({address} : AddressProps){

    const openMaps = () => {
        console.log(address)
        const query = encodeURIComponent(address);
        let url='';

        if(Platform.OS === "ios"){
            url = `http://maps.apple.com/?q=${query}`;
        }else{
            url = `geo:0,0?q=${query}`;
        }

        Linking.canOpenURL(url).then((supported) => {
            if(supported) {
                Linking.openURL(url);
            } else {
                console.log("Kan inte öppna kartor");
            }
        })
        .catch((error) => console.log(error))
    }

    return (
        <TouchableOpacity onPress={openMaps}>
            <Text style={styles.taskContainerText}>Adress: {address}</Text>
        </TouchableOpacity>
    )
}