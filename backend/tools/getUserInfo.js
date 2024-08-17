
const getUserInfo = (user) => {
  return {
    _id: user._id,
    name: user.name,
    lastName: user.lastName,
    phone: user.phone,
    image: user.image,
    email: user.email,
    role: user.role,
    cart: user.cart,
    purchases: user.purchases,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
    deleted: user.deleted
  }
}

export default getUserInfo