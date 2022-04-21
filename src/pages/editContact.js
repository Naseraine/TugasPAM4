import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { useNavigation } from '@react-navigation/native'

import * as Contacts from 'expo-contacts'

import styles from '../components/Form/style'

export default function ListContact() {
  const navigation = useNavigation() 
  const [idContact, setIdContact] = useState(null)
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    handleGetContato()
  },[]);

  async function handleGetContato(){
    const contato = JSON.parse(await AsyncStorage.getItem('contato'))
    setIdContact(contato.id)
    setName(contato.name)
    setNumber(contato.phoneNumbers[0].digits)
  }

  async function handleAlterContact(){
    const contact = {
        id: idContact,
        [Contacts.Fields.FirstName]: name,
        phoneNumbers: [{number: number}],
      };

      
      const newData = await Contacts.updateContactAsync(contact);

      Alert.alert('Berhasil Diubah')
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.textInformativo}>Edit Kontak</Text>
      <View style={styles.form}>
        <Text>Nama: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setName(value)}
        >
          {name}
        </TextInput>
        <Text>Nomor: </Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setNumber(value)}
        >
          {number}
        </TextInput>
      </View>
      <View style={styles.divButton}>
        <TouchableOpacity style={styles.btnConfirm}
            onPress={handleAlterContact}
        >
          <Text style={styles.btnTextConfirm}>Menyimpan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={()=> navigation.reset({routes: [{ name: "ListContact" }]})}
        >
          <Text style={styles.btnTextVoltar}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}