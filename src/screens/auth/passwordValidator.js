export function passwordValidator(password) {

  if (!password)
  { return "Password can't be empty."
  }

  else if (password.length < 5) 
  {
    return 'Password must be at least 5 characters long.'
  }

  else if(password != 'Test123')
  {
    return 'Password you entered is not correct. Please Try Again !'
  }

else{
  return ''
}
}
