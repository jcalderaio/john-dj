import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import Constants from 'expo-constants';

export default function App() {
  const [contact, setContact] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          setContact(data);
          setLoading(false);
          console.log(contact);
        }
      }
    })();
  }, [contact]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: 'black' }} />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {isLoading ? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : null}
        <FlatList
          data={contact}
          renderItem={({ item }) => (
            <View style={{ paddingBottom: 10 }}>
              <Text
                style={{
                  color: 'black',
                  alignItems: 'center',
                  fontSize: 18,
                  paddingLeft: 10,
                }}
              >
                Name: {item.name}
              </Text>
              <Text
                style={{
                  color: 'black',
                  alignItems: 'center',
                  fontSize: 18,
                  paddingLeft: 10,
                  paddingBottom: 10,
                  borderBottom: '1px solid',
                }}
              >
                Contact Type: {item.contactType}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
              }}
            >
              <Text style={{ color: 'black' }}>No Contacts</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
