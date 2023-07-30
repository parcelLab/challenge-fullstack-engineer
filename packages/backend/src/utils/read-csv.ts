import { finished } from 'stream/promises';
import { parse } from 'csv-parse';
import { Readable } from 'stream';

export async function readCsv<T>(headers: string[], content: Buffer): Promise<T[]> {
  const records: T[] = [];
  const parser = Readable.from(content).pipe(
    parse({
      delimiter: ';',
      columns: headers,
      ignore_last_delimiters: true,
      from_line: 2,
      skip_empty_lines: true,
    }),
  );

  parser.on('readable', function () {
    let record;
    while ((record = parser.read()) !== null) {
      records.push(record);
    }
  });
  await finished(parser);
  return records;
}
