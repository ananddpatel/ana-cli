import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import { parse } from 'yaml';

export class ConfigProvider {
  private yml: Record<any, any>;

  constructor(configPath?: string) {
    const filePath = configPath ?? path.join(__dirname, '../../config.yml');
    const file = readFileSync(filePath, 'utf8');
    this.yml = parse(file);
  }

  get(key: string) {
    return _.get(this.yml, key);
  }
}

export const Config = new ConfigProvider();
