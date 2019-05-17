import * as yaml from 'yamljs';
import * as path from 'path';

// Using set 'NODE_ENV=dev &' adds a space to the end for some reason, so we trim it
const ENV = process.env.NODE_ENV.trim();

export interface BotConfig {
  settings: {
    bot: {
      /**
       * Discord api token
       */
      token: string;
      /**
       * The prefix to be used for a message to be recognized as a command
       */
      prefix: string;
      /**
       * Text shown as game being played under the bot name
       */
      status: string;
    }
    app: {
      /**
       * URL to be used for api requests
       */
      url: string;
    }
  }
}

const config: Readonly<BotConfig>  = yaml.load(path.resolve(__dirname, `./${ENV}.settings.yaml`));

export default config;