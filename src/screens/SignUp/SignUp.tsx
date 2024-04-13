import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { Button, ScrollView, TextInput, TouchableOpacity, Text } from "react-native";
import { PublicNavigatorRoutesProps } from "src/routes/PublicRoute";
import { ViewContainer, TextStyled } from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

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
    password: yup.string().required("Informe a senha").min(6, "A senha deve ter pelo menos 6 digitos"),
    password_confirm: yup.string().required("Informe a confirmação da senha").oneOf([yup.ref('password')], 'As senhas não conferem')
  })

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  const onSubmit = (data: FormDataProps) => {
    // Aqui você pode manipular os dados do formulário após a validação
    console.log("Formulário submetido:", data);
    // Aqui você pode adicionar a lógica para enviar os dados para o backend, por exemplo.
  };

  return (
    <ScrollView>
      <ViewContainer>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={{ height: 40, backgroundColor: "white", borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, width: 250 }}
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
            <TextInput
              style={{ height: 40, backgroundColor: "white", borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, width: 250 }}
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
            <TextInput
              style={{ height: 40, backgroundColor: "white", borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, width: 250 }}
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
            <TextInput
              style={{ height: 40, backgroundColor: "white", borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5, width: 250 }}
              onChangeText={onChange}
              value={value}
              placeholder="Confirmar Senha"
              secureTextEntry
            />
          )}
        />
        {errors.password_confirm && <TextStyled>{errors.password_confirm.message}</TextStyled>}

        <Button
          title="Criar e acessar"
          onPress={handleSubmit(onSubmit)}
        />

        <Button
          onPress={() => navigation.navigate("SignIn")}
          title="Voltar para o login"
        />
      </ViewContainer>
    </ScrollView>
  );
}
