import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../api/user';
import globalStyle from '../../assets/styles/globalStyle';
import {Button, Header, Input} from '../../components';
import {Routes} from '../../navigation/Routes';
import {login} from '../../redux/reducers/User';
import style from './style';

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    let user = await loginUser(email, password);
    if (!user.status) {
      setError(user.error);
    } else {
      setError('');
      dispatch(login(user.data));
      navigation.navigate(Routes.Home);
    }
  };

  return (
    <View style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.container}>
        <View style={globalStyle.marginBottom24}>
          <Header type={1} title={'Welcome Back'} />
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
        <View style={globalStyle.marginBottom24}>
          <Button
            onPress={handleLogin}
            title={'Login'}
            isDisabled={email.length < 5 || password.length < 8}
          />
        </View>
        <Pressable
          style={style.registrationButton}
          onPress={() => navigation.navigate(Routes.Registration)}>
          <Header color={'#156CF7'} type={3} title={"Don't have an account?"} />
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Login;
