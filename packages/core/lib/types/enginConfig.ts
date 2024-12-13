import { type MeterialConfig } from './meterialMeta';
import { type FnType } from './utils';
export type Plugin =
    | FnType
    | {
          name?: string;
          version?: string;
          apply: FnType;
      };

export type EnginConfig = {
    state: 'edit' | 'preview';
    plugins?: Plugin[];
    meterial?: MeterialConfig;
};
