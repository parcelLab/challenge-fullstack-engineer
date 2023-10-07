import chai from 'chai';
import sinon from 'sinon';
import { CSVParser } from './csvParser';
import fs from 'fs';
import { Readable } from 'stream';
import { PathLike } from 'fs';
const expect = chai.expect;

describe('CSVParser', () => {
    let createReadStreamStub: sinon.SinonStub;

    beforeEach(() => {
        sinon.stub(fs, 'existsSync').callsFake((path: PathLike) => {
            if (typeof path === 'string' && path.includes('non-existent-path.csv')) {
                return false;
            }
            return true;
        });

    });

    afterEach(() => {
        sinon.restore();
    });

    it('should parse valid CSV correctly', async () => {

        // Stub fs.createReadStream to return a mock readable stream with your CSV data
        const mockStream = new Readable({
            read() {
                this.push('orderNo;tracking_number;courier\n'); // Your CSV header
                this.push('ORD-123-2018;00340000161200000001;DHL\n'); // A CSV row
                this.push(null); // Signal end of data
            }
        }) as any;

        createReadStreamStub = sinon.stub(fs, 'createReadStream').returns(mockStream);
        const csvParser = new CSVParser();
        const parsedData = await csvParser.parse('some-file-path.csv');

        expect(parsedData).to.be.an('array');
        expect(parsedData.length).to.equal(1);  // Since we've provided one row in our mock CSV
        expect(parsedData[0]).to.have.property('orderNo', 'ORD-123-2018');
        expect(parsedData[0]).to.have.property('tracking_number', '00340000161200000001');
        expect(parsedData[0]).to.have.property('courier', 'DHL');
    });

    it('should throw an error if the file does not exist', async () => {
        const csvParser = new CSVParser();
        let errorOccurred = false;

        try {
            await csvParser.parse('non-existent-path.csv');
        } catch (error) {
            errorOccurred = true;
        }

        expect(errorOccurred).to.be.true;
    });

    it('should return an empty array for an empty CSV', async () => {

        const mockStream = new Readable({
            read() {
                this.push(null);
            }
        }) as any;

        createReadStreamStub = sinon.stub(fs, 'createReadStream').returns(mockStream);
        const csvParser = new CSVParser();
        const parsedData = await csvParser.parse('path-to-empty.csv');
        expect(parsedData).to.be.an('array').that.is.empty;
    });

    it('should handle large CSV files', async function() {

        this.timeout(50000); // Increase timeout for this test
        const data: string[] = [];

        // Generate large data set
        data.push('orderNo;tracking_number;courier');
        for (let i = 0; i < 10000; i++) {
            data.push(`ORD-${i}-2023;0034${i}00161200000001;DHL`);
        }
        const csvContent = data.join('\n');

        const mockStream = new Readable({
            read() {
                this.push(csvContent);
                this.push(null); 
            }
        }) as any;

        createReadStreamStub = sinon.stub(fs, 'createReadStream').returns(mockStream);
        const csvParser = new CSVParser();
        
        const parsedData = await csvParser.parse('path-to-large-file.csv'); 
        expect(parsedData).to.be.an('array');
    });
});




