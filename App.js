import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { firestore, collection, addDoc, MESSAGES, serverTimestamp, onSnapshot, query } from './Firebase/Config';
import { convertFirebaseTimeStampToJS } from './helper/Functions';
import { orderBy } from 'firebase/firestore';
import Login from './components/Login';

export default function App() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [logged, setLogged] = useState(false);

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error));

    setNewMessage('');
    console.log('Message saved.')
  }

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES),orderBy('created', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];

      querySnapshot.forEach((doc) => {
        const messageObject ={
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimeStampToJS(doc.data().created)
        }
        tempMessages.push(messageObject)
      })
      setMessages(tempMessages);
    })
    return () => {
      unsubscribe()
    };
  }, []);

  if(logged){
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          messages.map((message) => (
            <View style={styles.messages} key={message.id}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>
      <View style={{display:'flex', flexDirection:'row',justifyContent:'space-around'}}>
        <Button style={{flex: 0.25}} title='Send' type="button" onPress={save} />
      </View>
    </SafeAreaView>
  );
} else {
  return (
    <Login setLogin={setLogged} />
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  messages: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  messageInfo: {
    fontSize: 12,
  }
});
