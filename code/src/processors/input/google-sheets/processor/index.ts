import { IInputProcessorInitMethodFacade } from 'core/interfaces';
import {
  IGoogleSheetsInputProcessor,
  IGoogleSheetsInputProcessorConstructorFacade,
  IGoogleSheetsInputProcessorDependencies
} from './interfaces';

class GoogleSheetsInputProcessor implements IGoogleSheetsInputProcessor {
  private dependencies: IGoogleSheetsInputProcessorDependencies;
  private dataTree: any;
  private config: any;
  private cliParams: any;
  private file: any;
  private onCompleteCallback: any;

  constructor(facade: IGoogleSheetsInputProcessorConstructorFacade) {
    this.dependencies = facade.dependencies;
  }

  public init(facade: IInputProcessorInitMethodFacade) {
    this.dataTree = facade.dataTree;
    this.config = facade.config;
    this.cliParams = facade.cliParams;

    this.dependencies.parser.init({
      dataTree: facade.dataTree,
      filename: this.config.filename
    });

    return this;
  }

  public onComplete(callback: any) {
    this.onCompleteCallback = callback;

    return this;
  }

  public run() {
    if (!this.cliParams.mockInput) {
      this.fetchWorkbook().parseWorkbook();
    } else {
      Object.assign(
        this.dataTree,
        JSON.parse(this.dependencies.fs.readFileSync(process.cwd() + '/' + this.config.mockData))
      );

      this.onCompleteCallback();
    }

    return this;
  }

  private fetchWorkbook(): this {
    const { fs, https } = this.dependencies;

    this.file = fs.createWriteStream(this.config.filename);
    https.get(this.config.url, response => response.pipe(this.file));

    return this;
  }

  private parseWorkbook(): this {
    this.file.on('finish', () => {
      this.dependencies.parser.parse();

      if (this.cliParams.updateMock) {
        this.dependencies.fs.writeFileSync(
          process.cwd() + '/' + this.config.mockData,
          JSON.stringify(this.dataTree, null, 2)
        )
      }

      this.onCompleteCallback();
    });

    return this;
  }
}

export default GoogleSheetsInputProcessor;
