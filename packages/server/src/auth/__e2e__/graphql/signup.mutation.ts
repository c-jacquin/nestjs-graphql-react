export const signupMutation = `
mutation($email: Email!, $password: String!) {
  signup(email: $email, password: $password)
}
`;
