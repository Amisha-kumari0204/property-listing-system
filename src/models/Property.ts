import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    id:{type:String, required:true, unique:true},
    title: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    areaSqFt: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    amenities: [{ type: String }],
    furnished: { type: String},
    availableFrom: { type: Date, required: true },
    listedBy: { type: String },
    tags: [{ type: String }],
    colorTheme: { type: String },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    isVerified: { type: Boolean, default: false },
    listingType: { type: String,required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Property', propertySchema);
