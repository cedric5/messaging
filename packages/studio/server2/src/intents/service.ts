import { Service } from '@botpress/framework'
import { FileService } from '../files/service'

export class IntentService extends Service {
  constructor(private files: FileService) {
    super()
  }

  async setup() {}

  async list() {
    const intents = await this.files.list('intents')
    return intents.map((x) => x.content)
  }

  async create(intent: any) {
    await this.files.update(`intents/${intent.name}.json`, {
      name: intent.name,
      utterances: intent.utterances || {},
      slots: intent.slots || [],
      contexts: intent.contexts || ['global']
    })
  }

  async get(name: string) {
    return this.files.get(`intents/${name}.json`)
  }

  async listContexts() {
    const intents = await this.list()
    const contexts = intents.map((x) => x.contexts).flat()

    return [...new Set(contexts)]
  }
}
