import React, { useState } from 'react'
import { TextInput, View ,Text} from 'react-native'
const Cell = (props) => {

const [hover,setHover]=useState(false);
  return (
   <View style={{
    height:30,
   width:"15%",
    borderWidth:1,
    borderColor:'lightgray',
    alignItems:'center',
    justifyContent:'center',
    borderColor:hover?"blue":"grey",
    backgroundColor:hover?"lightblue":"white"
    
    }}>
<TextInput
 onChangeText={props.onChange}
 value={props.value}
onFocus={()=>setHover(true)}
onBlur={()=>setHover(false)}
style={
{
textAlign:"center",
width:"100%"
}

}

/>





   </View>
  )
}

export default Cell;
