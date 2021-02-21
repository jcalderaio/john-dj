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
    let isMounted = true;
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
      return () => {
        isMounted = false;
      };
    })();
  }, [contact]);

  renderItem = ({ item }) => {
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
      }}
    >
      <Text style={{ color: 'black' }}>Hello@@@@@</Text>
    </View>;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {isLoading && (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        )}
        <FlatList
          data={contact}
          keyExtractor={(item) => item.id}
          renderItem={(item) => item.id}
          extraData={contact}
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
    </SafeAreaView>
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
