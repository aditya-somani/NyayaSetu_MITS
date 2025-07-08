import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"

const {Schema} =mongoose;



const lawyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  practiceAreas: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: [0, 'Experience cannot be negative']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0
  },
  address:{
    type:String,
    required:true
  },
  image: {
    type: String,
    required:true
  },
  consultationFee: {
    type: Number,
    min: [0, 'Fee must be a positive number']
  },
  languages: {
    type: [String],
    default: ["English"]
  },
  education: {
    type: String
  },
  firmName:{
    type:String
  },
  availability: {
    type: String,
    enum: ['Available Today', 'Unavailable', 'Busy', 'On Leave'], // customize as needed
    default: 'Unavailable'
  },
  proBono: {
    type: Boolean,
    default: false
  },
  licenseNumber:{
    type:Number,
    required:true
  },
  verified: {
    type: Boolean,
    default: false
  },
  phone:{
    type:Number,
    minlength:[10,"Min 10 digits"]
  }
}, {
  timestamps: true
});




lawyerSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10);
    next();
})

lawyerSchema.methods.comparePassword=async function(InputPassword){
    return bcrypt.compare(InputPassword,this.password);
}


lawyerSchema.methods.generateRefreshToken=async function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
 )
}

lawyerSchema.methods.generateAccessToken=async function(){
    return jwt.sign({
        _id:this._id,
        Name:this.Name,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET_LAWYER,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
 )
}


const Lawyer=mongoose.model('Lawyer',lawyerSchema)
export default Lawyer