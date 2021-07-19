import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StyleSheet, Text, View, FlatList
} from 'react-native';
import fonts from './fonts';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import CardView from 'react-native-cardview'
var colorTheme = '#337AB7'
var colorValue = '#A9A9A9'
const App = () => {


  const [responseList, setResponseList] = useState([])

  useEffect(() => {
    var url = "https://reqres.in/api/users"
    axios(url)
      .then((res) => {
        if (res.data.data != null) {
          res.data.data = res.data.data.map(item => {
            item.isSelect = false;
            return item;
          });
          setResponseList(res.data.data)
        }
      })
      .catch((err) => {
        console.log("err", err)
      })
  },
    []);

  function setData(index) {

    var isSelected = responseList[index].isSelect

    responseList[index].isSelect = !isSelected

    let doc = []

    responseList.map(item => {
      doc.push(item)
    })

    setResponseList(doc)

  }

  return (
    <SafeAreaView style={{ flex: 1 }} >
      <View style={styles.container}>

        <View style={styles.headerView}>

          <Text style={{ color: "white", fontSize: fonts.fontMedium }}>Users List</Text>

        </View>

        <FlatList style={{
          backgroundColor: '#F0F5F9',
          width: "100%",

        }}
          data={responseList}
          renderItem={
            ({ item, index }) => (

              <CardView
                cardElevation={3}
                cardMaxElevation={3}
                cornerRadius={3}

                style={{
                  alignSelf: "center", padding: 10, width: "95%", alignSelf: "center",
                  margin: 5,
                  backgroundColor: '#ffffff',
                }}
              >

                <View style={{
                  width: "100%", flexDirection: 'row', margin:5
                }}>

                  <View style={styles.checkboxContainerList}>

                    <CheckBox
                      boxType='square'
                      value={item.isSelect}
                      onValueChange={() => {
                        setData(index)
                      }}

                      tintColor={'grey'}
                      onCheckColor={colorTheme}
                      onFillColor='white'
                      onTintColor={colorTheme}
                      tintColors={{ true: colorTheme }}
                      style={{
                        width: 20,
                        height: 20, marginRight: 10, alignSelf: "center", marginLeft: 5, color: "white"
                      }}
                    />

                  </View>


                  <View>
                    <View style={styles.rowContainer}>


                      <Text
                        style={styles.titleView}>Name:</Text>
                      <Text style={styles.valueView}>{item.first_name + item.last_name}</Text>

                    </View>


                    <View style={styles.rowContainer}>
                      <Text
                        style={styles.titleView}>Email:</Text>
                      <Text style={styles.valueView}>{item.email}</Text>

                    </View>

                  </View>
                </View>
              </CardView>
            )}

          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  rowContainer: {
    width: "90%", flexDirection: 'row',
  }, 
  headerView: {
    backgroundColor: colorTheme, padding: 10, marginTop: "8%"
  },
  titleView: {
    textAlign: "left", marginLeft: 10, marginRight: 5, fontWeight: "bold", fontSize: fonts.fontSmall, color: colorTheme, marginBottom: 5, 
  },
  valueView: {
    marginLeft: 10, marginRight: 10, fontSize: fonts.fontSmall, paddingRight: 10, color: colorValue, alignSelf: "flex-start"
  },
  checkbox: {
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    color: "blue", borderColor: 'green'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginLeft: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    color: "white"
  },

  checkboxContainerList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    color: "white"
  },
});

export default App;
