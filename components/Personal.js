/**
 * Filename: /Users/Johnny/Desktop/john-dj/components/Personal.js
 * Path: /Users/Johnny/Desktop/john-dj
 * Created Date: Sunday, February 21st 2021, 10:27:16 am
 * Author: John Calderaio
 *
 * Copyright (c) 2021 Your Company
 */

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
