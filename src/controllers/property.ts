import { Request, Response } from 'express';
import Property from '../models/Property';
import redis from '../config/redis';

export const createProperty = async (req: Request, res: Response) => {
  try {
    const property = new Property({ ...req.body, createdBy: req.user.id });
    await property.save();
    await redis.del('properties:all');
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: 'Error creating property', error: err });
  }
};

export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const cached = await redis.get('properties:all');

    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        res.json(parsed);
        return;
      }
    }

    const properties = await Property.find();
    await redis.set('properties:all', JSON.stringify(properties), 'EX', 3600);

    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch properties', error: (err as Error).message });
  }
};



export const updateProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findOne({id:req.params.id});
    if (!property || !property.createdBy || property.createdBy.toString() !== req.user.id) {
      res.status(403).json({ message: 'Unauthorized to update' });
      return;
    }

    const updated = await Property.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    await redis.del('properties:all');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating property', error: err });
  }
};

export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findOne({id:req.params.id});
    if (!property || !property.createdBy || property.createdBy.toString() !== req.user.id) {
      res.status(403).json({ message: 'Unauthorized to delete' });
      return;
    }

    await Property.findOneAndDelete({id:req.params.id});
    await redis.del('properties:all');
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting property', error: err });
  }
};
