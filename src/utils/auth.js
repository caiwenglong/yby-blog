import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const ObjectIdKey = 'ObjectIdKey'
const Name = 'name'
const Roles = 'roles'
const UserData = 'userData'


export function setObjectId(objectId) {
  return sessionStorage.setItem(ObjectIdKey, objectId)
}

export function getObjectId() {
  return sessionStorage.getItem(ObjectIdKey)
}

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getName() {
  return sessionStorage.getItem(Name)
}

export function setName(name) {
  return sessionStorage.setItem(Name, name)
}

export function removeName() {
  return sessionStorage.removeItem(Name)
}

export function getUserData() {
  // return Cookies.get(UserData)
  return sessionStorage.getItem(UserData)
}

export function setUserData(userData) {
  // return Cookies.set(UserData, userData)
  sessionStorage.setItem(UserData, userData)
}

export function removeUserData() {
  // return Cookies.remove(UserData)
  sessionStorage.removeItem(UserData)
}

export function getRoles() {
  const rolesString = Cookies.get(Roles)
  return rolesString && rolesString.split(',')
}

export function setRoles(roles) {
  return Cookies.set(Roles, roles && roles.join(','))
}

export function removeRoles() {
  return Cookies.remove(Roles)
}
