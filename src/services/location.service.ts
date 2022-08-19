import db from '../models'

const {User} = db

export const getLocation = async (userId: string) => {
    const user = await User.findByPk(userId)
    return user?.location
}

export const updateLocation = async (userId: string, latitude: string, longitude: string) => {
    const user = await User.findByPk(userId)

    if (!user) return 404

    await user.update({location: `${latitude} ${longitude}`})

    return 200
}
