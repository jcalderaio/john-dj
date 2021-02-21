import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import Constants from 'expo-constants';
import {
  Container,
  Header,
  Title,
  Body,
  Segment,
  Button,
  Content,
  List,
  ListItem,
} from 'native-base';

export default function App() {
  const [contact, setContact] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [showPersonal, setPersonal] = useState(true);

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
    <Container>
      <Header hasSegment>
        <Body>
          <Title>Contacts</Title>
        </Body>
      </Header>
      <Segment>
        <Button
          first
          active={showPersonal}
          style={{ padding: 10 }}
          onPress={() => setPersonal(true)}
        >
          <Text>Personal</Text>
        </Button>
        <Button
          last
          active={!showPersonal}
          style={{ padding: 10 }}
          onPress={() => setPersonal(false)}
        >
          <Text>Business</Text>
        </Button>
      </Segment>
      {isLoading ? (
        <Content
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </Content>
      ) : null}
      {showPersonal && (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={contact}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              item.contactType === 'person' && (
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
                    }}
                  >
                    Contact Type: {item.contactType}
                  </Text>
                </View>
              )
            }
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
      )}
      {!showPersonal && (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <FlatList
            data={contact}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              item.contactType === 'company' && (
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
                    }}
                  >
                    Contact Type: {item.contactType}
                  </Text>
                </View>
              )
            }
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
      )}
    </Container>
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
