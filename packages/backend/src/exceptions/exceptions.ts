export enum ErrorCode {
	InvalidReader = 'invalid_reader',
	Unknown = 'unknown',
	NotFound = 'not_found',
}

export class ParcelLabException extends Error {
	public readonly details: string;
	public readonly component: string;
	public readonly code: ErrorCode;

	constructor(params: { message: string; details: string, component: string, code: ErrorCode }) {
		super(params.message);
		this.code = params.code;
		this.component = params.component;
		this.details = params.details;
	}
}

export class ParcelLabelApiException extends ParcelLabException {
	public readonly statusCode: number;

	constructor(params: { message: string; details: string, component: string, code: ErrorCode, statusCode: number, sensible: boolean }) {
		super(params);
		this.statusCode = params.statusCode;
	}
}

export class TrackingNotFoundException extends ParcelLabelApiException {
	constructor(id: string) {
		super({
			details: id,
			sensible: false,
			statusCode: 404,
			component: 'TrackingHandler',
			code: ErrorCode.NotFound,
			message: `Tracking with id ${id} not found`
		});
	}
}

export class InvalidReaderException extends ParcelLabException {
	constructor(private readonly reader: string) {
		super({
			details: reader,
			component: 'CSVReader',
			code: ErrorCode.InvalidReader,
			message: `Invalid Reader`,
		});
	}
}
