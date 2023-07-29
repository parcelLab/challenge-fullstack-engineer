import Sinon, {SinonSandbox, SinonStub} from 'sinon';
import {ITrackingRepository} from '../src/types/components';

export type Mock<T> = T & {
	[e in keyof T]?: T[e] extends (...args: unknown[]) => unknown ? SinonStub : T[e];
};
export type MockFactory<T> = (s?: SinonSandbox) => Mock<T>;
export const mockTrackingRepository: MockFactory<ITrackingRepository> = (s = Sinon) => ({
	getTracking: s.stub(),
	save: s.stub()
});
