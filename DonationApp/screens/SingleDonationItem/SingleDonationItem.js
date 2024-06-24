import {Image, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import globalStyle from '../../assets/styles/globalStyle';
import {BackButton, Badge, Button, Header} from '../../components';
import style from './style';
import {Routes} from '../../navigation/Routes';

const SingleDonationItem = ({navigation, route}) => {
  const donationItemInformation = useSelector(
    state => state.donations.selectedDonationInfomation,
  );

  const categoryInformation = route.params.categoryInformation;

  return (
    <View style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView showsVerticalScrollIndicator={false} style={style.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <Image
          style={style.image}
          source={{uri: donationItemInformation.image}}
        />
        <View style={style.badge}>
          <Badge title={categoryInformation.name} />
        </View>
        <Header type={1} title={donationItemInformation.name} />
        <Text style={style.description}>
          {donationItemInformation.description}
        </Text>
      </ScrollView>
      <View style={style.button}>
        <Button
          title={'Donate'}
          onPress={() => navigation.navigate(Routes.Payment)}
        />
      </View>
    </View>
  );
};

export default SingleDonationItem;
