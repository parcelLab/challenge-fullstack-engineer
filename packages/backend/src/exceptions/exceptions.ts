export enum ErrorCode {
	invalid_reader = 'invalid_reader',
	unknown = 'unknown',
}
export class ParcelLabException extends Error {
	public readonly details: string;
	public readonly component: string;
	public readonly  code: ErrorCode;

	constructor(params: {message: string; details: string, component: string, code: ErrorCode}) {
		super(params.message);
		this.code = params.code;
		this.component = params.component;
		this.details = params.details;
	}
}

export class InvalidReaderException extends ParcelLabException {
	constructor(private readonly reader: string) {
		super({
			details: reader,
			component: 'CSVReader',
			code: ErrorCode.invalid_reader,
			message: `Invalid Reader`,
		});
	}
}
