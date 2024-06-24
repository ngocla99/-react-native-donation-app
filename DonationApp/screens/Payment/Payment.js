import {Alert, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import globalStyle from '../../assets/styles/globalStyle';
import {Button, Header} from '../../components';
import style from './style';
import {
  CardForm,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native';
import React from 'react';

const STRIPE_PUBLISHABLE_KEY =
  'pk_test_51PTaokHpgCA6b3iu1uF0qPVmcHiir342QHbjgTpeMqPR0Z1oHWQOmRM4ryIrfSz5N22c8XsSZUSzU6HijyPg9hDb00GyZFPKVV';
const API_URL = 'https://default-62kvjealyq-uc.a.run.app';

const Payment = ({navigation}) => {
  const donationItemInformation = useSelector(
    state => state.donations.selectedDonationInfomation,
  );
  const user = useSelector(state => state.user);
  const [isReady, setIsReady] = React.useState(false);
  const {confirmPayment, loading} = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(API_URL + '/create-payment-intent', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: user.email,
          currency: 'usd',
          amount: donationItemInformation.price * 100,
        }),
      });
      const {clientSecret} = await response.json();

      return clientSecret;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const handlePayment = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();
    const {error, paymentIntent} = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });

    if (error) {
      Alert.alert(
        'Error has occurred with your payment',
        error.localizedMessage,
      );
    } else if (paymentIntent) {
      Alert.alert('Successful', 'The payment was confirmed successfully!');
      navigation.goBack();
    }
  };

  return (
    <View style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView contentContainerStyle={style.paymentContainer}>
        <Header title="Making Donation" />
        <Text style={style.donationAmountDescription}>
          You are about to donate {donationItemInformation.price}
        </Text>
        <View>
          <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
            <CardForm
              style={style.cardForm}
              onFormComplete={() => setIsReady(true)}
            />
          </StripeProvider>
        </View>
      </ScrollView>
      <View style={style.button}>
        <Button
          title="Donate"
          isDisabled={!isReady || loading}
          style={style.button}
          onPress={() => handlePayment()}
        />
      </View>
    </View>
  );
};

export default Payment;
