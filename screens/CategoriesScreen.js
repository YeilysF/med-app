import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase'
import CategoryGridTile from '../components/CategoryGridTile';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Search from '../screens/SearchScreen';

// using react redux to access data 
import { useSelector, useDispatch } from 'react-redux';

const CategoriesScreen = props => {

  //getting  data from categories in redux store
  const categories = useSelector(state => state.categories.categories);

  //method to handle what category is selected
  const selectCategoryHandler = (id, title) => {
    props.navigation.navigate({ routeName: 'SubCategories', params: { categoryId: id, categoryTitle: title } });
  };

  return (
    <FlatList
      data={categories}
      keyExtractor={item => item.id}
      numColumns={1}
      renderItem={itemData =>
        <CategoryGridTile
          title={itemData.item.title}
          color={itemData.item.color}
          //onSelect func name triggers on component
          onSelect={() => { selectCategoryHandler(itemData.item.id, itemData.item.title) }}
        />
      }
    />
  );
};

CategoriesScreen.navigationOptions = navigationdata => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Menu' iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navigationdata.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Search' iconName={Platform.OS === 'android' ? 'ios-search' : 'md-search'}
        onPress={() => {
          navigationdata.navigation.navigate('Search')}}>
        </Item>
      </HeaderButtons>
    ),
  }
}

export default CategoriesScreen;