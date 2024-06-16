type LoginType = {
  Username: string;
  Password: string;
};

enum AuthType{
  LOGIN,
  REGISTER
} 
export { LoginType, AuthType };
