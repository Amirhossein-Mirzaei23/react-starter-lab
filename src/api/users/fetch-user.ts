
export const fetchUsers = async () => {

  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Network error')
  return res.json()

}
