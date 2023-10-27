import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Cell from './Components/Cell';
import SpreadSheet from './Components/SpreadSheet';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
<SpreadSheet/>
    </SafeAreaView>
  );
}

