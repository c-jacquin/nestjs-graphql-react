export const resetPasswordMutation = `
mutation($password: String!, $newPassword: String!) {
  resetPassword(password: $password, newPassword: $newPassword)
}`;
