import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ICreateSetting {
  chat: boolean,
  username: string
}
class SettingsService {
  async create({ chat, username} : ICreateSetting) {
    const settingsRepository = getCustomRepository(SettingsRepository);
    
    const userAlreadyExists = await settingsRepository.findOne({
      username
    })

    if(userAlreadyExists) {
      throw new Error("User already exists!")
    }

    const  settings = settingsRepository.create({
      username,
      chat
    });
    
    await settingsRepository.save(settings);
      
    return settings;
  }
}

export {
  SettingsService
}