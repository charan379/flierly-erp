import prompter from 'prompts';

async function userDetailsPrompt(): Promise<{ username: string; password: string; email: string; mobile: string }> {
  let password: string = '';

  const response: { username: string; password: string; confirm_password: string; email: string; mobile: string } = await prompter([
    // Username prompt
    {
      type: 'text',
      name: 'username',
      message: 'Username : ',
      validate: (value) => (/^([a-z0-9&.-]){5,25}$/.test(value) ? true : 'Invalid username !'),
    },
    // Password prompt
    {
      type: 'password',
      name: 'password',
      message: (prev, values) => `Password for user ${values.username} : `,
      validate: (value) => (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,28}$/.test(value) ? true : 'Invalid password !'),
    },
    // Confirm password prompt
    {
      type: 'password',
      name: 'confirm_password',
      message: (prev, values) => {
        password = values.password;
        return `Confirm password for user ${values.username} : `;
      },
      validate: (value) => (password === value ? true : 'Passwords do not match'),
    },
    // Email prompt
    {
      type: 'text',
      name: 'email',
      message: (prev, values) => `Email for user ${values.username} : `,
      validate: (value) =>
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
          ? true
          : 'Invalid email !',
    },
    // Mobile number prompt
    {
      type: 'text',
      name: 'mobile',
      message: (prev, values) => `Mobile number for user ${values.username} : `,
      validate: (value) => (/^\d{10}$/.test(value) ? true : 'Invalid mobile number !'),
    },
  ]);

  return { username: response.username, password: response.password, email: response.email, mobile: response.mobile };
}

export default userDetailsPrompt;
