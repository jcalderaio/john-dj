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
      <Header hasSegment style={{
        backgroundColor: '#0033cc',
        margin: 5
      }}>
        <Body style={{
          alignItems: 'center',
          backgroundColor: '#0033cc',
        }}>
          <Title>C O N T A C T S</Title>
        </Body>
      </Header>
      <Segment>
        <Button
          first
          active={showPersonal}
          style={{ 
            flex: 1.5, 
            paddingTop: 25, 
            paddingBottom: 25, 
            paddingLeft: 10,
            justifyContent: 'center',
            marginLeft: 2,
            marginBottom: 2,
            borderColor: 'white',
            backgroundColor: showPersonal ? "#00ffff" : '#0033cc'        
          }}
          onPress={() => setPersonal(true)}
        >
          <Text style={{color: showPersonal ? 'black' : 'white'}}>Personal</Text>
        </Button>
        <Button
          last
          active={!showPersonal}
          style={{ 
            flex: 1.5, 
            paddingTop: 25, 
            paddingBottom: 25, 
            paddingLeft: 10,
            justifyContent: 'center',
            marginLeft: 2,
            marginBottom: 2,
            backgroundColor: !showPersonal ? "#00ffff" : '#0033cc'
          }}
          onPress={() => setPersonal(false)}
        >
          <Text style={{color: !showPersonal ? 'black' : 'white'}}>Business</Text>
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
      <FlatList
        data={contact}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) =>
          showPersonal
            ? item.contactType == 'person' && (
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
            : item.contactType == 'company' && (
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
      />
    </Container>
  );
}