import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  FormErrorMessage,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { useContext } from "react";
import { RegisterUser } from "../../context/Register";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { iYupForm, iYupFormErrors } from "../../interfaces/register";
import { RegisterformSchema } from "../../schema/Users";

function SignUpForm() {
  const { colorMode } = useColorMode();
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<iYupForm, iYupFormErrors>({
    resolver: yupResolver(RegisterformSchema),
  });

  const { OnSubmitObject, loading } = useContext(RegisterUser);

  const submit = (data: iYupForm) => {
    OnSubmitObject(data);
  };

  return (
    <Box
      maxWidth="400px"
      mx="auto"
      bg={colorMode === "light" ? "#d8d3d3" : "#2a303d"}
      p={"4"}
      borderRadius={"8px"}
    >
      <form onSubmit={handleSubmit(submit)}>
        <Stack spacing={3}>
          <Heading as="h2" size="lg" textAlign="center" mb={4}>
            Cadastro
          </Heading>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl isInvalid={!!errors.name} isRequired>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input {...field} id="name" placeholder="Digite seu nome" />
                {
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                }
              </FormControl>
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl isInvalid={!!errors.email} isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="Digite seu email" />
                {
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                }
              </FormControl>
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl isInvalid={!!errors.password} isRequired>
                <FormLabel htmlFor="password">Senha</FormLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                />
                {
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                }
              </FormControl>
            )}
          />

          <Controller
            name="telephone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl isInvalid={!!errors.telephone} isRequired>
                <FormLabel htmlFor="telephone">Telefone</FormLabel>
                <Input
                  {...field}
                  id="telephone"
                  placeholder="Digite seu telefone"
                />
                {
                  <FormErrorMessage>
                    {errors.telephone && errors.telephone.message}
                  </FormErrorMessage>
                }
              </FormControl>
            )}
          />
          <Button type="submit" isDisabled={!isValid || loading}>
            {loading ? <Spinner size={"sm"} /> : "Cadastrar"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default SignUpForm;
