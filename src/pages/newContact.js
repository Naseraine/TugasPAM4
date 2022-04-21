import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native'

import styles from '../components/Form/style'

import * as Contacts from 'expo-contacts'

export default function NewContact() {
  const navigation = useNavigation() 
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);


  async function handleNewContact(){
    const contact = {
        [Contacts.Fields.FirstName]: name,
        phoneNumbers: [{number: number}],
      };

      
      const newData = await Contacts.addContactAsync(contact);

      Alert.alert('Berhasil Ditambahkan')
      setName(null)
      setNumber(null)
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.textInformativo}>Tambahkan Kontak Baru</Text>
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
            onPress={handleNewContact}
        >
          <Text style={styles.btnTextConfirm}>Tambah</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnVoltar}
          onPress={()=>navigation.reset({routes: [{ name: "ListContact" }]})}
        >
          <Text style={styles.btnTextVoltar}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}