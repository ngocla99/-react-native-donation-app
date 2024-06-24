import React from 'react';
import {FlatList, Image, Pressable, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import globalStyle from '../../assets/styles/globalStyle';
import {Header, Search, SingleDonationItem, Tab} from '../../components';
import {Routes} from '../../navigation/Routes';
import {updateSeletedCategoryId} from '../../redux/reducers/Categories';
import {updateSeletedDonationId} from '../../redux/reducers/Donations';
import style from './style';
import {resetUser} from '../../redux/reducers/User';
import {logOut} from '../../api/user';

const Home = ({navigation}) => {
  const user = useSelector(state => state.user);
  const categories = useSelector(state => state.categories);
  const donations = useSelector(state => state.donations);
  const dispatch = useDispatch();

  const [categoryPage, setCategoryPage] = React.useState(1);
  const [categoryList, setCategoryList] = React.useState([]);
  const [donationList, setDonationList] = React.useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = React.useState(false);
  const categoryPageSize = 4;

  React.useEffect(() => {
    setIsLoadingCategories(true);
    setCategoryList(
      pagination(categories.items, categoryPage, categoryPageSize),
    );
    setCategoryPage(prev => prev + 1);
    setIsLoadingCategories(false);
  }, []);

  React.useEffect(() => {
    const items = donations.items;
    const filteredItems = items.filter(value =>
      value.categoryIds.includes(categories.seletedCategoryId),
    );
    setDonationList(filteredItems);
  }, [categories.seletedCategoryId]);

  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= items.length) {
      return [];
    }

    return items.slice(startIndex, endIndex);
  };

  return (
    <View style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView>
        <View style={style.header}>
          <View>
            <Text style={style.headerInfoText}>Hello, </Text>
            <View style={style.username}>
              <Header title={user.displayName + ' 👋'} />
            </View>
          </View>
          <View>
            <Image
              source={{uri: user.profileImage}}
              style={style.profileImage}
              resizeMode={'contain'}
            />
            <Pressable
              onPress={async () => {
                dispatch(resetUser());
                await logOut();
              }}>
              <Header type={3} title={'Logout'} color={'#156CF7'} />
            </Pressable>
          </View>
        </View>
        <View style={style.searchBox}>
          <Search placeholder={'Search'} />
        </View>
        <Pressable style={style.highlightedImageContainer}>
          <Image
            style={style.highlightedImage}
            source={require('../../assets/images/highlighted_image.png')}
            resizeMode="contain"
          />
        </Pressable>

        <View style={style.categoryHeader}>
          <Header title={'Select Category'} type={2} />
        </View>
        <View style={style.categories}>
          <FlatList
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (isLoadingCategories) {
                return;
              }
              setIsLoadingCategories(true);
              let newData = pagination(
                categories.items,
                categoryPage,
                categoryPageSize,
              );

              if (newData.length > 0) {
                setCategoryList(prevState => [...prevState, ...newData]);
                setCategoryPage(prevState => prevState + 1);
              }
              setIsLoadingCategories(false);
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={categoryList}
            renderItem={({item}) => (
              <View key={item.categoryId} style={style.categoryItem}>
                <Tab
                  tabId={item.categoryId}
                  title={item.name}
                  isInactive={item.categoryId !== categories.seletedCategoryId}
                  onPress={value => dispatch(updateSeletedCategoryId(value))}
                />
              </View>
            )}
          />
        </View>

        {donationList.length > 0 && (
          <View style={style.donationItemsContainer}>
            {donationList.map(item => {
              const categoryInformation = categories.items.find(
                value => value.categoryId === categories.seletedCategoryId,
              );
              return (
                <View
                  key={item.donationItemId}
                  style={style.singleDonationItem}>
                  <SingleDonationItem
                    donationItemId={item.donationItemId}
                    donationTitle={item.name}
                    uri={item.image}
                    price={parseFloat(item.price)}
                    badgeTitle={categoryInformation.name}
                    onPress={value => {
                      dispatch(updateSeletedDonationId(value));
                      navigation.navigate(Routes.SingleDonationItem, {
                        categoryInformation,
                      });
                    }}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
