import { StyleSheet } from "react-native";
// import { Button } from "react-native-web";

export const Globalstyles= StyleSheet.create({

    container:{
        
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end',
        backgroundColor: "#161416",
        
        

    },
    button:{
        marginTop:40,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 6,
        borderColor:'white',
        borderWidth: 2,
        width:350,
        elevation: 3,
        backgroundColor: '#FFF',
        marginBottom:100,
    },
    buttonText:{
        fontSize: 18,
        lineHeight: 21,
        fontWeight: '500',
        letterSpacing: 0.25,
        color: '#080404',
    },
    errortext:{
        color:'crimson',
        fontWeight:'500',
        
    },
    error:{
        display:'flex',
        // flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        left:0,
    }
 


});