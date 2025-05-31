import fs from 'fs';
import csv from 'csv-parser';
import dotenv from 'dotenv';
import Property from '../models/Property';
import connectDB from '../config/db';

dotenv.config();

function parseBoolean(value: any): boolean | undefined {
  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    if (lower === 'true') return true;
    if (lower === 'false') return false;
  }
  if (typeof value === 'boolean') return value;
  return undefined;
}

function parseNumber(value: any): number | undefined {
  const n = Number(value);
  return isNaN(n) ? undefined : n;
}

function parseDate(value: any): Date | undefined {
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
}

function parseArray(value: any): string[] | undefined {
  if (!value) return undefined;
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim());
  }
  return undefined;
}

async function importCSV() {
  try {
    await connectDB(); // Wait for DB connection
    console.log('Connected to MongoDB, starting import...');

    const propertiesToInsert: any[] = [];

    fs.createReadStream('property.csv')
      .pipe(csv())
      .on('data', (row) => {
        // Parse each row to match schema types
        const propertyData = {
          ...row,
          price: parseNumber(row.price),
          rating: parseNumber(row.rating),
          bedrooms: parseNumber(row.bedrooms),
          bathrooms: parseNumber(row.bathrooms),
          areaSqFt: parseNumber(row.areaSqFt),
          isVerified: parseBoolean(row.isVerified),
          availableFrom: parseDate(row.availableFrom),
          amenities: parseArray(row.amenities),
          tags: parseArray(row.tags),
          createdBy: null,
        };

        propertiesToInsert.push(propertyData);
      })
      .on('end', async () => {
        console.log(`CSV parsing done, importing ${propertiesToInsert.length} properties...`);

        try {
         
          const inserted = await Property.insertMany(propertiesToInsert);
          console.log(`Successfully imported ${inserted.length} properties.`);
        } catch (err) {
          console.error('Error during bulk insert:', err);
        } finally {
          process.exit(0);
        }
      })
      .on('error', (err) => {
        console.error('Error reading CSV file:', err);
        process.exit(1);
      });

  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

importCSV();
