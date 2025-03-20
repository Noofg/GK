import { useNavigation } from "@react-navigation/native"
import {StackNavigationProp} from "@react-navigation/stack"
import { View, Text, Button } from "react-native";
import React from "react";


type AccountAccountScreenNavigationProp = StackNavigationProp<
  { Home: undefined; Register: undefined },
  "Home"
>;
const Account =() =>{
    const navigation = useNavigation<AccountAccountScreenNavigationProp>();

    return (
        <View>
             <Text>AccountAccount Screen</Text>
             <Button title="Go to Register" onPress={() => navigation.navigate("Register")} />
           </View>
   );

};
export default Account;
