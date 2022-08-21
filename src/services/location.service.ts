import db from '../models'

const {User} = db

export const getLocation = async (userId: string) => {
    const user = await User.findByPk(userId)
    if (!user) throw new Error("User not found")
    return user.location
}

export const updateLocation = async (userId: string, latitude: string, longitude: string) => {
    if (Number.isNaN(Number(latitude)) || Number.isNaN(Number(longitude))) throw new Error("Invalid Input")
    const user = await User.findByPk(userId)
    if (!user) throw new Error("User not found")
    await user.update({location: `${latitude} ${longitude}`})
    return 200
}
