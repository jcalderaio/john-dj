/**
 * Filename: /Users/Johnny/Desktop/john-dj/components/ContactComponent.js
 * Path: /Users/Johnny/Desktop/john-dj
 * Created Date: Sunday, February 21st 2021, 11:06:32 am
 * Author: John Calderaio
 *
 * Copyright (c) 2021 Your Company
 */

/**
 * Filename: /Users/Johnny/Desktop/john-dj/components/ContactComponent.js
 * Path: /Users/Johnny/Desktop/john-dj
 * Created Date: Sunday, February 21st 2021, 10:53:33 am
 * Author: John Calderaio
 *
 * Copyright (c) 2021 Your Company
 */

import React, { useState, useEffect } from 'react';
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
  Text,
} from 'native-base';

export default function ContactComponent({ contact, showPersonal }) {
  if (showPersonal) {
    return (
      <List>
        {contact.map(
          (contact) =>
            contact.contactType == 'person' && (
              <ListItem key={contact.id}>
                <Text>{contact.name}</Text>
              </ListItem>
            )
        )}
      </List>
    );
  }
}
