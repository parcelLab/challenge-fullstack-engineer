CREATE TABLE trackings (
	id UUID NOT NULL,
	external_id character varying NOT NULL,
	tracking_number character varying NOT NULL,
	courier character varying NOT NULL,
	destination JSONB NOT NULL,
	receiver_email character varying NOT NULL,
	articles JSONB[] NOT NULL
);

CREATE TABLE tracking_checkpoints (
	id UUID NOT NULL,
	tracking_internal_id UUID NOT NULL,
	tracking_number character varying NOT NULL,
	location character varying NOT NULL,
	"timestamp" timestamp NOT NULL,
	status character varying NOT NULL,
	status_text character varying NOT NULL,
	status_detail character varying NOT NULL
);

ALTER TABLE ONLY trackings
    ADD CONSTRAINT trackings_pkey PRIMARY KEY (id);


ALTER TABLE ONLY tracking_checkpoints
    ADD CONSTRAINT tracking_checkpoints_pkey PRIMARY KEY (id);

CREATE INDEX IF NOT EXISTS trackings_email ON ONLY trackings (receiver_email);

-- TODO Add indexes on tracking number & external_id
