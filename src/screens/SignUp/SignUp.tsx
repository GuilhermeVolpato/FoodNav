import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import { PublicNavigatorRoutesProps } from "src/routes/PublicRoute";
import { 
  ViewContainer, 
  TextStyled, 
  InputStyled, 
  ButtonStyled, 
  ButtonTextStyled 
} from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from '@hooks/useAuth';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export function SignUp() {
  const navigation = useNavigation<PublicNavigatorRoutesProps>();

  const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome"),
    email: yup.string().required("Informe o email").email("E-mail inválido"),
    password: yup.string().required("Informe a senha").min(6, "A senha deve ter pelo menos 6 dígitos"),
    password_confirm: yup.string().required("Informe a confirmação da senha").oneOf([yup.ref('password')], 'As senhas não conferem')
  });
  const { changeRoute } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const onSubmit = (data: FormDataProps) => {
    changeRoute()
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <ViewContainer>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <InputStyled
              onChangeText={onChange}
              value={value}
              placeholder="Nome"
            />
          )}
        />
        {errors.name && <TextStyled>{errors.name.message}</TextStyled>}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputStyled
              onChangeText={onChange}
              value={value}
              placeholder="E-mail"
            />
          )}
        />
        {errors.email && <TextStyled>{errors.email.message}</TextStyled>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputStyled
              onChangeText={onChange}
              value={value}
              placeholder="Senha"
              secureTextEntry
            />
          )}
        />
        {errors.password && <TextStyled>{errors.password.message}</TextStyled>}

        <Controller
          control={control}
          name="password_confirm"
          render={({ field: { onChange, value } }) => (
            <InputStyled
              onChangeText={onChange}
              value={value}
              placeholder="Confirmar Senha"
              secureTextEntry
            />
          )}
        />
        {errors.password_confirm && <TextStyled>{errors.password_confirm.message}</TextStyled>}

        <ButtonStyled onPress={handleSubmit(onSubmit)}>
          <ButtonTextStyled>Criar e acessar</ButtonTextStyled>
        </ButtonStyled>

        <ButtonStyled onPress={() => navigation.navigate("SignIn")}>
          <ButtonTextStyled>Voltar para o login</ButtonTextStyled>
        </ButtonStyled>
      </ViewContainer>
    </ScrollView>
  );
}
