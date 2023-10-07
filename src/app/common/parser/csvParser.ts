import fs from 'fs';
import Papa from 'papaparse';
import { Order } from '../../types/order.types';
import { DataParser } from './dataParser';
export class CSVParser implements DataParser {
    async parse(filePath: string): Promise<any[]> {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File does not exist: ${filePath}`);
        }
    
        return new Promise((resolve, reject) => {
            const results: Order[] = [];
            try{
                fs.createReadStream(filePath)
                .pipe(Papa.parse(Papa.NODE_STREAM_INPUT, {
                    header: true,
                    delimiter: ';',
                    skipEmptyLines: true
                }))
                .on('data', (row: any) => {
                    results.push(row);
                })
                .on('end', () => {
                    resolve(results);
                })
                .on('error', reject);
            } catch(error){
                console.log('here');
                console.log(error);
            }
        });
    }
}
