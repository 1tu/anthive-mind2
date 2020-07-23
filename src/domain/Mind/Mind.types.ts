import { IActionServer } from '@domain/Action';

export interface IMind { }

export interface TActionList {
  [id: string]: IActionServer;
}