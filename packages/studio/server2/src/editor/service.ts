import { Service } from '@botpress/framework'
import path from 'path'
import { PathService } from '../paths/service'

export class EditorService extends Service {
  constructor(private paths: PathService) {
    super()
  }

  async setup() {}

  async listActions() {
    const actions = this.excludeBuiltin(await this.paths.listFilesRecursive('actions'))

    return actions.map((x) => ({
      name: path.basename(x),
      type: 'action_legacy',
      location: x.replace('actions/', '')
    }))
  }

  async listHooks() {
    const hooks = this.excludeBuiltin(await this.paths.listFilesRecursive('hooks'))

    return hooks.map((x) => ({
      name: path.basename(x),
      type: 'hook',
      location: x.replace('hooks/', ''),
      hookType: x.split('/')[1]
    }))
  }

  async getPermissions() {
    return {
      'bot.hooks': {
        type: 'hook',
        isGlobal: false,
        read: true,
        write: true
      },
      'bot.actions': {
        type: 'action_legacy',
        isGlobal: false,
        read: true,
        write: true
      }
    }
  }

  async getTypings() {
    return {}
  }

  private excludeBuiltin(paths: string[]) {
    return paths.filter((x) => !x.includes('/builtin/'))
  }
}
