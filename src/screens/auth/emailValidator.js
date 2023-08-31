export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  const re2 = 'Test@mail.com'
  if (!email) return "Email can't be empty."
  // if (!re.test(email)) 
  // {
  //   return 'Ooops! We need a valid email address.'
  // }
  if(!re.test(email))
  {
      return 'Ooops! We need a valid email address.'
  }
  else if (email != 'Test@mail.com' )
  {
    return 'Email address is not Correct.'
  }
  else
  {
    return ''
  }
}
