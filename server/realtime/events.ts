import { IMessage } from '../models/message';
import { IResource } from '../models/resource';
import { IThread } from '../models/thread';

type Payloads = {
  'new-message': IMessage;
  'new-resource': IResource;
  'new-thread': IThread;
};

export type EventType = keyof Payloads;
export type EventPayload<T extends EventType> = Payloads[T];
