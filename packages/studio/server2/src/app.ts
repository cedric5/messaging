import { Framework } from '@botpress/framework'
import { ConfigService } from './config/service'
import { FileService } from './files/service'
import { FlowService } from './flows/service'
import { HintService } from './hints/service'
import { PathService } from './paths/service'

export class App extends Framework {
  paths: PathService
  files: FileService
  config: ConfigService
  hints: HintService
  flows: FlowService

  constructor() {
    super()
    this.paths = new PathService()
    this.files = new FileService(this.paths)
    this.config = new ConfigService(this.files)
    this.hints = new HintService(this.files)
    this.flows = new FlowService(this.paths, this.files)
  }

  async setup() {
    await super.setup()
    await this.files.setup()
    await this.config.setup()
    await this.hints.setup()
    await this.flows.setup()
  }
}
