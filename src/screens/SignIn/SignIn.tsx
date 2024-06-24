import React from "react";
import { useAuth } from "src/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { PublicNavigatorRoutesProps } from "src/routes/PublicRoute";
import {
  TouchableOpacityStyled,
  ViewContainer,
  TextStyled,
  TextErrorStyled,
  InputStyled,
  ButtonStyled,
  ButtonTextStyled,
} from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { Image } from "react-native";

type FormDataProps = {
  email: string;
  password: string;
};

export function SignIn() {
  const navigation = useNavigation<PublicNavigatorRoutesProps>();
  const { changeRoute } = useAuth();

  const signUpSchema = yup.object({
    email: yup.string().required("Informe o email").email("E-mail inválido"),
    password: yup.string().required("Informe a senha").min(6, "A senha deve ter pelo menos 6 dígitos"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: FormDataProps) => {
    changeRoute();
  };

  return (
    <ViewContainer>
      <Image
        source={require("../../assets/logo/ic_launcher.png")}
        style={{ width: 120, height: 120, marginBottom: 30 }}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <InputStyled onChangeText={onChange} value={value} placeholder="E-mail" keyboardType="email-address"/>
        )}
      />
      {errors.email && <TextErrorStyled>{errors.email.message}</TextErrorStyled>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <InputStyled onChangeText={onChange} value={value} placeholder="Senha" secureTextEntry />
        )}
      />
      {errors.password && <TextErrorStyled>{errors.password.message}</TextErrorStyled>}

      <ButtonStyled onPress={handleSubmit(onSubmit)}>
        <ButtonTextStyled>Realizar Login</ButtonTextStyled>
      </ButtonStyled>

      <ButtonStyled onPress={() => navigation.navigate("SignUp")}>
        <ButtonTextStyled>Cadastrar</ButtonTextStyled>
      </ButtonStyled>
    </ViewContainer>
  );
}
