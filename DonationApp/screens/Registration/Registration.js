import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {createUser} from '../../api/user';
import globalStyle from '../../assets/styles/globalStyle';
import {BackButton, Button, Header, Input} from '../../components';
import style from './styles';

const Registration = ({navigation}) => {
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [error, setError] = React.useState('');

  const handleRegistration = async () => {
    let user = await createUser(fullName, email, password);
    if (user.error) {
      setError(user.error);
    } else {
      setError('');
      setSuccess('You have successfully registered');
      setTimeout(() => navigation.goBack(), 3000);
    }
  };

  return (
    <View style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <View style={style.backButton}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.container}>
        <View style={globalStyle.marginBottom24}>
          <Header type={1} title={'Hello and Welcome!'} />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input
            label={'First & Last Name'}
            placeholder={'Enter your full name...'}
            onChangeText={value => setFullName(value)}
          />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input
            keyboardType={'email-address'}
            label={'Email'}
            placeholder={'Enter your email...'}
            onChangeText={value => setEmail(value)}
          />
        </View>
        <View style={globalStyle.marginBottom24}>
          <Input
            secureTextEntry={true}
            label={'Password'}
            placeholder={'******'}
            onChangeText={value => setPassword(value)}
          />
        </View>
        {error.length > 0 && <Text style={style.error}>{error}</Text>}
        {success.length > 0 && <Text style={style.success}>{success}</Text>}
        <View style={globalStyle.marginBottom24}>
          <Button
            isDisabled={
              fullName.length <= 2 || email.length <= 5 || password.length < 8
            }
            title={'Registration'}
            onPress={handleRegistration}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Registration;
