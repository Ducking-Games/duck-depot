import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SettingsManager {
    // Retrieve a setting by key
    static async getSetting(key) {
        const setting = await prisma.systemPreference.findUnique({
            where: { key }
        });
        return setting ? setting.value : null;
    }

    // Create or update a setting
    static async setSetting(key, value) {
        const existingSetting = await prisma.systemPreference.findUnique({
            where: { key }
        });

        if (existingSetting) {
            return await prisma.systemPreference.update({
                where: { key },
                data: { value }
            });
        } else {
            return await prisma.systemPreference.create({
                data: { key, value }
            });
        }
    }

    // Optional: Method to delete a setting
    static async deleteSetting(key) {
        return await prisma.systemPreference.delete({
            where: { key }
        });
    }
}

export default SettingsManager;
