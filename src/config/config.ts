import { readFileSync } from 'fs';
import YAML from 'yaml'
import { Config } from './type'

let _config: Config | undefined = undefined;

function GetConfig(): Config {
    if (_config === undefined) {
        const str = readFileSync("./src/config/secret.yml").toString()
        _config = YAML.parse(str)
        console.log(_config)
    }
    return _config as Config
}

export default GetConfig