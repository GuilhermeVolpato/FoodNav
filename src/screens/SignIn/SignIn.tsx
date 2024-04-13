import { useAuth } from "src/hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { PublicNavigatorRoutesProps } from "src/routes/PublicRoute";
import { TouchableOpacityStyled, ViewContainer, TextStyled, TextErrorStyled } from "./styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

type FormDataProps = {
  email: string;
  password: string;
};

export function SignIn() {
  const navigation = useNavigation<PublicNavigatorRoutesProps>();
  const { changeRoute } = useAuth();

  const signUpSchema = yup.object({
    email: yup.string().required("Informe o email").email("E-mail inválido"),
    password: yup.string().required("Informe a senha").min(6, "A senha deve ter pelo menos 6 digitos"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: FormDataProps) => {
    // Aqui você pode manipular os dados do formulário após a validação
    console.log("Formulário submetido:", data);
    // Aqui você pode adicionar a lógica para enviar os dados para o backend, por exemplo.
  };
  return (
    <ViewContainer>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{
              height: 40,
              backgroundColor: "white",
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              padding: 5,
              width: 250,
            }}
            onChangeText={onChange}
            value={value}
            placeholder="E-mail"
          />
        )}
      />
      {errors.email && <TextErrorStyled>{errors.email.message}</TextErrorStyled>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={{
              height: 40,
              backgroundColor: "white",
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              padding: 5,
              width: 250,
            }}
            onChangeText={onChange}
            value={value}
            placeholder="Senha"
            secureTextEntry
          />
        )}
      />
      {errors.password && <TextErrorStyled>{errors.password.message}</TextErrorStyled>}
      <TouchableOpacityStyled onPress={() => navigation.navigate("SignUp")}>
        <TextStyled>Criar conta</TextStyled>
      </TouchableOpacityStyled>

      <TouchableOpacityStyled onPress={() => changeRoute()}>
        <TextStyled>Realizar Login</TextStyled>
      </TouchableOpacityStyled>
    </ViewContainer>
  );
}
