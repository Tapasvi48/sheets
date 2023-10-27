import React, { useState } from 'react'
import Cell from './Cell'
import { View ,Text} from 'react-native'
import { TouchableOpacity } from 'react-native';
import * as Print from 'expo-print';
import { Button } from 'react-native';
import { shareAsync } from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
const SpreadSheet = () => {
const arr=[1,2,3,4,5,6,7,8,9,10];

const rows = 10;
const columns = 5;
const initialCellValues = Array.from({ length: rows }, () => Array(columns).fill(''));
const [cellValues, setCellValues] = useState(initialCellValues);

useEffect(() => {
    loadCellValues();


  }, []);

  const saveCellValues = async () => {
    try {
        await AsyncStorage.clear();
      await AsyncStorage.setItem('cell_values', JSON.stringify(cellValues));

    

    } catch (error) {
      console.error('Error saving cell values:', error);
    }
  };

  const loadCellValues = async () => {
    try {
      const storedValues = await AsyncStorage.getItem('cell_values');
  
      if (storedValues) {
        setCellValues(JSON.parse(storedValues));


    }
    } catch (error) {
      console.error('Error loading cell values:', error);
    }
  };



  const handleCellValueChange=(row, col, value) => {
    const updatedCellValues = [...cellValues];
    updatedCellValues[row][col] = value;
    setCellValues(updatedCellValues);
    saveCellValues();
  };


const [selectedPrinter, setSelectedPrinter] = useState();
const html = `
<html>
  <head>
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        border: 1px solid black;
        text-align: center;
        padding: 5px;
        height: 40px; 
      }
    </style>
  </head>
  <body>
    <h1>Spreadsheet</h1>
    <table>
      <tr>
        <th> </th> <!-- Empty cell for the corner -->
        ${Array.from({ length: columns }, (_, colIndex) => `<th>Column ${colIndex + 1}</th>`).join('')}
      </tr>
      ${cellValues
        .slice(0, rows) 
        .map((row, rowIndex) => 
          `<tr>
            <th>Row ${rowIndex + 1}</th>
            ${row
              .slice(0, columns) 
              .map(value => `<td>${value}</td>`)
              .join('')}
          </tr>`
        )
        .join('')}
    </table>
  </body>
</html>
`;

  const printToFile = async () => {
    
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync();
    setSelectedPrinter(printer);
  };










  return (
<View style={{flex:1,padding:10,paddingTop:20}}>
<View style={{alignItems:"center",paddingVertical:30}}>
<Text style={{fontSize:25}}>
Google Sheets
</Text>


</View>



<View style={{flexDirection:"row",alignItems:"center",backgroundColor:"#f2f2f2",width:"89%"}}>
<Text style={ {width:"16%",textAlign: "center",padding: 5,borderBottomWidth: 1,borderBottomColor: 'lightgray',backgroundColor:"white"}}>
</Text>
<Text style={ {width:"17%",textAlign: "center",padding: 5,borderBottomWidth: 1,borderBottomColor: 'lightgray',}}>
A</Text>
<Text style={ {width:"17%", textAlign: "center",padding: 5,borderBottomWidth: 1,borderBottomColor: 'lightgray',}}>
B</Text>
<Text style={ {width:"17%", textAlign: "center",padding: 5,borderBottomWidth: 1,borderBottomColor: 'lightgray',}}>
C</Text>
<Text style={ {width:"17%", textAlign: "center",padding: 5,borderBottomWidth: 1,borderBottomColor: 'lightgray',}}>
D</Text>
<Text style={ {width:"17%", textAlign: "center",padding: 5,borderBottomWidth: 1,borderBottomColor: 'lightgray',}}>
E</Text>
</View>
{Array.from({ length: rows }, (_, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold', width: '14%', textAlign: 'center', padding: 5, borderBottomWidth: 1, borderBottomColor: 'lightgray' }}>
            {rowIndex + 1}
          </Text>
          {Array.from({ length: columns }, (_, colIndex) => (
            <Cell
              key={colIndex}
              value={cellValues[rowIndex][colIndex]}
              onChange={(newValue) => handleCellValueChange(rowIndex, colIndex, newValue)}
            />
          ))}
        </View>
      ))}


<TouchableOpacity  style={{alignSelf:"center",paddingTop:40}}>

<Button  title="Print to PDF file" onPress={printToFile} />
      {Platform.OS === 'ios' && (
        <>
          <View style={{padding:5}}/>
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={{padding:5}} />
          {selectedPrinter ? (
            <Text >{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
</TouchableOpacity>






</View>
  )
}

export default SpreadSheet
